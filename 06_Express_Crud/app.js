

import express from "express"
import httpError from "./middelware/httpError.js";

const app = express();

app.use(express.json());


const task=[{
    id:1,
    task:"practice",
    message:"you want to practice everyday"},
    
    {id:2,
    task:"learn",
    message:"you have to learn New thing"}
]

app.get("/",(req,res)=>{
    res.json("Hello from Server")
})

app.get("/task",(req,res)=>{
    if(task.length===0){
        return res.status(200).json({
            message:"Task is not availabel"
        })
    }

    res
    .status(200)
    .json({message:"task",task})
})

const port=5000;

app.listen(port,(err)=>{
    if(err){
        return console.log(err.message)
    }
    console.log(`surver runing ${port}`)
})