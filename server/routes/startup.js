const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { signup, login, managerProfile } = require("../controllers/manager");
const {
  uploadStartup,
  startupProfile,
  startupInfo,
  myStartups,
  startupProfileByUsername,
} = require("../controllers/startup");
const { notifications } = require("../controllers/communication");
const prisma = new PrismaClient();

router.post("/signup", signup);
router.post("/login", login);
router.post("/upload", uploadStartup);
router.get("/profile/:tinNumber", startupProfile);
router.get("/manager-profile", managerProfile);
router.get("/get-notifications", notifications);
router.get("/info/:tinNumber", startupInfo);
router.get("/data/:username", startupProfileByUsername);
router.get("/mystartups", myStartups);

module.exports = router;
