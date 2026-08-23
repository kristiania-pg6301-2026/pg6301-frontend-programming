import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();
const tasks = [
  { title: "Create client app", completed: true },
  { title: "Fetch from server", completed: true },
  { title: "Post to server", completed: true },
  { title: "Update on server", completed: false },
  { title: "Deploy to clever.cloud", completed: false },
];
app.get("/api/tasks", (c) => c.json(tasks));
app.post("/api/tasks", async (c) => {
  const task = await c.req.json();
  tasks.push(task);
  return c.send(200);
});
serve(app);
