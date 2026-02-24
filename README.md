# 闪点（Shandian）

`意念闪烁，硅基锻造。`

个人博客系统脚手架，基于 `Astro + Markdown/MDX + Keystatic + Waline`。

## 已实现（V1 骨架）

- 静态博客页面：首页 / 文章页 / 标签 / 归档 / 关于
- `Astro Content Collections` frontmatter 校验
- MDX 渲染 + 代码高亮（Shiki）
- 数学公式（KaTeX）
- 评论组件（Waline，未配置时自动降级为占位提示）
- Keystatic 配置（本地模式 / GitHub 模式）
- Cloudflare Pages 与自建 Docker 部署说明（见 `docs/DEPLOY.md`）

## 本地启动

1. 安装依赖

```bash
pnpm install
```

2. 配置环境变量

```bash
cp .env.example .env
```

3. 启动开发环境

```bash
pnpm dev
```

访问：

- 博客首页：`http://localhost:4321`
- Keystatic 后台：`http://127.0.0.1:4321/keystatic`

## 写作方式

- 直接编辑：`src/content/posts/*.mdx`
- 后台编辑：Keystatic（内容仍然写回 Git 仓库）

## 内容可见性

- `draft: true`：不发布
- `visibility: private`：不进入公开站点构建

## 评论（Waline）

前端组件已接入；需要先部署 Waline 服务端并配置：

- `PUBLIC_WALINE_SERVER_URL`

Waline 服务端 Docker 示例见 `deploy/waline/docker-compose.yml`。
