import rss from "@astrojs/rss";
import { getPublicPosts, postPermalink } from "@/lib/posts";
import { site } from "@/lib/site";

export async function GET(context) {
  const posts = await getPublicPosts();
  return rss({
    title: site.name,
    description: site.tagline,
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary || "",
      pubDate: post.data.date,
      link: postPermalink(post)
    })),
    customData: `<language>zh-cn</language>`
  });
}
