import express from 'express'
import isAuth from '../middlewares/auth.middleware.js'
import { getCurrentUser, getOtherUsers, search, updateProfile } from '../controllers/user.controller.js';
import upload from '../middlewares/multer.middleware.js';
const userRouter=express.Router();

userRouter.get("/currUser",isAuth,getCurrentUser)
userRouter.put("/profile",isAuth,upload.single("image"),updateProfile)
userRouter.get("/getUsers",isAuth,getOtherUsers)
userRouter.get("/search",isAuth,search)


export default userRouter;