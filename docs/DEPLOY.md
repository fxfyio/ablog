# 部署说明（Cloudflare Pages / 自建服务器）

## 1. Cloudflare Pages（推荐）

适合先上线公开博客（静态内容）。

### 构建配置

- Build command: `pnpm build`
- Output directory: `dist`
- Node.js version: `20+`

### 环境变量（至少）

- `SITE_URL`：你的站点域名（例如 `https://blog.example.com`）
- `PUBLIC_WALINE_SERVER_URL`：Waline 服务端地址（可后加）

### Keystatic 说明

- 本项目已包含 Keystatic 配置。
- 本地开发可直接访问 `/keystatic`。
- 如果你要在部署后的站点中使用 Keystatic GitHub 编辑，需要补齐 GitHub OAuth 和相关服务器能力（Keystatic 在实际生产编辑场景通常需要配合适配器/运行时）。
- 建议先上线公开博客，再单独启用编辑后台（本地或自建实例）。

## 2. 自建服务器（Linux + Docker）

适合你后续统一管理博客、Waline、反向代理等服务。

### 基本方案

1. 在服务器拉取仓库
2. 执行 `pnpm install && pnpm build`
3. 用 `Nginx` 或 `Caddy` 托管 `dist/`
4. 单独用 Docker 部署 Waline（见 `deploy/waline/docker-compose.yml`）

### 反向代理建议

- `blog.example.com` -> 静态站（`dist/`）
- `comment.example.com` -> Waline 服务

## 3. Waline 部署（评论服务）

`deploy/waline/docker-compose.yml` 包含：

- Waline 服务
- MongoDB

部署后将 Waline 服务地址写入博客 `.env`：

```bash
PUBLIC_WALINE_SERVER_URL=https://comment.example.com
```

## 4. 后续可选增强

- Cloudflare Pages + Functions（在线编辑后台）
- Pagefind 搜索
- 自动 OG 图
- 图床 / 对象存储
