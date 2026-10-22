import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import type { TaskItem } from "../src/taskItem.js";

const app = new Hono();

serve({ fetch: app.fetch, port: 8080 });

app.get("*", serveStatic({ root: "../dist" }));
const tasks: TaskItem[] = [
  { description: "Fetch data from server", completed: true },
];

app.get("/api/tasks", (c) => c.json(tasks));
