# Lecture 8: Communication between the client and the server

## Setup client project

<details open>

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

## Setup server project

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

</details>

## Initial files

<details>

### `index.html`

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Task Manager</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
  <script src="src/main.tsx" type="module"></script>
</html>
```

### `src/main.tsx`

```tsx
import { createRoot } from "react-dom/client";

function Application() {
  return <h1>Hello World</h1>;
}

createRoot(document.getElementById("app")!).render(<Application />);
```

### `server/index.ts`

```ts
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

const port = process.env.PORT || "3000";
serve({ fetch: app.fetch, port: parseInt(port) });

app.get("*", serveStatic({ root: "../dist" }));
```

</details>

## Test, commit and deploy to Clever Cloud

## Develop functionality

<details>

### Simplify development

```shell
npm i -D concurrently
npm pkg set scripts.dev="concurrently vite npm:dev:server"
npm pkg set scripts.dev:server="cd server && npm run dev"
git add package.json package-lock.json
```

Start developing with `npm run dev`

### Fetch from the server

```tsx
function Application() {
  const [tasks, setTasks] = useState([
    { description: "Fetch data from server", completed: false },
  ]);

  async function loadTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1>Tasks</h1>
      {tasks.map(({ description, completed }) => (
        <li>
          <input type={"checkbox"} checked={completed} /> {description}
        </li>
      ))}
    </>
  );
}
```

### `vite.config.ts`

```ts
import { defineConfig } from "vite";

export default defineConfig({
  server: { proxy: { "/api": "http://localhost:3000" } },
});
```

### Server responds

```ts
const tasks = [
  { description: "Fetch data from server", complete: true },
  { description: "Deal with slow server", complete: false },
  { description: "Deal with errors from server", complete: false },
];

app.get("/api/tasks", (c) => c.json(tasks));
```

### Commit and push

1. `git add src/main.tsx vite.config.ts server/index.ts`
2. `git commit -m "Fetch data from server"`
3. `git push heroku HEAD:main`

### Simulate delay on server

```ts
async function delay(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

app.get("/api/tasks", async (c) => {
  await delay(1500);
  return c.json(tasks);
});
```

### Show spinner on client `src/main.tsx`

```tsx
import "./application.css";

function Application() {
  async function loadTasks() {
    /*...*/
  }
  useEffect(() => {
    /*...*/
  }, []);

  const [loaded, setLoaded] = useState(false);
  const [tasks, setTasks] = useState([]);
  return (
    <>
      <h1>Tasks</h1>
      {!loaded && <div className={"spinner"}></div>}
      {/*...*/}
    </>
  );
}
```

Using css files from tsx files now requires `global.d.ts`:

```ts
declare module "*.css";
```

### Simple spinner in `src/application.css`

```css
.spinner {
  width: 3em;
  aspect-ratio: 1;
  border-radius: 100%;
  border: 1em solid lightgray;
  border-left-color: gray;
}
```

### Better spinner in `src/application.css`

```css
.spinner {
  animation: spin-animation 1s infinite linear;
}

@keyframes spin-animation {
  from {
    rotate: 0;
  }
  to {
    rotate: 1turn;
  }
}
```

### Remember to turn off the spinner

```ts
async function loadTasks() {
  setLoaded(false);
  const res = await fetch("/api/tasks");
  setTasks(await res.json());
  setLoaded(true);
}
```

### Simulate errors on the server

```ts
async function delayWithError(timeout: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();
      if (random < 0.2) {
        reject(new Error("Error from promise"));
      } else if (random < 0.3) {
        reject(new HTTPException(400, { message: "Error from user" }));
      } else {
        resolve();
      }
    }, timeout);
  });
}

app.get("/api/tasks", async (c) => {
  await delayWithError(300);
  return c.json(tasks);
});
```

### Error handling on the client

```tsx
function Application() {
  const [loaded, setLoaded] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState<Error>();
  useEffect(() => {
    loadTasks();
  }, []);
  async function loadTasks() {
    setLoaded(false);
    try {
      const res = await fetch("/api/tasks");
      setTasks(await res.json());
      setLoaded(true);
    } catch (error) {
      setError(error as Error);
    }
  }

  return (
    <>
      <h1>Tasks</h1>
      {error && <div className={"error"}>{error.toString()}</div>}
      {!loaded && <div className={"spinner"}></div>}
      {tasks.map(/*...*/)}
    </>
  );
}
```

### Make it proper

```tsx
function Application() {
  const [loaded, setLoaded] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState<Error>();
  useEffect(() => {
    loadTasks();
  }, []);

  async function fetchTasks() {
    const res = await fetch("/api/tasks");
    if (!res.ok) {
      throw new Error(`Request error: ${res.status}: ${await res.text()}`);
    }
    return await res.json();
  }

  async function loadTasks() {
    setLoaded(false);
    setError(undefined);
    try {
      setTasks(await fetchTasks());
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoaded(true);
    }
  }

  return (
    <>
      <h1>Tasks</h1>
      <div>
        <button onClick={loadTasks}>Reload</button>
      </div>
      {error && <div className={"error"}>{error.toString()}</div>}
      {!loaded && <div className={"spinner"}></div>}
      {tasks.map(/*...*/)}
    </>
  );
}
```

</details>
