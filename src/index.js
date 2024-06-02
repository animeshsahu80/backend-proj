// require('dotenv').config()

import dotenv from "dotenv";

import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`app is listning on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("connection failed");
  });

// const app=express();

// ;
// (async()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//         app.on("error",(error)=>{
//             console.log(error);
//             throw error;
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`app is listning on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.log(error);
//         throw error
//     }

// })()
