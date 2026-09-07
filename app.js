const express = require("express");
const fs = require("node:fs");

const app = express();

const PORT = 3030;

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`, "utf8"));

app.get("/api/v1/tours", (req, res) => {
  res.status(200)
      .json({
        status: "success",
        message: "Data fetched successfully",
        result: tours.length,
        data: tours
      });
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
})