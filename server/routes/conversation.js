var express = require("express");
var router = express.Router();
const {
  getConversation,
  createConversation,
} = require("../controllers/communication");
const authenticateToken = require("../middlewares/authMiddleware");
const { sendMessage } = require("../controllers/message");

router.get("/all", getConversation);
router.post("/create", authenticateToken, createConversation);

router.post("/send-message",authenticateToken, sendMessage);
module.exports = router;
