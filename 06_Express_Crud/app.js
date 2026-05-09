import express from "express";
import httpError from "./middelware/httpError.js";

const app = express();

app.use(express.json());

const tasks = [
  {
    id: 1,
    task: "practice",
    description: "you want to practice everyday",
  },

  {
    id: 2,
    task: "learn",
    description: "you have to learn New thing",
  },
];

app.get("/", (req, res) => {
  res.json("Hello from Server");
});


app.get("/task", (req, res) => {
  if (tasks.length === 0) {
    return res.status(200).json({
      success: false,
      message: "Task is not available",
    });
  }

  res.status(200).json({
    success: true,
    message: "All Tasks",
    tasks,
  });
});


app.get("/task/:id", (req, res) => {
  const id = Number(req.params.id);

  const foundTask = tasks.find((t) => t.id === id);

  if (!foundTask) {
    return res.status(404).json({
      success: false,
      message: "Task Not Found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Task Found",
    foundTask,
  });
});

app.post("/addTask", (req, res, next) => {
  const { task, description } = req.body;

  if (!task || !description) {
    return next(
      new httpError("Task or Description is required", 404)
    );
  }

  const newTask = {
    id: new Date().getTime(),
    task,
    description,
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    message: "New Task Added Successfully",
    newTask,
  });
});

app.delete("/task/:id", (req, res, next) => {
  const id = Number(req.params.id);

  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return next(
      new httpError("Requested Task Not Found", 404)
    );
  }

  tasks.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Task Deleted Successfully",
  });
});

app.use((req, res, next) => {
  next(new httpError("Request Not Found", 404));

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
  });


const port = 5000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err.message);
  }

  console.log(`Server running on port ${port}`);
});