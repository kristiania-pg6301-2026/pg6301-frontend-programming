import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import type { TaskItem } from "../src/taskItem.js";

const app = new Hono();
// `serveStatic` makes Hono serve the output from `vite build`
app.use("*", serveStatic({ root: "../dist" }));

serve({ fetch: app.fetch, port: 8080 });

let tasksId = 1;
const tasks: TaskItem[] = [
  { id: tasksId++, description: "Create react app", completed: true },
  { id: tasksId++, description: "Deploy to Clever Cloud", completed: true },
  { id: tasksId++, description: "Show tasks on client", completed: true },
  { id: tasksId++, description: "Create tasks on client", completed: true },
  { id: tasksId++, description: "Show tasks from server", completed: true },
  { id: tasksId++, description: "Create tasks on server", completed: true },
  { id: tasksId++, description: "Implement update", completed: true },
  { id: tasksId++, description: "Handle delay on load", completed: true },
  { id: tasksId++, description: "Handle error on load", completed: true },
  { id: tasksId++, description: "Handle delay on update", completed: true },
  { id: tasksId++, description: "Handle delay on create", completed: true },
  { id: tasksId++, description: "Handle errors", completed: true },
];

async function delay(millis: number) {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), millis));
}

app.get("/api/tasks", (c) => {
  return delay(500).then(() => c.json(tasks));
});
app.post("/api/tasks", async (c) => {
  const { description } = await c.req.json();
  if (!description) {
    return c.json({ error: "You have to have a description" }, 400);
  }
  await delay(2000);
  tasks.push({ id: tasksId++, description, completed: false });
  return c.newResponse(null, 201);
});
app.put("/api/tasks/:id", (c) => {
  const id = parseInt(c.req.param().id);
  return delay(1000)
    .then(() => c.req.json())
    .then(({ completed, description }) => {
      for (const task of tasks) {
        if (task.id === id) {
          if (completed !== undefined) task.completed = completed;
          if (description !== undefined) task.description = description;
        }
      }
      return c.newResponse(null, 200);
    });
});
