
import mongoose from "mongoose";

async function connectDB(params) {
    
    try{
        const connect =await mongoose.connect(process.new.MONGO.URl);

        console.log("DB connected");

        return connect;
    }catch(error){
        throw new Error(error.message)
    }
}

export default connectDB;