const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();



app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.set("port", (process.env.PORT || 8080));

app.set("views", ["./views","./views/projects"]);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const data = {
    person: {
      firstName: "Alonzo",
      lastName: "Quintero",
    }
  }

  res.render("index")
});

app.get("/portfolio", (req, res) => {
  res.render("portfolio");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/moreProjects", (req, res) => {
  res.render("moreProjects");
});

app.get("/davesdepot", (req, res) => {
  res.render("davesdepot");
});

app.get("/changecalc", (req, res) => {
  res.render("changecalc");
});

app.get("/moviefinder", (req, res) => {
  res.render("moviefinder");
});

app.get("/weatherapp", (req, res) => {
  res.render("weatherapp");
});

app.get("/VSTDA", (req, res) => {
  res.render("VSTDA");
});

app.post("/thanks", (req, res) => {

  const accountSid = process.env.accountSid;
  const authToken = process.env.authToken;
  const client = require("twilio")(accountSid, authToken);


  var userInfo = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    message: req.body.message
  }
  console.log("REQ.BODY:  ", req.body);
  client.messages.create({
    to: "+16192611050",
    from: "+16193046191",
    body: "\n" + `Interest from: ${userInfo.firstName} ${userInfo.lastName}` + "\n" +
      `PhoneNumber: ${userInfo.phoneNumber}` + "\n" +
      `Email: ${userInfo.email}` + "\n" +
      `Message: ${userInfo.message}`,
  }, function (err, message) {
    console.log(message.sid);
  });
  res.render("thanks", { userInfo: userInfo })
});



module.exports = app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
