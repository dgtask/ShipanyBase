
# 使用 Supabase 作为数据库

ShipAny 使用 [Supabase](https://supabase.com/) 作为其后端数据库服务。Supabase 是一个开源的 Firebase 替代品，提供 PostgreSQL 数据库、认证、即时 API 和存储等功能。

## 创建 Supabase 项目

1.  访问 [Supabase 官网](https://supabase.com/) 并创建一个新账户。
2.  创建一个新项目。
3.  在项目仪表盘中，找到 `Settings` -> `API`。

## 获取数据库连接字符串

在 API 设置页面，你会找到你的项目 API URL 和 `anon` key。但是，对于数据库连接，你需要进入 `Settings` -> `Database` -> `Connection string`。

复制 `URI` 格式的连接字符串，它看起来像这样:

```
postgresql://postgres:[YOUR-PASSWORD]@[AWS-REGION].pooler.supabase.com:6543/postgres
```

## 配置环境变量

在你的 `.env.local` 文件中，设置 `DATABASE_URL` 环境变量:

```env
# -----------------------------------------------------------------------------
# Database with Supabase
# -----------------------------------------------------------------------------
# https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
# Set your Supabase DATABASE_URL
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[AWS-REGION].pooler.supabase.com:6543/postgres"
```

将上面的连接字符串替换为你自己的。

## 数据库迁移

ShipAny 使用 Drizzle ORM 来管理数据库 schema。当你第一次启动应用或更新版本后，你可能需要运行数据库迁移。

```bash
npm run db:migrate
```

这将根据 `src/db/schema.ts` 文件中的定义，更新你的 Supabase 数据库结构。
