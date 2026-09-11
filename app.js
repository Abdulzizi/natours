const express = require("express");
const fs = require("node:fs");
const crypto = require("crypto");

const app = express();

app.use(express.json());

const PORT = 3030;

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`, "utf8"));

const getAllTours = (req, res) => {
    res.status(200)
        .json({
            status: "success",
            message: "Data fetched successfully",
            result: tours.length,
            data: tours
        });
}

const getTour = (req, res) => {
    const tour = tours.find(el => el._id === req.params._id);

    if(!tour){
        res.status(404)
            .json({
                status: "error",
                message: "Invalid Id",
            })
    }

    res.status(200)
        .json({
            status: "success",
            message: "Data fetched successfully",
            data: tour
        })
}

const addTour = (req,res) => {
    const newId = crypto.randomBytes(12).toString("hex");
    const newTour = Object.assign({ _id: newId },  req.body);

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
}

const updateTour = (req, res) => {
    console.log(req.body);
    const tour = tours.find(el => el._id === req.params._id);

    if(!tour){
        res.status(404)
            .json({
                status: "error",
                message: "Invalid Id",
            })
    }

    res.status(200)
        .json({
            status: "success",
            message: "Data updated successfully",
            data: "THIS IS SUCCHED",
        })
}

const deleteTour = (req, res) => {
    const tour = tours.find(el => el._id === req.params._id);

    if (!tour){
        res.status(404)
            .json({
                status: "error",
                message: "Invalid Id",
            })
    }

    res.status(200)

        .json({
            status: "success",
            message: "Data deleted successfully",
        })
}

app.get("/api/v1/tours", getAllTours);
app.get("/api/v1/tours/:_id", getTour);
app.post("/api/v1/tours", addTour);
app.patch("/api/v1/tours/:_id", updateTour);
app.delete("/api/v1/tours/:_id", deleteTour);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
})