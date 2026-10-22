import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import type { TaskItem } from "../src/taskItem.js";

const app = new Hono();

serve({ fetch: app.fetch, port: 8080 });

app.get("*", serveStatic({ root: "../dist" }));
const tasks: TaskItem[] = [
  { description: "Fetch data from server", completed: true },
];

const GOOGLE_CLIENT_ID =
  "34816606807-7snj16t94726hrcoa9h1se1n2e46s2ps.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

app.get("/api/tasks", (c) => c.json(tasks));
app.get("/api/userinfo", (c) => c.json({ error: "Not logged in" }, 401));

async function fetchJson(url: string) {
  const res = await fetch(url);
  return await res.json();
}

app.get("/api/login/:idProvider/start", async (c) => {
  const { idProvider } = c.req.param();

  const { authorization_endpoint } = await fetchJson(
    "https://accounts.google.com/.well-known/openid-configuration",
  );

  const params = {
    response_type: "code",
    redirect_uri: new URL(
      `/api/login/${idProvider}/complete`,
      c.req.url,
    ).toString(),
    client_id: GOOGLE_CLIENT_ID,
    scope: "openid",
  };
  return c.redirect(`${authorization_endpoint}?${new URLSearchParams(params)}`);
});

app.get("/api/login/:idProvider/complete", async (c) => {
  const { idProvider } = c.req.param();
  const { code } = c.req.query();
  const { token_endpoint } = await fetchJson(
    "https://accounts.google.com/.well-known/openid-configuration",
  );
  if (code) {
    const body = {
      code,
      grant_type: "authorization_code",
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET!,
      redirect_uri: new URL(
        `/api/login/${idProvider}/complete`,
        c.req.url,
      ).toString(),
    };
    console.log(JSON.stringify(body));
    const res = await fetch(token_endpoint, {
      method: "POST",
      body: new URLSearchParams(body),
    });
    const responseJson = await res.json();
    console.log(JSON.stringify(responseJson));
    return c.json(responseJson);
  } else {
    return c.json(c.req.query());
  }
});
