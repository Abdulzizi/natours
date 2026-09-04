const express = require("express");

const app = express();

const PORT = 3030;

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to the app!"
  }).status(200)
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
})