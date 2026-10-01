import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import type { TaskItem } from "../src/taskItem.js";

const app = new Hono();
// `serveStatic` makes Hono serve the output from `vite build`
app.use("*", serveStatic({ root: "../dist" }));

serve({ fetch: app.fetch, port: 8080 });

const tasks: TaskItem[] = [
  { description: "Create react app", completed: true },
  { description: "Deploy to Clever Cloud", completed: true },
  { description: "Show tasks on client", completed: true },
  { description: "Create tasks on client", completed: true },
  { description: "Show tasks from server", completed: true },
  { description: "Create tasks on server", completed: false },
];

app.get("/api/tasks", (c) => {
  return c.json(tasks);
});
