// require('dotenv').config({path: './env'})

import dotenv from "dotenv"
// import express from "express";
import connectDB from "./db/index.js";
import {app} from "./app.js"

// const app = express()


//dotenv isliye use krte jab mai apna app run kru to sari sagah environmental varibale available ho jaye.
dotenv.config({
    path: './.env'
})

 const port = process.env.PORT || 4000;

//  console.log(port);

connectDB()

.then(()=>{
  app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
  })
})
.catch((error)=>{
    console.log("MONGO db connection failed",error);   
})



























// function connectDB(){

// }
// connectDB()

//1st approach

//  ( async () =>{
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error",(error)=>{
//   console.log(error);
//        })
    
//        app.listen(process.env.PORT,() =>{
//         console.log(`${process.env.MONGODB_URI}`);
        
//        })


//     } catch (error) {
//         console.log("error",error);
//         throw err
//     }
//  })()