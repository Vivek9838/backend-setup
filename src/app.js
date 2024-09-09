import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express()


//ye saari chese best practises hai
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


//ye mai jb form fill kiya tb data liya
app.use(express.json({
    limit:"16kb"
}))

//ye jb url se data aayega tb liya jayega
app.use(express.urlencoded(
    {extended:true,limit:"16kb"}))

//public me static file rakha jayega means images etc
app.use(express.static("public"))    

app.use(cookieParser())

export {app}