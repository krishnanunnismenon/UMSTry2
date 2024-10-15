import { verifyToken } from "../utils/jwtToken";


export const verifyJWT = async(req,res,next)=>{
    const headers = req.headers?.authorization;
    if(!headers?.startsWith("Bearer")){
        return res.status(401).json({message:"Unauthorised"})
    }
    
    const token =headers.split(" ")[1];
    const decoded = verifyToken(token,process.env.ACCESS_TOKEN);
    console.log(decoded);

    if(decoded && decoded.expired){
        return res.status(401).json({message:"Token has expired"})
    }

    if(!decoded){
        return res.status(401).json({message:"Forbidden"})
    }

    req.user = {
        userId:decoded.userId
    };

    return next();
    
}