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
  { id: tasksId++, description: "Mark items as done", completed: true },
  {
    id: tasksId++,
    description: "Simulate delay on load and update",
    completed: true,
  },
  { id: tasksId++, description: "Simulate delay on create", completed: true },
  { id: tasksId++, description: "Simulate errors on server", completed: true },
];

app.get("/api/tasks", async (c) => {
  await delay(500);
  return c.json(tasks);
});
app.post("/api/tasks", async (c) => {
  await delay(400);
  const { description } = (await c.req.json()) as Partial<TaskItem>;
  if (!description || description.length === 0) {
    return c.json({ error: "Missing description" }, 400);
  }
  tasks.push({ id: tasksId++, description, completed: false });
  return c.newResponse(null, 201);
});
app.put("/api/tasks/:id", async (c) => {
  await delay(500);
  const id = parseInt(c.req.param().id);
  const delta = await c.req.json();
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i]!;
    if (task.id === id) {
      tasks[i] = { ...task, ...delta };
    }
  }
  return c.newResponse(null, 200);
});

async function delay(millis: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}
