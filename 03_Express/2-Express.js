
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
});

//middleWares
app.use((req,res,next)=>{
    console.log("Request Url",req.url);
    next();
});

const port=5001;

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("surver is runing on port", port);
});