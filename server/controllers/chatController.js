import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  const { receiver, content } = req.body;
  try {
    const msg = await Message.create({
      sender: req.user._id,
      receiver,
      content
    });
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const msgs = await Message.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }]
    }).populate("sender receiver", "username email");
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




