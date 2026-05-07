

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

//specific task seen for 

app.get("/task/:id",(req,res)=>{
    const {id}= Number(req.params);

    const task=task.find((t)=> t.id === id);

    if(!task){
        return res.status(404).json({success:"true",message:"Task Not Found",task});
    }

    res.status(200).json({success:"true",message:"Task found",task})
})


//creat

app.post("/addTask",(req,res,netx)=>{

    const {task,description} = req.body;

    if(!task || !description){
        return netx(new httpError("Task or description is requried"),404);
    }

    const newtask={
        id:new Date().getTime(),
        task,
        description,
    };

    task.push(newtask);

    res
    .status(201)
    .json({success:"true",message:"New task Added ".newtask })
})


const port=5000;

app.listen(port,(err)=>{
    if(err){
        return console.log(err.message)
    }
    console.log(`surver runing ${port}`)
})