import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();
const tasks = [
  { id: 0, title: "Create client app", completed: true },
  { id: 1, title: "Fetch from server", completed: true },
  { id: 2, title: "Post to server", completed: true },
  { id: 3, title: "Update on server", completed: false },
  { id: 4, title: "Deploy to clever.cloud", completed: false },
];
app.get("/api/tasks", (c) => c.json(tasks));
app.post("/api/tasks", async (c) => {
  const task = await c.req.json();
  tasks.push({ ...task, id: tasks.length });
  return c.send(200);
});
serve(app);
