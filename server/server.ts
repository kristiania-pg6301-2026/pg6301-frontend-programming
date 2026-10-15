import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { MongoClient } from "mongodb";

const app = new Hono();
serve(app);

const mongo = new MongoClient("mongodb://localhost:27017/");

mongo.connect().then((client) => {
  const tasks = [
    { description: "create client", completed: true },
    { description: "create server", completed: true },
    { description: "list tasks", completed: true },
    { description: "create new task", completed: true },
    { description: "save new task in database", completed: true },
    { description: "list tasks from database", completed: true },
  ];
  const db = client.db("task_db");

  app.get("/api/tasks", async (c) => {
    const tasks = await db.collection("tasks").find().toArray();
    return c.json(tasks);
  });

  app.post("/api/tasks", async (c) => {
    const { description, completed } = await c.req.json();
    const task = { description, completed };
    tasks.push(task);

    await db.collection("tasks").insertOne({ description, completed });

    return c.newResponse(null, 200);
  });
});
