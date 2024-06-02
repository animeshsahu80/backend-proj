import mongoose, { mongo } from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB= async ()=>{
    try{
        const connectionIns=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`); 
        console.log(`connected to db ${connectionIns.connection.host}`);

    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;