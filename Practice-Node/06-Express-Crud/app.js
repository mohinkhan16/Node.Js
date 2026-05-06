

import express from "express"

import httpError from "./middelWare/httpError.js"

const app=express()

app.use(express.json());

const taskList=[{
    id:1,
    task:"playing",
    message:"I am playing"
},
{
    id:2,
    task:"Learn",
    message:"We won't to Learn new new thing daily "
}]

app.get("/",(req,res)=>{
    res.send("Hello from server");
})


app.get("taskList",(req,res)=>{
    if(task.lenth===0){
        return res.status(200).json({
            message:"task not found"
        })
    }
    
    res
    .status(200)
    .json({message:"TaskList",taskList})
})



const port =5000;

app.listen(port,(err)=>{
    if(err){
        return console.log(err.message)
    }
    console.log(`surver is running on ${port}`)
})