const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getParticularMeeting = async (req, res) => {
  try {
    const { code } = req.params;

    const meeting = await prisma.schedule.findMany({
      where: {
        tinNumber: code,
      },
      select: {
        date: true,
      },
    });

    if (meeting.length === 0) {
      console.log("There is no meeting found!");
      return res
        .status(404)
        .json({ success: false, message: "Meeting not found" });
    }

    const meetingData = meeting[0].date;

    return res.status(200).json({
      meetingData,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

//set meeting for investor
exports.setMeeting = async (req, res) => {
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
};
