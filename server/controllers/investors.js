const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const user = await prisma.investor.create({
      data: { ...req.body },
    });
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await prisma.investor.findUnique({
      where: { Username: req.body.Username },
    });

    if (!user || user.password !== req.body.password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.Username, userType: "investor" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      user: user,
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.profileInfo = async (req, res) => {
  try {
    const username = req.query.username;
    const investor = await prisma.investor.findUnique({
      where: {
        Username: username,
      },
    });
    if (!investor) {
      console.log("Not found any investor");
    }
    return res.status(200).json({
      investor,
    });
  } catch {
    console.log("error");
  }
};

exports.updateProfile = async (req, res) => {
  const { username, ...updatedData } = req.body;

  try {
    const updatedProfile = await prisma.investor.update({
      where: { Username: username },
      data: updatedData,
    });
    res.json(updatedProfile);
  } catch (error) {
    console.log("error");
  }
};
