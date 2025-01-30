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
