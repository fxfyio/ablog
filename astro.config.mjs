import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import keystatic from "@keystatic/astro";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const enableKeystatic = process.env.ENABLE_KEYSTATIC !== "false";

export default defineConfig({
  site: "https://example.com",
  vite: {
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
      "process.env": "{}"
    }
  },
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    react(),
    mdx(),
    sitemap(),
    ...(enableKeystatic ? [keystatic()] : [])
  ],
  markdown: {
    shikiConfig: {
      theme: "github-dark-default",
      wrap: true
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  }
});
