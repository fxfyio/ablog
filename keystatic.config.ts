import { collection, config, fields } from "@keystatic/core";

const githubRepo = process.env.KEYSTATIC_GITHUB_REPO as `${string}/${string}` | undefined;
const useGitHub = Boolean(process.env.KEYSTATIC_GITHUB_CLIENT_ID && process.env.KEYSTATIC_GITHUB_CLIENT_SECRET && githubRepo);

export default config({
  storage: useGitHub
    ? {
        kind: "github",
        repo: githubRepo!,
        branchPrefix: "keystatic/",
        clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID!,
        clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET!,
        secret: process.env.KEYSTATIC_SECRET!
      }
    : { kind: "local" },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "slug",
      path: "src/content/posts/*",
      entryLayout: "content",
      format: { contentField: "body" },
      schema: {
        title: fields.text({ label: "标题", validation: { isRequired: true } }),
        slug: fields.text({ label: "路径 slug（可选，默认使用文件名）" }),
        date: fields.date({ label: "发布日期", defaultValue: { kind: "today" } }),
        updated: fields.date({ label: "更新日期", validation: { isRequired: false } }),
        summary: fields.text({ label: "摘要", multiline: true, validation: { length: { max: 220 } } }),
        tags: fields.array(fields.text({ label: "标签" }), {
          label: "标签",
          itemLabel: (props) => props.value || "新标签"
        }),
        draft: fields.checkbox({ label: "草稿", defaultValue: false }),
        visibility: fields.select({
          label: "可见性",
          defaultValue: "public",
          options: [
            { label: "公开", value: "public" },
            { label: "私密（不发布）", value: "private" }
          ]
        }),
        lang: fields.select({
          label: "语言",
          defaultValue: "zh",
          options: [
            { label: "中文", value: "zh" },
            { label: "English", value: "en" }
          ]
        }),
        math: fields.checkbox({ label: "包含数学公式", defaultValue: false }),
        toc: fields.checkbox({ label: "显示目录", defaultValue: true }),
        body: fields.mdx({
          label: "正文",
          extension: "mdx"
        })
      }
    })
  }
});
