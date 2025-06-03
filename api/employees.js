import express from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";
const router = express.Router();

//GET /employees to return all employees
router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

//Post /employees to create a new employee
router.post("/", async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ error: "Missing request body" });
  }

  const { name, birthday, salary } = req.body;
  if (!name || !birthday || !salary) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newEmployee = await createEmployee({ name, birthday, salary });
    res.status(201).json(newEmployee);
  } catch (err) {
    next(err);
  }
});

//GET /employees/:id to get one employee by Id
router.get("/:id", async (req, res, next) => {
  const idStr = req.params.id;

  if (!/^\d+$/.test(idStr)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const id = parseInt(idStr, 10);

  try {
    const employee = await getEmployee(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

//DELETE /employees/:id delete employees by id
router.delete("/:id", async (req, res, next) => {
  const idStr = req.params.id;

  if (!/^\d+$/.test(idStr)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const id = parseInt(idStr, 10);

  try {
    const deleted = await deleteEmployee(id);
    if (!deleted) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

//PUT /employees/:id to update by id
router.put("/:id", async (req, res, next) => {
  const idStr = req.params.id;
  if (!/^\d+$/.test(idStr)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const id = parseInt(idStr, 10);
  if (id < 0) {
    return res.status(400).json({ error: "Invalid ID value" });
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Request body is required" });
  }

  const { name, title, salary, birthday } = req.body;

  if (!name || salary == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const updated = await updateEmployee({ id, name, title, salary, birthday });
    if (!updated) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

export default router;
