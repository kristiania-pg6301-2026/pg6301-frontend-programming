import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import type { TaskItem } from "../src/taskItem.js";

const app = new Hono();
// `serveStatic` makes Hono serve the output from `vite build`
app.use("*", serveStatic({ root: "../dist" }));

serve({ fetch: app.fetch, port: 8080 });

let taskId = 1;
const tasks: TaskItem[] = [
  { id: taskId++, description: "Fetch from server", completed: true },
  { id: taskId++, description: "Save to server", completed: true },
  { id: taskId++, description: "Update on server", completed: true },
  { id: taskId++, description: "Error handling", completed: false },
];

app.get("/api/tasks", (c) => {
  return c.json(tasks);
});

app.post("/api/tasks", async (c) => {
  const { description } = await c.req.json();
  tasks.push({ id: taskId++, description, completed: false });
  return c.newResponse(null, 201);
});

app.put("/api/tasks/:id", async (c) => {
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(c.req.param().id));
  const delta = await c.req.json();
  tasks[taskIndex] = { ...tasks[taskIndex], ...delta };
  return c.newResponse(null, 200);
});
