const jwt = require("jsonwebtoken");

const auth= (req,res,next)=>{
    const token=req.header("Authorization").split(" ")[1];

    if(!token){
     return res.status(401).json({error:"No Token , authorization denied"});
    }
    try{
        const decoded =jwt.verify(token,"secret_token");
        req.user=decoded;
        next();
        console.log("token",token)
    }
    catch(err){
        res.status(401).json({error:"Token is not Verify"});
    }
    }
    module.exports=auth;


   



//jwt.verift-decode panni verify -validate pannu