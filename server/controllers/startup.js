const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.uploadStartup = async (req, res) => {
  try {
    const { startupManagerUsername, ...startupData } = req.body;

    const manager = await prisma.startupManager.findUnique({
      where: { Username: startupManagerUsername },
    });

    if (!manager)
      return res.status(404).json({ error: "Startup manager not found" });

    const startupInfo = await prisma.startupInfo.create({
      data: {
        ...startupData,
        Manager: { connect: { Username: manager.Username } },
      },
    });

    res
      .status(200)
      .json({ message: "StartupInfo created successfully", startupInfo });
  } catch (error) {
    console.error("Error creating startupInfo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.startupProfile = async (req, res) => {
  try {
    const { tinNumber } = req.params;
    const startupInfo = await prisma.startupInfo.findUnique({
      where: { tinNumber: tinNumber },
      include: { Manager: true },
    });

    if (!startupInfo) {
      console.log("Startup Not Found");
    }

    const managerInfo = startupInfo.Manager;
    res.status(200).json({ ...managerInfo, startups: [startupInfo] });
  } catch (error) {
    console.log(error);
  }
};

exports.allStartups = async (req, res) => {
  try {
    const startupInfo = await prisma.startupInfo.findMany();

    if (!startupInfo || startupInfo.length === 0) {
      console.log("Nothing Found!");
    }
    res.status(200).json({ startupInfo });
  } catch (error) {
    console.log(error);
  }
};

exports.startupInfo = async (req, res) => {
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
};

exports.myStartups = async (req, res) => {
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
};

exports.startupProfileByUsername= async (req, res) => {
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
};