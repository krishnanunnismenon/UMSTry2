const User=require('../Models/user')
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const adminLogin = async(req,res)=>{
    try {
        const admin = await User.findOne({email: req.body.email});
        if(admin){
            const adminPass = await admin.password == req.body.password;

            if(adminPass && admin.isAdmin){
                const adminToken = jwt.sign(
                    {id:admin._id,email: admin.email},
                    JWT_SECRET,
                    {expiresIn: '1d'}
                );
                
                return res.status(201).json({
                    message:"Success",
                    adminToken,
                    adminDetails:{
                        name: admin.name,
                        email: admin.email,
                        image: `/images/${admin.image}`
                    }
                })
            }else{
                return res.json({message:"Login Failed"})
            }
        }else{
            return res.json({message:"Login Failed"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error registering user",error});
        
    }
}

const getUserList = async(req,res)=>{
    try {
        const user = await User.find({isAdmin:{$ne:true}})
        res.status(201).json({user})
    } catch (error) {
        console.log(error);
        
    }
}

const getAdminDetails = async(req,res)=>{
    const adminToken = req.headers['authorization']?.split(" ")[1];
        if(!adminToken){
            return res.status(401).json({message:"Token Missing"})
        }
    try {
        const decoded  = jwt.verify(adminToken,JWT_SECRET);
        const admin = await User.findById(decoded.id);

        if(admin){
            return res.status(201).json({
                adminDetails:{
                    name:admin.name,
                    email:admin.email,
                    image:`/images/${admin.image}`
                }
            })
        }else{
            return res.status(404).json({message:"User Not Found"})
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async(req,res)=>{
    try {
        const id = req.params.id;
        await User.deleteOne({_id:id});
        const user = await User.find({isAdmin:{$ne:true}})
        res.status(201).json({user})
    } catch (error) {
        console.log(error)
    }
}


const editUser = async (req, res) => {
  try {
    const userId = req.params.id; // Extract user ID from request params
    const { name, email } = req.body; // Extract updated data from the request body

    // Find the user by ID and update with new data
    const updatedUser = await User.findByIdAndUpdate(userId, 
      { name, email }, // New values for name and email
      { new: true, runValidators: true } // Return the updated document and run validation
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser // Return the updated user details
    });

  } catch (error) {
    console.error("Error editing user: ", error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {adminLogin,getUserList, getAdminDetails, deleteUser, editUser} 