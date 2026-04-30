import express from "express";

const app=express()

app.get("/",(req,res)=>{
    res.send("This is Home page");
})

app.get("/about",(req,res)=>{
    res.end("This is About Page");
})


const port=5000;

app.listen(port,(err)=>{
    if(err){
        console.log(err.message)
    }
    console.log("server is Running",port);
});