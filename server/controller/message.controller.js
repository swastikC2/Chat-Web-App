import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    let chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      chat.messages.push(newMessage._id);
    }

    await Promise.all([chat.save(), newMessage.save()]);

    // socket io functionality will be added
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    const chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!chat) {
      return res.status(200).json([]);
    }

    const messages = chat.messages;

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
