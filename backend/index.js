import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.config.js';
import authRouter from './src/routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import userRouter from './src/routes/user.route.js';
import messageRouter from './src/routes/message.route.js';
import { app, server } from './src/socket/socket.js';
dotenv.config()

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/message",messageRouter)



server.listen(PORT, () => {
  connectDB();
  console.log(`server started on http://localhost:${PORT}`);
});
