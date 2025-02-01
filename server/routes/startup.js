const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const {
  PrismaClientKnownRequestError,
} = require("@prisma/client/runtime/library");
const { signup, login, managerProfile } = require("../controllers/manager");
const { uploadStartup, startupProfile } = require("../controllers/startup");
const { notifications } = require("../controllers/communication");
const prisma = new PrismaClient();

//startup Signup
router.post("/signup", signup);

//startup login
router.post("/login", login);

//statup upload
router.post("/upload", uploadStartup);

//getting startupInfo Profile
router.get("/profile/:tinNumber", startupProfile);

//getting startup Manager Profile
router.get("/manager-profile", managerProfile);

//startup Manager Homepage
router.get("/home/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const startupProfile = await prisma.startupManager.findUnique({
      where: { Username: username },
      select: {  fullName: true },
    });
    if (!startupProfile) {
      console.log("Not found");
    }

    res.status(200).json(startupProfile);
  } catch (error) {
    console.error("Error retrieving startup manager data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//startup Manager Home Page startup show
router.get("/mystartups", async (req, res) => {
  try {
    const managerUsername = req.query.username;
    const startups = await prisma.startupInfo.findMany({
      where: { startupManagerUsername: managerUsername },
    });
    if (!startups) {
      console.log("No startups");
    }
    res.status(200).json({ startups });
  } catch (error) {
    console.log("error", error);
  }
});

//getting notification
router.get("/get-notifications", notifications);
module.exports = router;
