const multer = require('multer');
const path = require('path');
const User = require("../Models/user");

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,path.join(__dirname,"..","public","images"))
    },
    filename: function(req, file, cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage});

async function existUser(req,res,next){
    try {
        const user = await User.findOne({email: req.body.email});
        if(user){
            return res.json({
                message:"user already exist"
            })
        }else{
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server error", error})
    }
}

module.exports = {
    upload,
    existUser
};