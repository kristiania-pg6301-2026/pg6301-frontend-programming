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
  { id: taskId++, description: "Save to server", completed: false },
  { id: taskId++, description: "Update on server", completed: false },
];

app.get("/api/tasks", (c) => {
  return c.json(tasks);
});
