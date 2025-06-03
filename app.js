import express from "express";
import employeesRouter from "#api/employees";

const app = express();

//Middleware
app.use(express.json());

//Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// Employees routes
app.use("/employees", employeesRouter);

export default app;
