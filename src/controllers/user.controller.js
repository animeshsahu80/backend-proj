 import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiErrors.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadFileOnCloud } from "../utils/cloudinary.js";


 const registerUser= asyncHandler(async (req, res)=>{
    const {userName,email,fullName,password }=req.body;
    console.log(email);
    if([fullName, email, userName, password].some((field)=>field?.trim()==="")){
        throw new ApiError(400, "All fields are required")
    }
    const existingUser=User.findOne({
        $or:[{userName}, {email}]
    });
    console.log(req.files);

    if(existingUser){
        throw new ApiError(409, "User with email or user name alredy exists" );

    }
    // req.files?.avatar[0]?.path
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath= req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar image is requred")
    }
    const avatar=await uploadFileOnCloud(avatarLocalPath);
    const coverImage=await uploadFileOnCloud(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar image is requred")
    }

    const user= await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        userName: userName.toLowerCase(),
    });
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    if(!createdUser){
        throw new ApiError(500, "Something went wrong during registration")
    }
    return res.status(201).json( new ApiResponse(200, createdUser, "user registered successfully"
        )
    )
 })

    
 export {registerUser};