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
    // Get user from the database
    const user = await prisma.investor.findUnique({
      where: { Username: req.body.Username },
    });

    // Check if the user exists and the password matches
    if (!user || user.password !== req.body.password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Create JWT token if user is authenticated
    const token = jwt.sign(
      { userId: user.id, username: user.Username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expiration time, you can adjust as needed
    );

    // Send the response with the token
    return res.status(200).json({
      message: "Login successful",
      user: user,
      token: token,  // Send the token in the response
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
