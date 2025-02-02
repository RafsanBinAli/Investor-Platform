const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.notifications = async (req, res) => {
  const username = req.query.username;
  try {
    const notification = await prisma.notifications.findMany({
      where: {
        startupManagerUsername: username,
      },
    });

    res.status(200).json({
      notification,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getConversation = async (req, res) => {
  const senderUsername = req.query.username;

  try {
    // Find conversations where the sender is either an investor or a startup manager
    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { investorUsername: senderUsername },
          { startupManagerUsername: senderUsername },
        ],
      },
    });

    if (conversations.length > 0) {
      res.status(200).json({
        message: "Found all the conversations",
        conversations,
      });
    } else {
      res.status(404).json({
        message: "No conversations found for this user",
      });
    }
  } catch (error) {
    console.error("Error retrieving conversations:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.createConversation = async (req, res) => {
  try {
    const sender = req.user.username;
    const receiver = req.body.messagingPartner;
    const senderType = req.user.userType;

    console.log(sender, receiver, senderType);
    if (!receiver) {
      return res.status(400).json({ error: "Receiver username is required" });
    }

    // Try to find an existing conversation between the sender and receiver
    let conversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          {
            investorUsername: sender,
            startupManagerUsername: receiver,
          },
          {
            investorUsername: receiver,
            startupManagerUsername: sender,
          },
        ],
      },
    });

    // If a conversation exists, return the conversation ID
    if (conversation) {
      return res.status(200).json({ conversationId: conversation.id });
    }

    // If no conversation is found, create a new one
    let newConversation;
    if (senderType === "investor") {
      newConversation = await prisma.conversation.create({
        data: {
          investorUsername: sender,
          startupManagerUsername: receiver,
        },
      });
    } else {
      newConversation = await prisma.conversation.create({
        data: {
          investorUsername: receiver,
          startupManagerUsername: sender,
        },
      });
    }

    // Return the ID of the newly created conversation
    return res.status(200).json({ conversationId: newConversation.id });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the conversation" });
  }
};
