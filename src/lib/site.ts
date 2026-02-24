export const site = {
  name: import.meta.env.SITE_NAME || "闪点",
  tagline: import.meta.env.SITE_TAGLINE || "意念闪烁，硅基锻造。",
  description: "记录日常思考、技术实践与长期写作。",
  author: "ZC",
  locale: "zh-CN",
  url: import.meta.env.SITE_URL || "https://example.com",
  accent: "#36485d",
  background: "#f6f3ee"
};

export const navItems = [
  { href: "/", label: "首页" },
  { href: "/archive", label: "归档" },
  { href: "/tags", label: "标签" },
  { href: "/about", label: "关于" }
];
