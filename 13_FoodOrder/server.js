
//third party or extrnal module
import express from "express"
import dotenv from "dotenv";

//dotenv config
dotenv.config({path:"./.env"});
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js"
import router from "./routes/user.routes.js";
import adminrouter from "./routes/adminroutes.js";
import RestaurantModel from "./model/Resturantmodel.js";

const app = express();
app.use(express.json());

//routes
app.use("/user",router);

//home routes / server check
app.get("/",(req,res)=>{
    res.json({message:"Hello from server"})
});

//Middleware /// if route not found
app.use((req,res,next)=>{
    next(new HttpError("Request route not found",404))
})

//  centralize Error handling
app.use((error,req,res,next)=>{
    if(res.headersSent){
        return next(error);
    }

    res.status(error.statusCode || 500).json({
        success:false,
        message:error.message||"internal server error"
    })
})

async function  Startserver() {
    try {
        await connectDB();

        const port= process.env.PORT || 5000;

        app.listen(port,()=>{
            console.log(`server running on port ${port}`);
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

Startserver();

//manually using RestaurantModel

// async function check() {
//     const RestaurantData = await RestaurantModel.findById("6a686feeddb0d1364ef39512")
//     .populate("owner","name email phone")
//     console.log(RestaurantData);
// }

// check();


// manually using User model

async function relationshipUser() {
    
    try {
        const userData= await modelUser.findById("")
        .populate("");
        console.log(userData);
    
    } catch (error) {
    console.log(error.message);
        
    }
}

relationshipUser();


//virtual 

// async function virtualUser() {
    
//     try {
//         const user = await RestaurantModel.findById("").populate("Restaurants");
//         console.log(user);
        
//     } catch (error) {
//         console.log(error.message);
        
//     }
// }

// virtualUser();