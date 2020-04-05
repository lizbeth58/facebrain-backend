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
app.post("/signin", signin.handleSignin(db, bcrypt)(req, res));

//* /register --> POST -> user object
app.post("/register", register.handleRegister(db, bcrypt)(req, res));

//* /profile/:userId --> GET = user object
app.get("/profile:id", profile.handleProfile(db)(req, res));

//* /image --> PUT -> update user
app.put("/image", image.handleImage(db)(req, res));
app.post("/imageurl", image.handleApiCall(req, res));
app.listen(3000, () => {
  console.log("app is running");
});
