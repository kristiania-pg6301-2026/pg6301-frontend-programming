import { Hono } from "hono";
import { serve } from "@hono/node-server";

const tasks = [
  { name: "Create new project", completed: true },
  { name: "Add typescript and husky", completed: true },
  { name: "Show tasks", completed: true },
  { name: "Create new task", completed: true },
  { name: "Fetch tasks from server", completed: true },
  { name: "Create task on server", completed: false },
  { name: "Deploy application to Clever Cloud", completed: false },
  { name: "Update task on server", completed: false },
];

const app = new Hono();
app.get("/api/tasks", (c) => c.json(tasks));
serve(app);
