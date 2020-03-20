const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const database = {
  users: [
    {
      id: "1",
      name: "liz",
      email: "liz@gmail.com",
      password: "liz",
      entries: "0",
      joined: new Date()
    }
  ]
};

//* --> route --> response -> this is working
app.get("/", (req, res) => {
  res.send("this is working");
});

//* /sign in --> POST -> success/fail
app.post("/signin", (req, res) => {
  //get email from request body
  const email = req.body.email;

  //get password from request body
  const password = req.body.password;

  //get user from database
  //check data
  //send success or fail
  if (
    email === database.users[0].email &&
    password === database.users[0].password
  ) {
    res.json("signed in");
  } else {
    res.status(400).json("error logging in");
  }
});

//* /register --> POST -> user object
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  database.users.push({
    id: "2",
    name: name,
    email: email,
    password: password,
    entries: "0",
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
});

//* /profile/:userId --> GET = user object
app.get("/profile/:Id", (req, res) => {
  const { id } = req.params;

  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.json("no such user").status(404);
  }
});

//TODO /image --> PUT -> update user
app.post("/image", (req, res) => {
  const { id } = req.body;

  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });

  if (!found) {
    res.json("no such user").status(404);
  }
});

app.listen(3000, () => {
  console.log("app is running");
});
