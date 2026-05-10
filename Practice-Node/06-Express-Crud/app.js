

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

app.post("/addTask",(req,res,next)=>{
    const { addtask }=req.body;

    if( !task || !description){
        return next(
            new httpError("Task or Description is not requried",404)
        );
    }

    const newTask={
        id:new Date().getTime(),
        task,
        description,
    };
    task.push(newTask);

    res.status(201).json({
        success:true,
        message:"New Task Added Succesfully",
        newTask
    });
});

app.delete("/task/:id",(req,res,next)=>{
    const id=Number(req.params.id);

    const index=task.findeIndex((t)=>t.id===id);

    if(index===-1){
        return next(
            new httpError("Request not found",404)
        );
    }

        task.splice(index,1);

        res.status(200).json({
            success:true,
            message:"Task Deleted successfully"
        });
});

app.use((req,res,next)=>{
    next(new httpError("Request not found",404));

    res.status(err.statucode || 500).json({
        success :false,
        message:err.message || "something went wrong"
    });
});

const port =5000;

app.listen(port,(err)=>{
    if(err){
        return console.log(err.message)
    }
    console.log(`surver is running on ${port}`)
})

