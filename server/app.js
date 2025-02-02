var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const http = require("http");
const initializeSocket = require("./public/javascripts/socket");

var investorRouter = require("./routes/investor");
var startupRouter = require("./routes/startup");
var conversationRouter = require("./routes/conversation");
var meetingRouter = require("./routes/meeting");

var app = express();
const httpServer = http.createServer(app);
const io = initializeSocket(httpServer);
const PORT = 5000;

// Middleware
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", investorRouter);
app.use("/startup", startupRouter);
app.use("/conversation", conversationRouter);
app.use("/meeting", meetingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  });
});

httpServer.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
