const jwt = require("jsonwebtoken");


const createRefreshToken = (user)=>{
    return jwt.sign({email:user.email},process.env.REFRESH_TOKEN,{
        expiresIn:"1d"
    })
}

const createAccessToken = (user)=>{
    return jwt.sign({userId:user._id},process.env.ACCESS_TOKEN,{
        expiresIn:"10s"
    })
}

const verifyToken = (token,secret)=>{
    try {
        return jwt.verify(token,secret)
    } catch (error) {
        if(error.name ==='TokenExpiredError'){
            console.log('Token has expired');
            return {expired:true};
            
        }
        console.log('token verification failed');
        
        return null;
    }
}

module.exports = {createRefreshToken,
    createAccessToken,
    verifyToken
}