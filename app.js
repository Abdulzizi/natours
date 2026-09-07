const express = require("express");
const fs = require("node:fs");

const app = express();

app.use(express.json());

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

app.post("/api/v1/tours", (req,res) => {
    const newId = tours[tours.length - 1].id;
    const newTour = Object.assign({id: newId},  req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours.json`, JSON.stringify(tours), err => {
        if (err) {
            res.status(500)
                .json({
                    status: "error",
                    message: err
                });
        }

        res.status(200)
            .json({
                status: "success",
                message: "Data created successfully",
                data: newTour
            })
    })
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
})