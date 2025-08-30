import express from 'express'
import isAuth from '../middlewares/auth.middleware.js'
import upload from '../middlewares/multer.middleware.js';
import { getMessages, sendMessage } from '../controllers/message.controller.js';

const messageRouter=express.Router();

messageRouter.post("/send/:receiverId",isAuth,upload.single("image"),sendMessage)
messageRouter.get("/get/:receiverId",isAuth,getMessages)



export default messageRouter;