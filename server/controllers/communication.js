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
    console.log( error);
  }
};
