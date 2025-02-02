const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");


exports.signup = async (req, res) => {
  try {
    await prisma.startupManager.create({
      data: { ...req.body },
    });
    res.status(200).json({ message: "Manager created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.startupManager.findUnique({
      where: { Username: username },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const token = jwt.sign(
      { userId: user.NID, username: user.Username, userType: "manager" }, 
      process.env.JWT_SECRET, 
      { expiresIn: "365d" } 
    );

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.managerProfile = async (req, res) => {
  try {
    const username = req.query.username;

    const startupManager = await prisma.startupManager.findUnique({
      where: {
        Username: username,
      },
    });
    if (!startupManager) {
      console.log("Not found any investor");
    }
    return res.status(200).json({
      startupManager,
    });
  } catch {
    console.log("error");
  }
};
