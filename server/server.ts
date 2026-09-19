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

function delay(millis: number) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

app.get("/api/tasks", async (c) => {
  const result = c.json(tasks);
  await delay(500);
  return result;
});
app.post("/api/tasks", async (c) => {
  await delay(500);
  const { description, completed } = await c.req.json();
  if (!description || description.length < 5)
    return c.json({ error: "description is required" }, 400);
  tasks.push({ id: tasks.length, description, completed });
  return c.newResponse(null, 200);
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
