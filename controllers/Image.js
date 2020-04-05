const clariafi = require("clarifai");

//*  Settings and Set Up
const app = new Clarifai.App({
  apiKey: "1daf58efe29b46758f7a4618be4d2f3a",
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req, body.input)
    .then((data) => {
      res.json(data).catch((err) => res.status(400).json("error"));
    });
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
