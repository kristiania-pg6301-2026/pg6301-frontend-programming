# Creating and fetching data in MongoDB

## Create the React application

(from reference)

<details>

```shell
npm init -y
npm install -D vite
npm pkg set type=module
npm install react react-dom
npm pkg set scripts.dev=vite

npm install -D typescript
npm install -D @types/react @types/react-dom
npx tsc --init --jsx react

npm install -D prettier
npx prettier --write .
npm pkg set scripts.test="tsc --noEmit && prettier --check ."

npm install -D husky
npx husky init

```

`index.html`

```html
<html lang="en">
  <body>
    <div id="root"></div>
  </body>
  <script src="src/main.tsx" type="module"></script>
</html>
```

`src/main.tsx`

```jsx
import React from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(<h1>Hello React</h1>);
```

</details>

## Hono application

(from reference)

<details>

```shell
npm pkg set scripts.postinstall="cd server && npm install"
npm pkg set scripts.build="vite build"
npm pkg set scripts.start="cd server && npm start"

npm install -D @types/node

mkdir server
cd server
npm init -y

npm install hono @hono/node-server
npm install --save-dev tsx
npm pkg set type=module
npm pkg set scripts.dev="tsx --watch server.ts"
npm pkg set scripts.start="tsx server.ts"

```

`server/server.ts`

```typescript
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();
// `serveStatic` makes Hono serve the output from `vite build`
app.use("*", serveStatic({ root: "../dist" }));

serve({ fetch: app.fetch, port: 8080 });
```

</details>

## Fetch data from server

(from reference)

<details>

`vite.config.ts`

```ts
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: { "/api": "http://localhost:8080" },
  },
});
```

In `src/main.tsx`

```tsx
const [tasks, setTasks] = useState<TaskItem[]>([]);
async function loadTasks() {
  const res = await fetch("/api/tasks");
  setTasks(await res.json());
}

useEffect(() => {
  loadTasks();
}, []);

return tasks.map((t) => <li>{t.description}</li>);
```

`server/server.ts`:

```jsx
app.get("/api/tasks", (c) => {
  return c.json(tasks);
});
```

</details>

## Save data to server

<details>

In `src/main.tsx`:

```tsx
const [description, setDescription] = useState("");
async function handleSubmit(event: React.SubmitEvent) {
  event.preventDefault();
  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });
}
```

In `server/server.ts`:

```ts
app.post("/api/tasks", async (c) => {
  const { description } = await c.req.json();
  tasks.push({ id: taskId++, description, completed: false });
  return c.newResponse(null, 201);
});
```

</details>

## Installing Mongodb:

`docker-compose.yaml`:

```yaml
services:
  mongo:
    image: mongo
    ports:
      - "27017:27017"
```

```shell

cd server
npm install mongodb
```

## Saving and reading from Mongodb

In `server.ts`:

```ts
const mongo = new MongoClient("mongodb://localhost:27017");

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
```

## Updating

In `src/main.tsx`:

```tsx
async function handleTaskUpdate(_id: string, delta: Partial<TaskItem>) {
  await fetch(`/api/tasks/${_id}`, {
    method: "PUT",
    body: JSON.stringify(delta),
    headers: { "Content-Type": "application/json" },
  });
  await loadTasks();
}

return (
  <ul>
    {tasks.map((t) => (
      <li key={t._id}>
        <label>
          <input
            type={"checkbox"}
            checked={t.completed}
            onChange={(e) =>
              handleTaskUpdate(t._id, { completed: e.target.checked })
            }
          />{" "}
          {t.description}
        </label>
      </li>
    ))}
  </ul>
);
```

In `server/server.ts`:

```ts
app.put("/api/tasks/:_id", async (c) => {
  const { completed } = await c.req.json();
  const _id = ObjectId.createFromHexString(c.req.param()._id);
  await db.collection("tasks").updateOne({ _id }, { $set: { completed } });
  return c.newResponse(null, 200);
});
```
