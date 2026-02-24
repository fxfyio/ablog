import { getCollection, type CollectionEntry } from "astro:content";

export type PostEntry = CollectionEntry<"posts">;

export function postPermalink(post: PostEntry) {
  const explicit = post.data.slug?.trim();
  if (explicit) return `/posts/${explicit}/`;
  return `/posts/${post.slug}/`;
}

export function normalizeTag(tag: string) {
  return tag.trim().toLowerCase();
}

export async function getPublicPosts() {
  const posts = await getCollection("posts", ({ data }) => !data.draft && data.visibility === "public");
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getAllPosts() {
  const posts = await getCollection("posts");
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function getPostSummary(post: PostEntry) {
  return post.data.summary || "暂时没有摘要，点进来看看这次闪烁落在了哪里。";
}

export function readingMinutes(content: string) {
  const words = content.replace(/\s+/g, "").length;
  const minutes = Math.max(1, Math.round(words / 350));
  return minutes;
}

export function buildTagMap(posts: PostEntry[]) {
  const tagMap = new Map<string, { name: string; count: number }>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const key = normalizeTag(tag);
      const current = tagMap.get(key);
      if (current) {
        current.count += 1;
      } else {
        tagMap.set(key, { name: tag, count: 1 });
      }
    }
  }
  return [...tagMap.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function relatedByTag(posts: PostEntry[], current: PostEntry, limit = 3) {
  const currentTags = new Set(current.data.tags);
  return posts
    .filter((post) => post.id !== current.id)
    .map((post) => ({
      post,
      score: post.data.tags.reduce((sum, tag) => sum + (currentTags.has(tag) ? 1 : 0), 0)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.date.getTime() - a.post.data.date.getTime())
    .slice(0, limit)
    .map((item) => item.post);
}
