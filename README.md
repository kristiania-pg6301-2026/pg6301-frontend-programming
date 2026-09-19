# Lecture 5: Client-server communication

## Making calls from the client to the server

Fetching data

```tsx
async function fetchTasks() {
  const res = await fetch("/api/tasks");
  setTasks(await res.json());
}

useEffect(() => {
  fetchTasks();
}, []);
```

Adding data

```tsx
async function handleNewTask(task: Omit<TaskItem, "id">) {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) {
    if (res.status === 400) {
      throw new UserError(await res.json());
    }
    throw new Error(`Failed to write task: ${res.status} ${res.statusText}`);
  }
  await fetchTasks();
}
```

Updating data

```tsx
async function handleTaskUpdate(id: number, delta: Partial<TaskItem>) {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(delta),
  });
  await fetchTasks();
}
```

## Making `vite.config.ts` forward /api requests to Hono on port 8080

```ts
export default defineConfig({
  server: {
    proxy: { "/api": "http://localhost:8080" },
  },
});
```

## Creating server project

1. `mkdir server`
2. `cd server`
3. `npm init -y`
4. WARNING: Unfortunately, this creates a problem in `server/package.json` that we need to
   fix with `npm pgk set type=module`
5. `npm i hono @hono/node-server`
6. `npm i -D tsx`
7. `npm pkg set scripts.dev="tsx --watch server.ts"`

Create `server/server.ts`:

```ts
import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();
serve({ fetch: app.fetch, port: 8080 });

const tasks: TaskItem[] = [];
app.get("/api/tasks", async (c) => {
  return c.json(tasks);
});
app.post("/api/tasks", async (c) => {
  const { description, completed } = await c.req.json();
  tasks.push({ id: tasks.length, description, completed });
  return c.newResponse(null, 200);
});
```

## Progress spinner

```css
.progress {
  aspect-ratio: 1;
  width: 4rem;
  border: 10px solid darkgray;
  border-radius: 50%;
  border-bottom-color: gray;
  animation: rotate 1s infinite linear;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```
