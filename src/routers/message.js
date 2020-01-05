const express = require("express");
const Converstion = require("./../models/conversation");
const msgControl = require("../controllers/message");
const router = new express.Router();

router.post("/chat-messages/:sender_id/:receiver_id", msgControl.sendMessage);

module.exports = router;
