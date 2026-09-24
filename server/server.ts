import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();
serve({ fetch: app.fetch, port: 8080 });

const tasks = [
  { id: 0, description: "Fetch from server", completed: true },
  { id: 1, description: "Create on server", completed: true },
  { id: 2, description: "Refresh on client", completed: false },
];

app.get("/", (c) => c.text("Hello world"));
app.get("/api/tasks", (c) => c.json(tasks));
app.post("/api/tasks", async (c) => {
  const newTask = await c.req.json();
  tasks.push(newTask);
  return c.newResponse(null, 200);
});
