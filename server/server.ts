import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import type { Userinfo } from "../src/userinfo.js";

const app = new Hono();
// `serveStatic` makes Hono serve the output from `vite build`
app.use("*", serveStatic({ root: "../dist" }));

serve({ fetch: app.fetch, port: 8080 });

app.get("/api/userinfo", (c) => {
  const userinfo: Userinfo = { name: "The Very Fine User" };
  return c.json(userinfo);
});
