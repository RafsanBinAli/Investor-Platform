var express = require("express");
var router = express.Router();
const {
  getConversation,
  createConversation,
} = require("../controllers/communication");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/all", getConversation);
router.post("/create", authenticateToken, createConversation);
module.exports = router;
