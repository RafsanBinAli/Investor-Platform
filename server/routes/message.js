var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.sendMessage = async (req, res) => {
  try {
    const { senderUsername, receiverUsername, content } = req.body;
    const [senderName, senderType] = senderUsername.split("+");
    const [receiverName, receiverType] = receiverUsername.split("+");
    console.log(senderName, receiverName);
    let conversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          {
            investorUsername:
              senderType === "investor" ? senderName : receiverName,
            startupManagerUsername:
              senderType === "manager" ? senderName : receiverName,
          },
          {
            investorUsername:
              receiverType === "investor" ? receiverName : senderName,
            startupManagerUsername:
              receiverType === "manager" ? receiverName : senderName,
          },
        ],
      },
    });

    console.log(conversation)

    // If conversation doesn't exist, create a new one
    if (!conversation) {
      const investorRecord = await prisma.investor.findUnique({
        where: {
          Username: senderType === "investor" ? senderName : receiverName,
        },
      });

      const managerRecord = await prisma.startupManager.findUnique({
        where: {
          Username: senderType === "manager" ? senderName : receiverName,
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
        try {
          const notification = await prisma.notifications.create({
            data: {
              primaryActor: {
                connect: { Username: senderName },
              },
              secondaryActor: {
                connect: { Username: receiverName },
              },
              about: "message",
            },
          });
        } catch (error) {
          console.log(error);
        }

        console.log(
          `New conversation created between ${senderName} and ${receiverName}`
        );
      }
    } else {
      console.log(
        `Conversation already exists between ${senderName} and ${receiverName}`
      );
    }

    const message = await prisma.message.create({
      data: {
        content,
        Investor: {
          connect: {
            Username: senderType === "investor" ? senderName : receiverName,
          },
        },
        StartupManager: {
          connect: {
            Username: senderType === "manager" ? senderName : receiverName,
          },
        },
        Conversation: {
          connect: { id: conversation.id },
        },
        sender: senderName,
        receiver: receiverName,
      },
    });

    res
      .status(200)
      .json({ message: "Conversation and message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
