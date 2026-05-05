

import express from "express"

import helmet from "helmet";


const app= express()
//external MIddelWare
///helmet()

app.use(helmet())


//application Middelware

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("This is home Page")
})

//routs MiddelWare

app.get("/about",(req,res)=>{
    res.send("this is about page");
})

//undefined MiddelWare

app.use((req,res)=>{
    res.status(200).send("ok");
})

//centerlizied
app.use((err,req,res,next)=>{
    console.log(err.message)

    res.status(error.statusCode || 500)
    .json({message :error.message || "Internal server error"})
})


const port =5000;

app.listen(port,(err)=>{
    if(err){
        console.log(err.message)
    }
    console.log(`server runing on port ${port}`)
})