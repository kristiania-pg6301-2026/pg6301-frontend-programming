# Authenticating users with OpenID Connect

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
npx tsc --init

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

Preparing client + server development

```shell
npm install -D concurrently
npm pkg set scripts.dev:client=vite
npm pkg set scripts.dev:server="cd server && npm run dev"
npm pkg set scripts.dev="concurrently npm:dev:client npm:dev:server"

```

Setting up Hono:

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

## Routing to the different pages

In `src/main.tsx`:

```tsx
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);

function Application() {
  return (
    <Routes>
      <Route path={"/"} element={<FrontPage />} />
      <Route path={"/profile"} element={<ProfilePage />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"*"} element={<h1>Not Found</h1>} />
    </Routes>
  );
}

function FrontPage() {
  return (
    <>
      <h1>Front Page</h1>

      <nav>
        <Link to={"/profile"}>Profile</Link>
      </nav>
    </>
  );
}

function LoginPage() {
  return (
    <>
      <h1>Log in</h1>
      <a href={"/api/login/google/start"}>Log in with Google</a>
    </>
  );
}
```

## Logging in

### Starting the login flow

In `server/server.ts`:

```ts
app.get("/api/login/:idProvider/start", async (c) => {
  const { idProvider } = c.req.param();

  const { authorization_endpoint } = await fetchJson(
    "https://accounts.google.com/.well-known/openid-configuration",
  );

  const params = {
    response_type: "code",
    redirect_uri: redirectUri(idProvider, c.req.url),
    client_id: GOOGLE_CLIENT_ID,
    scope: "openid profile email",
  };
  return c.redirect(`${authorization_endpoint}?${new URLSearchParams(params)}`);
});
```

### Completing the login flow

In `server/server.ts`:

```ts
app.get("/api/login/:idProvider/complete", async (c) => {
  const { code } = c.req.query();
  const { idProvider } = c.req.param();
  const { token_endpoint } = await fetchJson(
    "https://accounts.google.com/.well-known/openid-configuration",
  );
  const body = {
    code: code!,
    grant_type: "authorization_code",
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET!,
    redirect_uri: redirectUri(idProvider, c.req.url),
  };
  const res = await fetch(token_endpoint, {
    method: "POST",
    body: new URLSearchParams(body),
  });
  const { access_token } = await res.json();
  setCookie(c, "access_token", access_token);
  return c.redirect("/profile");
});
```

### Fetching user information

In `server/server.ts`:

```ts
app.get("/api/userinfo", async (c) => {
  const access_token = getCookie(c, "access_token");
  if (!access_token) return c.json({ error: "Not logged in" }, 401);
  const { userinfo_endpoint } = await fetchJson(
    "https://accounts.google.com/.well-known/openid-configuration",
  );
  const userinfo = await fetchJson(userinfo_endpoint, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return c.json(userinfo);
});
```
