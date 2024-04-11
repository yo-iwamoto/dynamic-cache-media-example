import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";

type Post = {
  slug: string;
  title: string;
  visibility: "public" | "premium";
};

const posts = [
  {
    slug: "public-post",
    title: "一般公開記事です",
    visibility: "public",
  },
  {
    slug: "premium-post",
    title: "プレミアムユーザー限定記事です",
    visibility: "premium",
  },
] satisfies Post[];

const app = new Hono();

app.use(
  "/api/*",
  cors({
    origin: "http://localhost:3000",
    allowMethods: ["GET"],
  }),
);

app.get("/api/posts/:slug", (c) => {
  const post = posts.find((post) => post.slug === c.req.param("slug"));
  if (post === undefined) {
    return c.json({ message: "Not found" }, 404);
  }

  return c.json(post);
});

serve({
  ...app,
  port: 8080,
});
