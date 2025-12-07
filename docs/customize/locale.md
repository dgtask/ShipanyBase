# 多语言配置

ShipAny 内置了基于 `next-intl` 的国际化（i18n）支持，默认支持中文（zh）和英文（en）。

## 翻译文件结构

翻译文件位于 `src/i18n` 目录下：

-   `src/i18n/messages/`: 存放通用的 UI 文本（如按钮、标签、通用提示）。
    -   `en.json`
    -   `zh.json`
-   `src/i18n/pages/`: 存放特定页面的长文本（如 Landing Page 内容）。
    -   `landing/en.json`
    -   `landing/zh.json`

## 修改现有语言内容

要修改现有语言的文案，只需编辑对应的 JSON 文件即可。

**示例**：修改英文版的登录按钮文本。

1.  打开 `src/i18n/messages/en.json`。
2.  找到对应的键值对，例如 `"Auth": { "login": "Login" }`。
3.  将其修改为 `"Auth": { "login": "Sign In" }`。

## 添加新语言支持

如果你需要支持更多语言（例如日语 `ja`、韩语 `ko`、法语 `fr`），请按照以下步骤操作：

1.  **创建翻译文件**：
    -   在 `src/i18n/messages/` 下创建新语言文件，如 `ja.json`。
    -   在 `src/i18n/pages/landing/` 下创建新语言文件，如 `ja.json`。
    -   你可以复制 `en.json` 的内容作为模板，然后翻译成目标语言。

2.  **更新 i18n 配置**：
    -   打开 `src/i18n/config.ts` 或 `src/i18n/request.ts`（具体取决于项目结构）。
    -   在 `locales` 数组中添加新的语言代码。

```typescript
// src/i18n/config.ts
export const locales = ['en', 'zh', 'ja'] as const;
```

3.  **更新中间件**（如果需要）：
    -   检查 `src/middleware.ts`，确保它使用了最新的 `locales` 配置。

4.  **预览验证**：
    -   访问 `http://localhost:3000/ja`，检查新语言是否生效。

## 使用 AI 辅助翻译

你可以使用 AI 快速生成新语言的翻译文件。

**Prompt 示例：**

> "Translate the content of `src/i18n/messages/en.json` into Japanese. Keep the keys unchanged and return the JSON format."
