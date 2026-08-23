import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();
app.get("/api/tasks", (c) =>
  c.json([
    { title: "Create client app", completed: true },
    { title: "Fetch from server", completed: true },
    { title: "Post to server", completed: false },
    { title: "Deploy to clever.cloud", completed: false },
  ]),
);
serve(app);
