import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"


const formSendData = asyncHandler(async (req, res) => {
    // Log the request body for debugging

    const { name, email, mobile, city, message } = req.body;
    console.log("name",name);
    console.log("email",email)
    if (!name || !email || !mobile || !city) {
        return res.status(400).json(
            new ApiResponse(400, null, "All required fields must be provided")
        );
    }

    const user = await User.create({
        name,
        email,
        mobile,
        city,
        message
    });
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
     )

     if(!createdUser){
        throw new ApiError(500,"Something went wrong")
     }

    return res.status(201).json(
        new ApiResponse(200,createdUser, "User register sucessfully")
    )
});

export {
    formSendData
}