const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Remove "Bearer " prefix

  if (!token) {
    return res.status(401).json({ error: "Access Denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token using the secret key

    // Attach the decoded user information to the request object (e.g., userId, username)
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

module.exports = authenticateToken;
