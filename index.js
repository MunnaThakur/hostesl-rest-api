import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
// import session from "express-session";
import userRouter from "./routes/user.js";
import hotelRouter from "./routes/hotel.js";
dotenv.config()
const app = express();
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// app.use(cors({credentials: true, origin: "https://roaring-marigold-295de9.netlify.app"}));
app.use(cors({credentials: true, origin: "*"}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// app.use(
//   session({
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 1,
//       httpOnly: true, //set false if you want to change the cookie using JavaScipt
//       secure: false,
//       sameSite: "lax",
//     },
//   })
// );
app.use("/users", userRouter);
app.use("/api/hotels", hotelRouter);
const port = process.env.PORT || 5000;
const mongo_DB_URI = "mongodb+srv://munna:Thakur@housingapi.9jmbm.mongodb.net/?retryWrites=true&w=majority"

mongoose
  .connect(mongo_DB_URI)
  .then(() => {
    app.listen(port, () => console.log(`Connected server on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

  