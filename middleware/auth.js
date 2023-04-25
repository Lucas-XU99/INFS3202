const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jsonwebtoken.verify(token, key, (err, decoded) => {
      if (err) {
        return res.sendStatus(400).json({ error: "Your session is expired, please login again" });
      }

      req.user = decoded;
      next();
    });
  } else {
    res.sendStatus(400).json({ error: "You are not logged in, please login" });
  }
};

module.exports = {
  authMiddleware,
};
