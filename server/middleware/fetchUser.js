const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const fetchUser = (req,res,next)=>{
    const token= req.header('auth-token');
    if(!token)
    { 
       return res.status(401).send({error:true , message:"please authenticate using a valid token"})
    }
    try{
        let string = jwt.verify(token,secretKey);
        req.user=string;
        next();
       }
    catch(err)
    {
        res.status(401).send({verificationFailed:'failed to verify user'});
    }
}
module.exports=fetchUser;