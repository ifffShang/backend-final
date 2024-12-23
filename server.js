import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from 'cors';
import authRoutes from "./src/routes/authRoutes.js";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import passport from './src/config/passport.js';
import postRoutes from "./src/routes/post.routes.js"
import connectMongoBD from "./src/db/connectMongoDB.js";



const app = express();
const port = process.env.PORT || 8000;
// cors
app.use(cors({
    credentials: true,
    origin: 'https://frontend-final-69a3.onrender.com'
}));

app.options('*', cors());

// database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database not connected", err);
  });

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.urlencoded({extended: false}));

app.use('/api/posts', postRoutes);


app.use("/", authRoutes)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("NODE_ENV:", process.env.NODE_ENV);
  // connectMongoBD();
})

