# 架构设计

ShipAny 是一个基于 NextJS 的 AI SaaS 开发框架，旨在帮助开发者快速构建和发布 AI 应用。它集成了现代 Web 开发的最佳实践和流行的技术栈。

## 核心技术栈

ShipAny 基于以下核心技术构建：

-   **Next.js**: 全栈 React 框架（支持 Next.js 16 或 Next.js 15.5.5+）。
-   **TailwindCSS**: 实用优先的 CSS 框架（版本 4）。
-   **Shadcn/UI**: 基于 Radix UI 的高质量组件库。
-   **Supabase**: 开源 Firebase 替代品，提供数据库和身份验证服务。
-   **Drizzle ORM**: 轻量级、高性能的 TypeScript ORM。
-   **NextAuth.js / Better-Auth**: 身份验证解决方案。
-   **Stripe**: 支付处理平台。
-   **next-intl**: 国际化（i18n）解决方案。

## 目录结构

ShipAny 的代码结构清晰，便于维护和扩展：

```
.
├── src/
│   ├── app/              # Next.js App Router 页面和 API 路由
│   ├── components/       # 通用 UI 组件
│   ├── config/           # 项目配置文件
│   ├── core/             # 核心逻辑和工具函数
│   ├── i18n/             # 国际化翻译文件
│   ├── lib/              # 第三方库配置
│   ├── styles/           # 全局样式和主题配置
│   └── types/            # TypeScript 类型定义
├── public/               # 静态资源
├── docs/                 # 项目文档
└── ...
```

## 核心功能模块

1.  **Landing Page**: 包含精美的着陆页，支持配置化修改。
2.  **用户认证**: 集成 Google、Github 等 OAuth 登录，以及邮箱密码登录。
3.  **支付系统**: 内置 Stripe 支付集成，支持订阅和一次性付款。
4.  **AI 集成**: 预配置 OpenAI、Claude 等 AI SDK，支持流式响应。
5.  **数据统计**: 集成 Google Analytics 和 OpenPanel。
6.  **管理后台**: 提供用户管理、订单管理、内容管理等功能。

## 设计理念

-   **配置优先**: 大量功能（如着陆页内容、主题颜色）可通过配置文件修改，无需深入代码。
-   **插件化**: 功能模块解耦，便于按需启用或禁用。
-   **AI 友好**: 代码结构和注释对 AI 编程助手（如 Cursor, Windsurf）友好，便于 AI 辅助开发。
