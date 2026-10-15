import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { MongoClient, ObjectId } from "mongodb";

const app = new Hono();
serve(app);

const mongo = new MongoClient("mongodb://localhost:27017/");

mongo.connect().then((client) => {
  const db = client.db("task_db");

  app.get("/api/tasks", async (c) => {
    const tasks = await db.collection("tasks").find().toArray();
    return c.json(tasks);
  });

  app.post("/api/tasks", async (c) => {
    const { description, completed } = await c.req.json();
    const task = { description, completed };
    await db.collection("tasks").insertOne(task);
    return c.newResponse(null, 200);
  });

  app.put("/api/tasks/:_id", async (c) => {
    const _id = ObjectId.createFromHexString(c.req.param()._id);
    const { completed } = await c.req.json();
    await db.collection("tasks").updateOne({ _id }, { $set: { completed } });
    return c.newResponse(null, 200);
  });
});
