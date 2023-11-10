require("dotenv").config();

// init express
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (_req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// API endpoint for empty date
app.get("/api/", function (_req, res) {
  const date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// API endpoint for date
app.get("/api/:date", function (req, res) {
  const dateParam = req.params.date;
  const isUnix = !isNaN(dateParam);
  const date = new Date(isUnix ? parseInt(dateParam) : dateParam);
  const unix = isUnix ? parseInt(dateParam) : date.getTime();
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({ unix, utc: date.toUTCString() });
  }
});

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log("App is listening on port " + listener.address().port);
});
