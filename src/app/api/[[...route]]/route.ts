import { Hono } from "hono";
import { handle } from "hono/vercel";
import { hc } from "hono/client";

export const runtime = "edge";

const POSTS = [
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
] satisfies {
  slug: string;
  title: string;
  visibility: "public" | "premium";
}[];

const app = new Hono().basePath("/api");

const routes = app.get("/posts/:slug", (c) => {
  const post = POSTS.find((post) => post.slug === c.req.param("slug"));
  if (post === undefined) {
    return c.json({ message: "Not found" }, 404);
  }

  return c.json({ post });
});

export const { api } = hc<typeof routes>("http://localhost:3000");

export const GET = handle(app);
