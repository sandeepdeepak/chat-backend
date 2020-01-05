const Message = require("../models/message");
const Conversation = require("../models/conversation");
const User = require("../models/user");

module.exports = {
  sendMessage(req, res) {
    const { sender_id, receiver_id } = req.params;
    console.log(req.params);

    Conversation.find(
      {
        $or: [
          {
            participants: {
              $elemMatch: { senderId: sender_id, receiverId: receiver_id }
            }
          },
          {
            participants: {
              $elemMatch: { senderId: receiver_id, receiverId: sender_id }
            }
          }
        ]
      },
      async (err, result) => {
        console.log(result);
        if (result.length > 0) {
          // if (result.length < 0) {
        } else {
          const newConversation = new Conversation();
          newConversation.participants.push({
            senderId: req.params.sender_id,
            receiverId: req.params.receiver_id
          });

          saveConversation = await newConversation.save();

          console.log(saveConversation);

          const newMessage = new Message();
          newMessage.conversationId = saveConversation._id;
          newMessage.message.push({
            // senderId: req.params.sender_id,
            receiverId: req.params.receiver_id,
            // senderName: req.user.name,
            senderName: "sandy",
            receiverName: req.body.receiverName,
            body: req.body.message
          });

          console.log(req.params.sender_id);
          const updateUser = await User.updateOne(
            {
              _id: req.params.sender_id
            },
            {
              $push: {
                chatList: {
                  $each: [
                    {
                      receiverId: req.params.receiver_id,
                      msgId: newMessage._id
                    }
                  ],
                  position: 0
                }
              }
            }
          )
            .then(res => console.log(res))
            .catch(err => console.log(err));
          console.log(updateUser);

          await User.updateOne(
            {
              _id: req.params.receiver_id
            },
            {
              $push: {
                chatList: {
                  $each: [
                    {
                      receiverId: req.params.sender_id,
                      msgId: newMessage.msgId
                    }
                  ],
                  position: 0
                }
              }
            }
          );

          await newMessage
            .save()
            .then(() => res.status(200))
            .catch(err => console.log(err));
        }
      }
    );
  }
};
