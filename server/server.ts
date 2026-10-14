import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { MongoClient, ObjectId } from "mongodb";

const app = new Hono();
// `serveStatic` makes Hono serve the output from `vite build`
app.use("*", serveStatic({ root: "../dist" }));

serve({ fetch: app.fetch, port: 8080 });

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/";
const mongo = new MongoClient(MONGODB_URL, {
  timeoutMS: 2000,
});

const connection = await mongo.connect();
const db = connection.db("tasks_db");

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
  const { completed } = await c.req.json();
  const _id = ObjectId.createFromHexString(c.req.param()._id);
  await db.collection("tasks").updateOne({ _id }, { $set: { completed } });
  return c.newResponse(null, 200);
});

const movieDb = connection.db("sample_mflix");
app.get("/api/movies", async (c) => {
  const movies = await movieDb.collection("movies").find().limit(100).toArray();
  return c.json(movies);
});
