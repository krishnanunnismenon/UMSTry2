const createAccessToken = require('../utils/jwtToken')

const User = require('../Models/user');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


const registerUser = async(req,res)=>{
    try {
        const image = req.file? req.file.filename : null;
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            image
        })
        await user.save();
        return res.status(201).json({message:"User registered Successfully"})


    } catch (error) {
        return res.status(500).json({message:"error registering user",error})
    }
}

const loginUser = async(req,res)=>{

    try {
        const user = await User.findOne({email:req.body.email})

        if(user){
            const userPass = (await user.password) == req.body.password;
            if(userPass){
                const token = jwt.sign(
                    {id:user._id, email: user.email},
                    JWT_SECRET,
                    {expiresIn:"1d"}
                );
                


                
                return res.status(201).json({
                    message:"success",
                    token,
                    userDetails:{
                        name:user.name,
                        email: user.email,
                        image: `/images/${user.image}`
                    }
                });
            }else{
                return res.json({message:"Password not match"})
            }
        }else{
            return res.json({message:'login failed'})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error registering user",error})
    }

}

const getDetails = async(req,res)=>{
    console.log('pari');
    
    const token = req.headers["authorization"]?.split(" ")[1];
   
    if(!token){
    
        return res.status(401).json({message:"Token Missing"})
        
    }
    try {
        const decoded = jwt.verify(token,JWT_SECRET);
        console.log(decoded);
        
        const user = await User.findById(decoded.id);
        if(user){
            return res.status(201).json({
                userDetails:{
                    name: user.name,
                    email: user.email,
                    image: `/images/${user.image}`
                }
            })
        }else{
            return res.status(404).json({message:"user not found"})
        }
    } catch (error) {
        console.log(error)
    }
}

const updateProfile = async(req,res)=>{

    const token = req.headers["authorization"]?.split(" ")[1];
    
    if(!token){
        console.log('not working');
        
        return res.status(401).json({message:"Token Missing"});
    }

    try {
        const decoded = jwt.verify(token,JWT_SECRET);
        const userId = decoded.id;

        const { name , email } = req.body;
        const image = req.file ? req.file.filename : null;

        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        user.name = name || user.name;
        user.email = email || user.email;
        if(image){
            user.image = image;
        }

        await user.save();

        return res.status(201).json({
            message:"Profile updated Successfully",
            userDetails:{
                name:user.name,
                email: user.email,
                image: `/images/${user.image}`
            }
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating profile', error });
    }

}

 const refresh = async(req,res)=>{
    const refreshToken = req.cookies?.jwt;
    console.log(req.cookies);
    if(!refreshToken) return status(403).josn({message:"Unauthorised"});

    const decoded = verifyToken(refreshToken,process.env.REFRESH_TOKEN);
    const user = await User.findOne({email: decoded?.email});
    if(!user) return res.status(401).json({message:"Unauthorized"})

    const accessToken = createAccessToken(user);
    res.status(200).json({
        success:true,
        message:"Access Token Created",
        data:{user,accessToken}
    })
    
}

module.exports={registerUser, loginUser, getDetails, updateProfile, refresh}