import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import type { TaskItem } from "../src/taskItem.js";

const app = new Hono();
// `serveStatic` makes Hono serve the output from `vite build`
app.use("*", serveStatic({ root: "../dist" }));

serve({ fetch: app.fetch, port: 8080 });

let tasksId = 1;
const tasks: TaskItem[] = [
  { id: tasksId++, description: "Create react app", completed: true },
  { id: tasksId++, description: "Deploy to Clever Cloud", completed: true },
  { id: tasksId++, description: "Show tasks on client", completed: true },
  { id: tasksId++, description: "Create tasks on client", completed: true },
  { id: tasksId++, description: "Show tasks from server", completed: true },
  { id: tasksId++, description: "Create tasks on server", completed: true },
];

app.get("/api/tasks", (c) => {
  return c.json(tasks);
});
app.post("/api/tasks", async (c) => {
  const { description } = await c.req.json();
  tasks.push({ id: tasksId++, description, completed: false });
  return c.newResponse(null, 201);
});
