let express = require("express");
let app = express();
require("dotenv").config();
let bodyParser = require("body-parser");

absolutePath = __dirname + "/views/index.html";

app.use(
  bodyParser.urlencoded({ extended: false }),
  function middleware(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
  },
);

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(absolutePath);
});

app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toUTCString();
    req.unix = Math.floor(Date.now() / 1000);
    next();
  },
  function (req, res) {
    res.send({ unix: req.unix, time: req.time });
  },
);

app.get("/:word/echo", function (req, res) {
  req.params.word;
  res.send({ echo: req.params.word });
  next();
});

app
  .route("/name")
  .get(function (req, res) {
    res.send({ name: req.query.first + " " + req.query.last });
  })
  .post(bodyParser.json(), function (req, res) {
    res.send({ name: req.body.first + " " + req.body.last });
  });

console.log("Hello World");

module.exports = app;
