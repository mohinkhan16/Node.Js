
import express from "express"

const app=express()

app.get("/",(req,res)=>{
res.send("this is about page")
})

app.get("/",(req,res)=>{
    res.end("this is home page")
});

const port =5000;

app.listen(port,(err)=>{
    if(err){
        console.log(err.message)
    }
    console.log("Server is running ",port)
})