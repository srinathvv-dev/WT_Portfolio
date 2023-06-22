const express = require("express");
const app = express();
const port = 3000;
const hostname = "localhost";
app.use(express.static("public"));
app.use(express.json());

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

//Connection establishment
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/contactDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

//Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  service: String,
  message: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
//Form submission
app.post("/submit", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const contact = req.body.contact;
  const service = req.body.service;
  const message = req.body.message;

  try {
    const user = new User({ name });
    await user.save();
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
app.get("/adminview", (req, res) => {
  const User = mongoose.model("contacts", userSchema);
  User.find({})
    .then((data) => {
      res.render("adminview", { data: data });
    })
    .catch((err) => {
      console.log("Failed to retrive data from Mongodb:", err);
    });
});
