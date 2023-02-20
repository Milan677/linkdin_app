const jwt=require("jsonwebtoken")

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,"milan",(err,decode)=>{
            if(decode){
                req.body.user=decode.userID
                next()
            }else{
                res.send({"msg":"pls login"})
            }
        })
    }else{
        res.send({"msg":"pls login"})
    }
}

module.exports={authenticate}