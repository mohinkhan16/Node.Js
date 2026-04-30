import express from "express";

const app=express()

app.get("/",(req,res)=>{
    res.json({
        message:"This is Home page"
    })
})

app.get("/",(req,res)=>{
    res.json({
        message:"This is about page"
    })
})

const port=5000;

app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }
    console.log("Surver is running on port",port)
})