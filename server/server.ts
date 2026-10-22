import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
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

async function fetchJson(url: string, init?: RequestInit) {
  const res = await fetch(url, init);
  return await res.json();
}

function redirectUri(idProvider: any, baseUrl: string) {
  const result = new URL(
    `/api/login/${idProvider}/complete`,
    baseUrl,
  ).toString();
  if (result.startsWith("http://localhost")) return result;
  if (result.startsWith("https:")) return result;
  return result.replace("http://", "https://");
}

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

app.get("/api/login/:idProvider/complete", async (c) => {
  const { idProvider } = c.req.param();
  const { code } = c.req.query();
  const { token_endpoint } = await fetchJson(
    "https://accounts.google.com/.well-known/openid-configuration",
  );
  if (!code) return c.json(c.req.query());
  const body = {
    code,
    grant_type: "authorization_code",
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET!,
    redirect_uri: redirectUri(idProvider, c.req.url),
  };
  console.log(JSON.stringify(body));
  const res = await fetch(token_endpoint, {
    method: "POST",
    body: new URLSearchParams(body),
  });
  const responseJson = await res.json();
  console.log(JSON.stringify(responseJson));
  const { access_token } = responseJson;
  if (!access_token) return c.json(responseJson);
  setCookie(c, "access_token", access_token);
  return c.redirect("/profile");
});
