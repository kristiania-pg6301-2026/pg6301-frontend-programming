import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();
serve({ fetch: app.fetch, port: 8080 });

app.get("/", (c) => c.text("Hello world"));
app.get("/api/tasks", (c) =>
  c.json([
    { id: 0, description: "Fetch from server", completed: true },
    { id: 1, description: "Create on server", completed: false },
  ]),
);
