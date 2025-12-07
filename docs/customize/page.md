# 页面配置

ShipAny 的页面内容，特别是 Landing Page（着陆页），设计为高度可配置。你可以通过修改 JSON 文件来更新页面内容，无需直接修改代码。

## 修改 Landing Page 内容

Landing Page 的内容由 `src/i18n/pages/landing` 目录下的 JSON 文件定义。

### 文件位置

-   英文内容：`src/i18n/pages/landing/en.json`
-   中文内容：`src/i18n/pages/landing/zh.json`

### 内容结构

JSON 文件包含多个部分，对应 Landing Page 的不同区块：

```json
{
  "header": { ... },     // 顶部导航
  "hero": { ... },       // 首屏区域
  "branding": { ... },   // 品牌展示
  "introduce": { ... },  // 产品介绍
  "benefit": { ... },    // 核心优势
  "usage": { ... },      // 使用流程
  "feature": { ... },    // 功能特性
  "showcase": { ... },   // 案例展示
  "pricing": { ... },    // 价格方案
  "faq": { ... },        // 常见问题
  "cta": { ... },        // 呼吁行动
  "footer": { ... }      // 底部页脚
}
```

### 使用 AI 辅助修改

你可以使用 AI 工具（如 Cursor, ChatGPT）来快速生成新的 Landing Page 内容。

**Prompt 示例：**

> "I want to build a landing page for my product named 'Flux AI Image Generator'. Please update the landing page json file based on the following keywords: 'flux ai, ai image generator', and reference content from https://www.flux.ai/."

> "请根据我的产品 'AI 写作助手' 更新 `src/i18n/pages/landing/zh.json` 文件。产品特点是：快速生成、多风格支持、SEO 优化。"

## 修改页面结构

如果需要修改页面的布局结构（例如调整区块顺序、添加或删除区块），你需要修改对应的 React 组件文件。

Landing Page 的主入口通常位于 `src/app/[locale]/(landing)/page.tsx`。

```tsx
// 示例结构
export default function LandingPage() {
  return (
    <>
      <Hero />
      <Branding />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
```

## 网站协议页面

网站协议（隐私政策、服务条款）位于 `src/content/docs` 或 `src/app/[locale]/(landing)/legal` 目录下（具体取决于模板版本）。

请根据你的业务需求更新这些文件的内容。同样可以使用 AI 辅助生成：

> "Use AI to generate a new privacy policy for an AI SaaS application."
