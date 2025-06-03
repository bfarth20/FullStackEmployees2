import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  await db.query(`DELETE FROM employees`);

  const employees = [
    { name: "Alice Johnson", birthday: "1990-05-20", salary: 70000 },
    { name: "Bob Smith", birthday: "1985-11-03", salary: 85000 },
    { name: "Catherine Lee", birthday: "1978-04-16", salary: 92000 },
    { name: "Daniel Garcia", birthday: "1992-08-09", salary: 61000 },
    { name: "Elena Chen", birthday: "1989-02-28", salary: 73000 },
    { name: "Frank Thomas", birthday: "1995-07-19", salary: 58000 },
    { name: "Grace Kim", birthday: "1983-01-07", salary: 99000 },
    { name: "Henry Patel", birthday: "1997-10-23", salary: 62000 },
    { name: "Isabel Rivera", birthday: "1991-12-31", salary: 76000 },
    { name: "Jack Wilson", birthday: "1986-06-14", salary: 87000 },
  ];

  for (const emp of employees) {
    await createEmployee(emp);
  }
}
