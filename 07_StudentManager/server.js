import express from "express";
import httpError  from "./middleware/httpError.js";
import connectDB from"./config/db.js";


const app=express();


app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Hello from server");
})

app.use((req,res,next)=>{
return next(new httpError("request route not found"),400)
})


app.use((error,req,res,next)=>{
    if(res.hedersSent){
        return next(error)
    }

    res.status(error.statusCode || 500).josn({
        message:error.message || "something went wrong"
    })
})


const port=5000;


async function startserver() {

    try{
        await connectDB();
        app.listen(port,(err)=>{
            if(err){
                return console.log(err.message)
            }
            console.log(`server running on port ${port}`)
        })
    }
    catch(error){
        console.log(error.message)
        process.exit(1)
    }
}

 startserver()