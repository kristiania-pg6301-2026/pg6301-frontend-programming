import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();
serve(app);

const tasks = [
  { description: "create client", completed: true },
  { description: "create server", completed: true },
  { description: "list tasks", completed: true },
  { description: "create new task", completed: true },
  { description: "save new task in database", completed: false },
  { description: "list tasks from database", completed: false },
];
app.get("/api/tasks", (c) => c.json(tasks));
app.post("/api/tasks", async (c) => {
  const { description, completed } = await c.req.json();
  const task = { description, completed };
  tasks.push(task);
  return c.newResponse(null, 200);
});
