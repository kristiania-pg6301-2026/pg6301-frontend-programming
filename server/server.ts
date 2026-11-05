import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { MongoClient, ObjectId } from "mongodb";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();
app.use("*", serveStatic({ root: "../dist" }));
serve({ fetch: app.fetch, port: 8080 });

const mongo = new MongoClient(process.env.MONGODB_URI!, {
  connectTimeoutMS: 2000,
});

mongo.connect().then((client) => {
  const movieDb = client.db("sample_mflix");

  app.get("/api/movies", async (c) => {
    const movies = await movieDb
      .collection("movies")
      .find()
      .limit(10)
      .toArray();
    return c.json(movies);
  });

  const taskDb = client.db("task_db");

  app.get("/api/tasks", async (c) => {
    const tasks = await taskDb.collection("tasks").find().toArray();
    return c.json(tasks);
  });

  app.post("/api/tasks", async (c) => {
    const { description, completed } = await c.req.json();
    const task = { description, completed };
    await taskDb.collection("tasks").insertOne(task);
    return c.newResponse(null, 200);
  });

  app.put("/api/tasks/:_id", async (c) => {
    const _id = ObjectId.createFromHexString(c.req.param()._id);
    const { completed } = await c.req.json();
    await taskDb
      .collection("tasks")
      .updateOne({ _id }, { $set: { completed } });
    return c.newResponse(null, 200);
  });
});
