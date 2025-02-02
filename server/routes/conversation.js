var express = require("express");
var router = express.Router();
const {
  getConversation,
  createConversation,
} = require("../controllers/communication");
const authenticateToken = require("../middlewares/authMiddleware");
const { sendMessage, retrieveMessage } = require("../controllers/message");

router.get("/all", getConversation);
router.post("/create", authenticateToken, createConversation);

router.post("/send-message", authenticateToken, sendMessage);
router.get("/message-retrive", retrieveMessage);

module.exports = router;
