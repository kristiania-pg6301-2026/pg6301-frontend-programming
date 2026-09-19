import { Hono } from "hono";
import { serve } from "@hono/node-server";
import type { TaskItem } from "../src/TaskItem.js";

const app = new Hono();
serve({ fetch: app.fetch, port: 8080 });
const tasks: TaskItem[] = [
  { id: 0, description: "Create project (server)", completed: true },
  { id: 1, description: "Create React webapp (server)", completed: true },
  { id: 2, description: "Create Hono backend", completed: true },
  { id: 3, description: "Update with Hono backend", completed: false },
];
app.get("/api/tasks", (c) => {
  return c.json(tasks);
});
app.post("/api/tasks", async (c) => {
  const { description, completed } = await c.req.json();
  tasks.push({ id: tasks.length, description, completed });
  return c.newResponse(null, 200);
});
