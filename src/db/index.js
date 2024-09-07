import mongoose from "mongoose";
import {DB_NAME} from "../constant.js";



const connectDB = async () =>{
    try {
       const connectionTInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       console.log(`MongoDB connected !! ${connectionTInstance.connection.host} `);
       
    } catch (error) {
        console.log("MONGODB connection error", error);
        process.exit(1)
        
    }
}

export default connectDB;