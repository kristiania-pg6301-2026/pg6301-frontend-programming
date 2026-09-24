import { Hono } from "hono";
import { serve } from "@hono/node-server";
import type { TaskItem } from "../src/TaskItem.js";

const app = new Hono();
serve({ fetch: app.fetch, port: 8080 });

const tasks: TaskItem[] = [
  { id: 0, description: "Fetch from server", completed: true },
  { id: 1, description: "Create on server", completed: true },
  { id: 2, description: "Refresh on client", completed: true },
  { id: 3, description: "Mark as checked on server", completed: true },
  { id: 4, description: "Update task details", completed: true },
  { id: 5, description: "Understand Promises", completed: false },
];
let index = 6;

async function delay(number: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, number));
}

app.get("/", (c) => c.text("Hello world"));
app.get("/api/tasks", async (c) => {
  await delay(2000);
  return c.json(tasks);
});
app.post("/api/tasks", async (c) => {
  const { description, completed } = await c.req.json();
  tasks.push({ id: index++, description, completed });
  return c.newResponse(null, 200);
});
app.put("/api/tasks/:id", async (c) => {
  const id = parseInt(c.req.param().id);
  const { completed, details } = await c.req.json();
  for (const task of tasks) {
    if (task.id === id) {
      if (!(completed === undefined)) task.completed = completed;
      if (!(details === undefined)) task.details = details;
    }
  }
  return c.newResponse(null, 200);
});
