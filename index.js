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

// API endpoint for date
app.get("/api/:date", function (req, res) {
  const dateParam = req.params.date;
  const hasDash = dateParam.includes("-");
  const date = new Date(hasDash ? dateParam : parseInt(dateParam));
  const unix = hasDash ? date.getTime() : dateParam;
  res.json({ unix: unix, utc: date.toUTCString() });
});

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log("App is listening on port " + listener.address().port);
});
