var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { signup, login, profileInfo, updateProfile } = require("../controllers/investors");
const { allStartups } = require("../controllers/startup");
const { getBarInfo } = require("../controllers/bar");
const prisma = new PrismaClient();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "hello!" });
});


router.post("/signup", signup);
router.post("/login", login);
router.get("/all-startups", allStartups);
router.get("/profile", profileInfo);
router.put("/update/profile",updateProfile);

router.get("/bar", getBarInfo);

//getting the prev conversations for Dashboard
router.get("/conversations", async (req, res) => {
  const senderUsername = req.query.username;
  try {
    const conversation = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            investorUsername: senderUsername,
          },
          {
            startupManagerUsername: senderUsername,
          },
        ],
      },
    });

    if (conversation.length != 0) {
      const conversationIds = conversation.map(
        (conversation) => conversation.id
      );

      const otherNames = [];

      for (const conversationId of conversationIds) {
        try {
          const conversation = await prisma.conversation.findUnique({
            where: {
              id: conversationId,
            },
            include: {
              Investor: true,
              StartupManager: true,
            },
          });

          if (conversation) {
            const { Investor, StartupManager } = conversation;

            // Check if Investor exists and is not the loggedInUsername
            if (Investor && Investor.Username !== senderUsername) {
              otherNames.push({ id: conversationId, name: Investor.Username });
            }

            // Check if StartupManager exists and is not the loggedInUsername
            if (StartupManager && StartupManager.Username !== senderUsername) {
              otherNames.push({
                id: conversationId,
                name: StartupManager.Username,
              });
            }
          } else {
            console.log(`Conversation ${conversationId} not found`);
          }
        } catch (error) {
          console.error(
            `Error while retrieving conversation ${conversationId}:`,
            error
          );
        }
      }

      res
        .status(200)
        .json({ message: "Found all the conversations", otherNames });
    }
  } catch (error) {
    console.log("error");
  }
});

//message retriving for message section to show all the message in a conversation
router.get("/message-retriving", async (req, res) => {
  const convoID = req.query.convoID;
  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: Number(convoID),
      },
    });
    const formattedMessages = messages.map((message) => ({
      id: message.id,
      content: message.content,
      sender: message.sender,
      receiver: message.receiver,
    }));

    res.status(200).json(formattedMessages);
  } catch (error) {
    console.log("error", error.status);
    res.status(500).json("jhamela hoise");
  }
});


module.exports = router;
