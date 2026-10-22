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
app.get("/api/userinfo", (c) => c.json({ error: "Not logged in" }, 401));
app.get("/api/login/:idProvider/start", (c) => {
  const { idProvider } = c.req.param();
  return c.json({ status: `Starting login flow with ${idProvider}` });
});
