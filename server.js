const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/Register");
const signin = require("./controllers/Signin");
const image = require("./controllers/Image");
const profile = require("./controllers/Profile");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "Strawberry123",
    database: "facebrain",
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

//* --> route --> response -> this is working
app.get("/", (req, res) => {
  res.send("this is working");
});

//* /sign in --> POST -> success/fail
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

//* /register --> POST -> user object
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

//* /profile/:userId --> GET = user object
app.get("/profile:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

//* /image --> PUT -> update user
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});
app.listen(3000, () => {
  console.log("app is running");
});
