import type { Post } from "@/types";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params: { slug } }: Props) {
  const res = await fetch(`http://localhost:8080/api/posts/${slug}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }

    throw new Error("Failed to fetch");
  }

  const data: Post = await res.json();
  if (data.visibility === "public") {
    unstable_cache(async () => data, ["posts", slug], {
      revalidate: 60 * 60 * 24,
      tags: ["posts", `posts/${slug}`],
    });
  }

  return (
    <article>
      {data.visibility === "premium" && (
        <p>この記事はプレミアムユーザー限定です</p>
      )}

      <h1>{data.title}</h1>
    </article>
  );
}
