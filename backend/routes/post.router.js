const express=require("express")
const{postModel}=require("../model/post.model")
const postRouter=express.Router()

//...........get post......
postRouter.get("/",async(req,res)=>{
    const post=await postModel.find({"user":req.body.user})
    res.send(post)
})

postRouter.get("/",async(req,res)=>{
    let{device}=req.query
    let query={}
    if(req.query.device){
        query.device=req.query.device
    }
    const post=await postModel.find({"user":req.body.user,"device":device})
    res.send(post)
})

//............create post...........
postRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try {
        const post=new postModel(payload)
        await post.save()
        res.send("new post created...")
    } catch (error) {
        res.send({"msg":"something went wrong","error":error.message})
    }
})

//.............update.............
postRouter.patch("/update/:id",async(req,res)=>{
    const postID=req.params.id
    const payload=req.body
    const post=await postModel.findOne({_id:postID})
    const userID_in_post=post.user
    const userID_making_req=req.body.user
    try {
        if(userID_making_req!==userID_in_post){
            res.send({"msg":"you are not authorized"})
        }else{
            await postModel.findByIdAndUpdate({_id:postID},payload)
            res.send("post updated")
        }
    } catch (error) {
        console.log(error)
        res.send({"msg":"something went wrong","error":error.message})
    }

})

//...........delete...........
postRouter.delete("/delete/:id",async(req,res)=>{
    const postID=req.params.id
    const post=await postModel.findOne({_id:postID})
    const useriD_in_post=post.user
    const userID_making_req=req.body.user
    try {
        if(userID_making_req!==useriD_in_post){
            res.send({"msg":"you are not authorized"})
        }else{
            await postModel.findByIdAndDelete({_id:postID})
            res.send("post deleted")
        }
    } catch (error) {
        res.send({"msg":"something went wrong","error":error.message})
    }

})

module.exports={postRouter}