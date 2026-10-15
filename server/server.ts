import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();
serve(app);

app.get("/api/tasks", (c) =>
  c.json([
    { description: "create client", completed: true },
    { description: "create server", completed: true },
    { description: "list tasks", completed: false },
  ]),
);
