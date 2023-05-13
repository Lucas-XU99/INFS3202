const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const courseRouter = require("./routes/course");
const categoryRouter = require("./routes/category");
const questionRouter = require("./routes/question");
const answerRouter = require("./routes/answer");
const reviewController = require("./routes/review");
const wishlistController = require("./routes/wishlist");


const cors = require("cors");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "view")));
app.use("/static", express.static(path.join(__dirname, "view/build/static")));

app.use(/^((?!\/api).)*$/, indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/course", courseRouter);
app.use("/api/category", categoryRouter);
app.use("/api/question", questionRouter);
app.use("/api/answer", answerRouter);
app.use("/api/review", reviewController);
app.use("/api/wishlist", wishlistController);


module.exports = app;
