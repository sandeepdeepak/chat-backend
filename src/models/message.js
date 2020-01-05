const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
  message: [
    {
      receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      senderName: { type: "String" },
      receiverName: { type: "String" },
      body: { type: "String" },
      isRead: { type: "boolean", default: "false" },
      createdId: { type: Date, default: Date.now() }
    }
  ]
});

module.exports = mongoose.model("Message", messageSchema);
