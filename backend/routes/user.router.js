const express=require("express")
const{userModel}=require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userRouter=express.Router()

//.......registration......
userRouter.post("/register",async(req,res)=>{
    const{name,email,gender,pass,age,city}=req.body
    try {
       bcrypt.hash(pass,5,async(err,hash)=>{
         if(err){
            res.send({"msg":"something went wrong","error":err.message})

         }else{
            const user=new userModel({name,email,gender,pass:hash,age,city})
            await user.save()
            res.send({"msg":"New user has been registered"})
         }
       }) 
    } catch (error) {
        res.send({"msg":"something went wrong","error":error.message})
    }
})



//.........login.......
userRouter.post("/login",async(req,res)=>{
    const{email,pass}=req.body
    try {
      const user=await userModel.find({email})
      if(user.length>0){
        bcrypt.compare(pass,user[0].pass,async(err,result)=>{
            if(result){
                var token=jwt.sign({userID:user[0]._id},"milan")
                res.send({"msg":"Login successful","token":token})
            }else{
                res.send("wrong credentials")
            }
        });
      }else{
        res.send("wrong credentials")
      }
       
    } catch (error) {
        res.send({"msg":"something went wrong","error":error.message})
    }
})

module.exports={userRouter}