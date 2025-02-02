var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { signup, login } = require("../controllers/investors");
const { allStartups } = require("../controllers/startup");
const { getParticularMeeting } = require("../controllers/schedule");
const { sendMessage } = require("../controllers/message");
const prisma = new PrismaClient();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ message: "hello!" });
});

//Signup for investor
router.post("/signup", signup);

//login for investor
router.post("/login", login);

//showing the startup at investor Homepage
router.get("/all-startups", allStartups);

//getting startup info using tinNumber
router.get("/startup-info/:tinNumber", async (req, res) => {
  try {
    const { tinNumber } = req.params;
    const startupInfo = await prisma.startupInfo.findUnique({
      where: { tinNumber: tinNumber },
    });
    if (!startupInfo) {
      console.log("Not Found");
    }
    res.status(200).json(startupInfo);
  } catch (error) {
    console.log(error);
  }
});

//set meeting for investor
router.post("/set-meeting/:username", async (req, res) => {
  const { time, date, tinNumber } = req.body;
  const { username } = req.params;

  try {
    // Find the investor
    const investor = await prisma.investor.findUnique({
      where: { Username: username },
    });

    if (!investor) {
      console.log("Investor not found!");
      return res.status(404).json({ error: "Investor not found" });
    }

    // Find the associated startup with its manager
    const startup = await prisma.startupInfo.findUnique({
      where: { tinNumber: tinNumber },
      include: {
        Manager: true,
      },
    });

    if (!startup) {
      console.log("Startup not found!");
      return res.status(404).json({ message: "Startup not found" });
    }

    const startupManager = startup.Manager;

    //schedule create
    const updatedSchedule = await prisma.schedule.create({
      data: {
        date: new Date(`${date}T${time}`),
        investor: {
          connect: { Username: username },
        },
        startupManager: {
          connect: { Username: startupManager.Username },
        },
        startupInfo: {
          connect: { tinNumber: tinNumber },
        },
      },
    });

    try {
      //create notification about meeting
      const notification = await prisma.notifications.create({
        data: {
          primaryActor: {
            connect: { Username: username },
          },
          secondaryActor: {
            connect: { Username: startupManager.Username },
          },
          about: "meeting",
          meetingTime: new Date(`${date}T${time}`),
        },
      });
    } catch (error) {
      console.log(error);
    }

    return res
      .status(200)
      .json({ success: true, message: "Meeting set successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//searching meeting
router.get("/meeting-searched/:code", getParticularMeeting);

//search function of investor-home page about startup
router.get("/search-by-name/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const startup = await prisma.startupInfo.findMany({
      where: { startupName: name },
    });
    if (startup.length === 0) {
      return res.status(404).json({
        message: "No Startup Found",
      });
    }
    return res.status(200).json({
      startup,
    });
  } catch (error) {
    console.log("error");
  }
});

//getting the informatin of startup profile
router.get("/investor-profile", async (req, res) => {
  try {
    const username = req.query.username;
    const investor = await prisma.investor.findUnique({
      where: {
        Username: username,
      },
    });
    if (!investor) {
      console.log("Not found any investor");
    }
    return res.status(200).json({
      investor,
    });
  } catch {
    console.log("error");
  }
});

//investor profile edit
router.put("/update-investor-profile", async (req, res) => {
  const { username, ...updatedData } = req.body;

  try {
    const updatedProfile = await prisma.investor.update({
      where: { Username: username },
      data: updatedData,
    });
    res.json(updatedProfile);
  } catch (error) {
    console.log("error");
  }
});

//retrive manager Username
router.get("/get-managerName", async (req, res) => {
  try {
    const tinNumber = req.query.tinNumber;
    const managerName = await prisma.startupInfo.findUnique({
      where: {
        tinNumber: tinNumber,
      },
    });

    if (managerName) {
      var managerUsername = managerName.startupManagerUsername;
      res.status(200).json({
        managerUsername,
      });
    }
  } catch (error) {
    console.log("error getting name");
  }
});

// bar chart for graph
router.get("/bar", async (req, res) => {
  try {
    const startupInfo = await prisma.startupInfo.findMany();

    const startupCounts = {};
    startupInfo.forEach((startup) => {
      const industry = startup.industry || "Others";
      startupCounts[industry] = (startupCounts[industry] || 0) + 1;
    });

    const result = Object.entries(startupCounts).map(([fieldName, count]) => ({
      fieldName,
      count,
    }));
    result.sort((a, b) => {
      if (a.fieldName === "Others") return 1;
      if (b.fieldName === "Others") return -1;
      return 0;
    });
    res.json(result);
  } catch (error) {
    console.log("error status", res.status);
  }
});

//sending message

router.post("/send-message", sendMessage);

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

//create new conversation
router.post("/create-convo", async (req, res) => {
  try {
    const sender = req.body.investor;
    const receiver = req.body.startupManager;

    let conversation = await prisma.conversation.findFirst({
      where: {
        investorUsername: sender,
        startupManagerUsername: receiver,
      },
    });

    if (conversation) {
      const conversationData = {
        id: conversation.id,
        startupManagerUsername: conversation.startupManagerUsername,
      };

      res.status(200).json({ conversation: conversationData });
    }
    if (!conversation) {
      const investorRecord = await prisma.investor.findUnique({
        where: {
          Username: sender,
        },
      });

      const managerRecord = await prisma.startupManager.findUnique({
        where: {
          Username: receiver,
        },
      });

      if (investorRecord && managerRecord) {
        conversation = await prisma.conversation.create({
          data: {
            Investor: {
              connect: { Username: investorRecord.Username },
            },
            StartupManager: {
              connect: { Username: managerRecord.Username },
            },
          },
        });
      }
    }
    res.json("okay");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
