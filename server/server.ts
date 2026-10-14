import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import type { TaskItem } from "../src/taskItem.js";

const app = new Hono();
// `serveStatic` makes Hono serve the output from `vite build`
app.use("*", serveStatic({ root: "../dist" }));

serve({ fetch: app.fetch, port: 8080 });

let index = 1;
const tasks: TaskItem[] = [
  { id: ++index, description: "Fetch data from server", completed: true },
  { id: ++index, description: "Create new task on server", completed: false },
  { id: ++index, description: "Save tasks to MongoDB", completed: false },
  {
    id: ++index,
    description: "Expore MongoDB Movie application",
    completed: false,
  },
];
app.get("/api/tasks", (c) => c.json(tasks));
