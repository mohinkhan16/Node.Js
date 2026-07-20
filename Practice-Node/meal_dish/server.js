import express  from "express";
import dotenv from "dotenv"
import { connect } from "mongoose";
dotenv.config({path:"./.env"});

const app = express();
app.use(express.json());


app.get("/",(req,res)=>{
    res.json({message:"hello from server"})
})


//middelware
app.use((req,res,next)=>{
    next(new HttpError("request route not found"))
})

//centrlized error

app.use((error,req,res,next)=>{
    if(res.headersSent){
        return next(error);
    }

    res.status(error.statusCode || 500).json({
        success:false,
        message:error.message || "internal server error"
    })
})


async function startserver() {
    
    try {
        await connectDB();

        const port = process.env.PORT || 5000;

        app.listen(prompt,()=>{
            console.log(`server running on port ${port}`);
        })
    } catch (error) {
        console.log(error.message);
        process.env(1)
    }
}

startserver();