const express=require("express")
const{connection}=require("./db")
const{userRouter}=require("./routes/user.router")
const{postRouter}=require("./routes/post.router")
const{authenticate}=require("./middlewre/authenticate")
const cors=require("cors")
require("dotenv").config()

const app=express()

app.use(cors({origin:"*"}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome to home page")
})

app.use("/user",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)



app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log(`connected with linkdin database...`)
    } catch (error) {
        console.log(error)
    }

    console.log(`app is running at port ${process.env.port}...`)
})