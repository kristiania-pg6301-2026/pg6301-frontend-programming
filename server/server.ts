import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import type { TaskItem } from "../src/taskItem.js";
import { MongoClient } from "mongodb";

const app = new Hono();
// `serveStatic` makes Hono serve the output from `vite build`
app.use("*", serveStatic({ root: "../dist" }));

serve({ fetch: app.fetch, port: 8080 });

let index = 1;
const tasks: TaskItem[] = [
  { id: ++index, description: "Fetch data from server", completed: true },
  { id: ++index, description: "Create new task on server", completed: true },
  { id: ++index, description: "Save tasks to MongoDB", completed: false },
  {
    id: ++index,
    description: "Expore MongoDB Movie application",
    completed: false,
  },
];

const mongo = new MongoClient("mongodb://localhost:27017");

const connection = await mongo.connect();
const db = connection.db("tasks_db");

app.get("/api/tasks", (c) => c.json(tasks));
app.post("/api/tasks", async (c) => {
  const { description, completed } = await c.req.json();
  const task = { id: ++index, description, completed };
  tasks.push(task);

  await db.collection("tasks").insertOne(task);

  return c.newResponse(null, 200);
});
