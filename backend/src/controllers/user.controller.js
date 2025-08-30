import uploadOnCloudinary from "../config/cloudinary.config.js"
import User from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
    try {
        let id = req.userId
        const user = await User.findById(id).select("-password")
        if (!user) return res.status(404).json({ msg: "User not found" })
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message)

        res.status(500).json({ msg: "get current user failed" })
    }
}

export const updateProfile=async(req,res)=>{
    try {
        const {name}=req.body;
        let image;
        if(req.file){
            image=await uploadOnCloudinary(req.file.path);
        }
        const user=await User.findByIdAndUpdate(req.userId,{
            name,
            image
        },{new:true})
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        return res.status(200).json(user); 
    } catch (error) {
        return res.status(500).json({message:`profile error ${error}`})
    }
}

export const getOtherUsers=async(req,res)=>{
    try {
        const users=await User.find({
            _id:{$ne:req.userId}
        }).select("-password");
        return res.status(200).json(users)
    } catch (error) {
        console.log(`get user error ${error}`)
        
    }
}

export const search = async (req, res) => {
    try {
        let { query } = req.query;
        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { userName: { $regex: query, $options: "i" } }
            ]
        })

        

        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "search error" })
    }
}