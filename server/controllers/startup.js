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
