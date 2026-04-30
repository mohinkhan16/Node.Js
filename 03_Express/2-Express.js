

import express from "express";

const app= express()

app.get("/",(req,res)=>{
    res.json({
        message:"This Is Home Page ",
    })
})

app.get("/about",(req,res)=>{
    res.json({
        message:"This is About Page",
    })
})

const port=5000;

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("surver is runing on port", port);
});