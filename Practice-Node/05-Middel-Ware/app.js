import express from "express"

import helmet from "helmet"

const app=express();

//external MiddelWare

//helmet()

app.use(helmet());

//application Middelware

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("this is home page")
})

//routs Middelware

app.get("/about",(req,res)=>{
    res.send("This is about page")
})

//undefined Middelware

app.use((req,res)=>{
    res.status(200).send("ok")
})

//




const port=5000;

app.listen(port,(err)=>{
    if(err){
        console.log(err.message)
    }
    console.log(`surver running on ${port}`)
})