const { User } = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();
const key = process.env.JWT_SECRET;

async function register(req, res) {
  const { username, email, password } = req.body;
  const user1 = await User.findOne({ where: { username } });
  if (user1) {
    return res.status(400).json({ error: "Username is already exsit" });
  }
  const user2 = await User.findOne({ where: { email } });
  if (user2) {
    return res.status(400).json({ error: "Email is already exsit" });
  }

  User.create({ username, email, password: bcrypt.hashSync(password, 10) })
    .then((user) => {
      const token = jwt.sign({ id: user.id }, key);
      return res.status(200).json({ token });
    })
    .catch((err) => {
      return res.status(400).json({ error: err.message });
    });
}

function login(req, res) {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ error: "Incorrect password" });
      }
      const token = jwt.sign({ id: user.id }, key);
      res.status(200).json({ token });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

async function getCurrentUser(req, res) {
  const { id } = req.user;
  User.findByPk(id)
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
      const resData = { id: user.id, username: user.username, email: user.email };
      res.status(200).json({ ...resData });
    })
    .catch((err) => {
      console.log(err);
    });
}

async function updateUser(req, res) {
  const { username, avatar, email } = req.body;
  const updateData = {};
  const user = await User.findByPk(req.user.id);
  if (username) {
    updateData.username = username;
  }

  if (avatar) {
    updateData.avatar = avatar;
  }

  if (email) {
    updateData.email = email;
  }

  user
    .update(updateData)
    .then(() => {
      return res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      return res.status(400).json({ message: err.message });
    });
}

async function sendResetCode(req, res) {
  const { email } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const token = jwt.sign({ id: user.id }, key);

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_SERVER,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_EMAIL_ADDRESS,
          pass: process.env.SMTP_KEY,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_EMAIL_ADDRESS,
        sender: "lucasxxx9896@gmail.com",
        to: email,
        subject: "Reset your password",
        text: `Please click the following link\n\n${process.env.base_url}/callback?token=${token}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(400).json({ message: error.message });
        }
        return res.status(200).json({ message: "success" });
      });
    })
    .catch((err) => {
      return res.status(400).json({ message: err.message });
    });
}

async function resetPassword(req, res) {
  const { password } = req.body;
  const user = await User.findByPk(req.user.id);
  user
    .update({ password })
    .then(() => {
      return res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      return res.status(400).json({ message: err.message });
    });
}

module.exports = {
  register,
  login,
  getCurrentUser,
  updateUser,
  sendResetCode,
  resetPassword,
};
