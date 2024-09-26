import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"

//check kr liya sahi se chal rha hai postman me

// const registerUser = asyncHandler(async (req,res) => {
//     res.status(200).json({
//         message:"chai aur code"
//     })
// })

// export {registerUser}


const registerUser = asyncHandler (asyncHandler(async (req,res) => {

    const {email,username,fullname,password,} = req.body;
    // console.log(email);
    
//aise bhi kr sakte hai
//     if(fullname === ""){
//    throw new ApiError(400,"fullname is required")
//     } 

   if(
    [fullname,email,password,username].some((field)=> field?.trim() == "")){
        throw new ApiError(400,"All fields are required")

    }
         
   const exitsUser =await User.findOne({
        $or:[{username},{email}]
    })
        
    if(exitsUser){
        throw new ApiError(409,"User with email and username already exits")
    }
    
    // console.log(req.files);
    

    //yaha multer ne files ka accesss deta hai
   const avatarLocalPath =  req.files?.avatar[0]?.path;
//    const coverImageLocalPath = req.files?.coverImage[0]?.path;
 
   let coverImageLocalPath;
   if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
    coverImageLocalPath = req.files.coverImage[0].path 
   }


   if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
   }

      const avatar = await uploadOnCloudinary(avatarLocalPath);
      const coverImage = await uploadOnCloudinary(coverImageLocalPath)

      if(!avatar){
        throw new ApiError(400,"Avatar file is required")
      }

     const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
      })

     const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
     )

     if(!createdUser){
        throw new ApiError(500,"Something went wrong")
     }

    return res.status(201).json(
        new ApiResponse(200,createdUser, "User register sucessfully")
    )
   

}))





export {
    registerUser,

}
