import express from "express"
import httpError from "./middleware/httpError";
import connectDB from "./config/db.js";


const app=express()

app.use(express.json())


app.get("/",(req,res,next)=>{
    res.sed("Hello from sever");
});

app.use((req,res,next)=>{
    return next(new httpError("request rout not found"),400);
})

app.use((error,req,res,next)=>{
    if(res.hedersSent){
        return next(error)
    }

    res.status(error.statusCode || 500).josn({
        message:error.message || "something went wrong"
    })
})

const port =5000;


async function Startserver() {

    try{
        await connectDB();
        {
            app.listen(port,(err)=>{
                if(err){
                    return console.log(err.message)
                }
                console.log(`surver running on port ${port}`)
            })
        }
    }
        catch(error){
            console.log(error.message);
            process.exit(1);
        }   
}
