# 前置要求

在开始使用 ShipAny 之前，请确保你的开发环境满足以下要求。

## 技术依赖

ShipAny 基于 NextJS 框架构建，用到了诸多流行的技术组件和云服务。
为确保你能充分使用 ShipAny 的完整功能，建议熟悉以下技术/组件或云服务：

### 技术/组件

-   **NextJS**: 全栈开发框架
-   **TailwindCSS**: CSS 样式框架
-   **Shadcn/UI**: UI 组件库
-   **next-intl**: i18n 多语言
-   **next-auth / better-auth**: 登录鉴权

### 云服务

-   **Supabase**: 云数据库（PostgreSQL）
-   **Stripe**: 支付收款平台
-   **Google Analytics**: 数据统计
-   **OpenPanel**: 数据统计

## 环境依赖

为确保你能顺利在本地运行和二次开发 ShipAny，请在你的电脑上安装必要的环境。

### Node.js 环境

建议使用 **fnm** 或 **nvm** 进行 Node.js 版本管理。

-   **Node.js**: 推荐使用 LTS 版本（v18 或更高，建议 v20+）。
-   **包管理器**: 推荐使用 **pnpm**。

安装 pnpm:

```bash
npm install -g pnpm
```

### Git

确保安装了 **Git** 并配置了 SSH Key，以便访问 Github 仓库。

```bash
git --version
```

## AI 辅助编程工具

为了更高效地开发项目，强烈推荐使用以下 AI 辅助编程工具：

-   **Cursor AI 编辑器**: 深度集成的 AI 编程环境。
-   **Windsurf AI 编辑器**: 另一种强大的 AI 编辑器。
-   **v0**: 用于生成 UI 组件。
-   **Claude AI / ChatGPT**: 用于代码咨询和生成。

## 编辑器插件

推荐在 VS Code / Cursor / Windsurf 等编辑器中安装以下插件：

-   **Prettier - Code formatter**: 代码格式化。
-   **Tailwind CSS IntelliSense**: Tailwind CSS 智能提示。
-   **ESLint**: 代码质量检查。
