import express from "express";

import httpError from "./middelware/httpError.js";

const app = express();

app.use(express.json());

const carList = [
  {
    id: 1,
    car: "BMW",
    description: "Luxury car"
  },
  {
    id: 2,
    car: "Audi",
    description: "Premium  car"
  }
];

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.get("/carList", (req, res) => {
  if (carList.length === 0) {
    return res.status(404).json({
      success: true,
      message: "Car not found"
    });
  }

  res.status(200).json({
    success: true,
    message: "car list",
    carList
  });
});

app.get("/carList/:id", (req, res) => {
  const id = Number(req.params.id);

  const car = carList.find((c) => c.id === id);

  if (!car) {
    return res.status(404).json({
      success: true,
      message: "No car data found"
    });
  }

  res.status(200).json({
    success: true,
    message: "car found",
    car
  });
});

app.post("/addCar", (req, res, next) => {
  const { car, description } = req.body;

  if (!car || !description) {
    return next(new httpError("car or description is required", 400));
  }

  const newCar = {
    id: new Date().getTime(),
    car,
    description
  };

  carList.push(newCar);

  res.status(201).json({
    success: true,
    message: "new car added successfully",
    newCar
  });
});

app.patch("/updateCar/:id", (req, res, next) => {
  const id = Number(req.params.id);

  const carData = carList.find((c) => c.id === id);

  if (!carData) {
    return next(new httpError("car data not found", 404));
  }

  const { car, description } = req.body;

  if (!car && !description) {
    return next(
      new httpError("car or description data is required", 400)
    );
  }

  if (car) {
    carData.car = car;
  }

  if (description) {
    carData.description = description;
  }

  res.status(200).json({
    success: true,
    message: "car data updated sucessfully",
    carData
  });
});

app.delete("/deletecar/:id", (req, res, next) => {

  const id = Number(req.params.id);

  const index = carList.findIndex((c) => c.id === id);

  if (index === -1) {
    return next(new httpError("Car not found", 404));
  }

  const deletedCar = carList.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Car data deleted successfully",
    deletedCar
  });

});

app.use((req, res, next) => {
  return next(new httpError("requested route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "something went wrong"
  });
});


const port = 5000;

app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  }

  console.log(`server running on port ${port}`);
});