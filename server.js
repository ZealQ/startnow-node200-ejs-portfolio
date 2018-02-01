

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const AccountSid= "AC7762f26decf4b81e06c7750e0fc96675";
const authToken= "5dc51d6f3b0ae0890a9bcadd0f61a63a";
const client = require("twilio")(AccountSid,authToken);

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.set("port", (process.env.PORT || 8080));

app.set("views", "./views");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const data = {
    person: {
      firstName: 'Alonzo',
      lastName: 'Quintero',
    }
  }

  res.render("index")
});

app.get('/portfolio', (req, res) => {
  res.render('portfolio');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/thanks', (req, res) => {
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
    body: '\n' + `Interest from: ${userInfo.firstName} ${userInfo.lastName}` + '\n' +
      `PhoneNumber: ${userInfo.phoneNumber}` + '\n' +
      `Email: ${userInfo.email}` + '\n' +
      `Message: ${userInfo.message}`,
  }, function (err, message) {
    console.log(message.sid);
  });
  res.render('thanks', {userInfo: userInfo})
});



app.listen(8080, () => {
  console.log("listening at http://localhost:8080");
});



