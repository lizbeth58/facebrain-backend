const express = require("express");

const app = express();

//! --> route --> response -> this is working
app.get("/", (req, res) => {
  res.send("this is working");
});

//! /sign in --> POST -> success/fail
app.post("/signin", (req, res) => {});

//! /register --> POST -> user object
app.post("/register", (req, res) => {});

//! /profile/:userId --> GET = user object
app.get("/profile/:userId", (req, res) => {});

//! /image --> PUT -> update user
app.put("/image", (req, res) => {});

app.listen(3000, () => {
  console.log("app is running");
});
