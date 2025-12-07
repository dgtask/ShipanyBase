# 应用信息配置

ShipAny 允许你通过环境变量和配置文件轻松修改应用的基本信息。

## 环境变量配置

应用的核心配置位于项目根目录下的 `.env` 文件（本地开发使用 `.env.development`，生产环境使用 `.env.production` 或平台环境变量）。

### 核心信息

```env
# -----------------------------------------------------------------------------
# Web Information
# -----------------------------------------------------------------------------
NEXT_PUBLIC_APP_URL = "http://localhost:3000"  # 你的项目主页地址
NEXT_PUBLIC_APP_NAME = "ShipAny Two"           # 你的应用名称
```

-   `NEXT_PUBLIC_APP_URL`: 网站的 URL。在本地开发时通常是 `http://localhost:3000`，上线后应改为你的实际域名（如 `https://your-domain.com`）。
-   `NEXT_PUBLIC_APP_NAME`: 网站的名称，将显示在浏览器标题栏、邮件和其他地方。

## 配置文件

除了环境变量，部分配置可能位于 `src/config` 目录下的配置文件中。

### 站点元数据

通常在 `src/config/site.ts` 或类似文件中配置网站的元数据，例如：

-   网站描述 (Description)
-   关键词 (Keywords)
-   社交媒体链接 (Social Links)
-   作者信息 (Authors)

### 网站 Logo 和 Icon

请替换 `public` 目录下的图片文件以修改网站图标：

-   `public/logo.png`: 网站 Logo。
-   `public/favicon.ico`: 浏览器标签页图标。

推荐使用以下工具生成 Logo：
-   Design
-   LogoFast
-   logosc

## 网站地图 (Sitemap)

网站地图文件位于 `src/app/sitemap.ts` 或 `public/sitemap.xml`。
请根据你的网站在线上运行的域名和需要暴露给搜索引擎的页面路径，更新此文件。

```typescript
// 示例 src/app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://your-domain.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // ... 其他页面
  ]
}
```
