
# 创建动态页面

除了静态 Markdown 页面，ShipAny 还允许你通过数据库来创建和管理动态页面。这些页面非常适合用于博客文章、产品更新、新闻等内容。

## 数据表结构

动态页面的内容存储在数据库的 `posts` 表中。`posts` 表包含以下主要字段：

-   `id`: 唯一标识符。
-   `title`: 页面标题。
-   `slug`: 页面的 URL slug (例如 `my-first-post`)。
-   `content`: 页面内容，可以是 Markdown 或 HTML。
-   `published`: 布尔值，表示页面是否已发布。
-   `created_at`: 创建时间。

## 创建动态页面

你可以通过任何数据库管理工具（例如 Supabase Studio, DBeaver）直接向 `posts` 表中插入数据来创建新的动态页面。

1.  连接到你的 Supabase 数据库。
2.  打开 `posts` 表。
3.  插入一条新记录，填写 `title`, `slug`, `content` 等字段。
4.  确保 `published` 字段设置为 `true`。

## 访问动态页面

创建并发布页面后，你可以通过 `https://<你的域名>/post/<slug>` 来访问它。

-   `post` 是动态页面的固定路由前缀。
-   `<slug>` 是你在数据库中为页面设置的 `slug`。

## 示例

如果你在 `posts` 表中创建了一条记录，其 `slug` 为 `hello-world`，那么你可以通过 `https://<你的域名>/post/hello-world` 来访问这个页面。
