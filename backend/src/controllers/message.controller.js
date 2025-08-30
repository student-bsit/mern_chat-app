import uploadOnCloudinary from "../config/cloudinary.config.js";
import Conversation from "../models/coversation.mode.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    let sender = req.userId;
    let receiver  = req.params.receiverId;
    let { message } = req.body; 

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    
    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] }
    });

    let newMessage = await Message.create({
      sender,
      receiver,
      message,
      image
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [sender, receiver],
        messages: [newMessage._id]
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    const receiverSocketId=getReceiverSocketId(receiver);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage)
    }
    
    return res.status(201).json(newMessage);

  } catch (error) {
    console.error(`send message error: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const getMessages = async (req, res) => {
  try {
    const sender = req.userId;
    const receiver  = req.params.receiverId; 

    const conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] }
    }).populate("messages");

    if (!conversation) {
      return res.status(404).json({ message: "messages not found" });
    }

    return res.status(200).json(conversation.messages);

  } catch (error) {
    console.error("get message error", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
