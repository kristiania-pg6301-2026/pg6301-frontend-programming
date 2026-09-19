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
app.post("/api/tasks", (c) => {
  return c.req.json().then(({ description, completed }) => {
    tasks.push({ id: tasks.length, description, completed });
    return c.newResponse(null, 200);
  });
});
app.put("/api/tasks/:id", async (c) => {
  const { id } = c.req.param();
  const task = tasks.find((o) => o.id === parseInt(id))!;
  const { description, completed, details } = await c.req.json();
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;
  if (details !== undefined) task.details = details;

  return c.newResponse(null, 200);
});
