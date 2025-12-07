# 主题配置

ShipAny 支持高度可定制的主题系统，基于 TailwindCSS 4 和 CSS 变量。你可以轻松修改网站的配色方案。

## 修改配色方案

ShipAny 的颜色配置位于全局 CSS 文件中，通常是 `src/app/theme.css` 或 `src/styles/theme.css`。

### 颜色格式

ShipAny 使用 `oklch` 颜色格式，这是 TailwindCSS 4 推荐的颜色格式，支持更广泛的色域和更好的一致性。

### 使用 Shadcn 主题编辑器

你可以使用在线工具生成自定义的主题配色代码：

1.  **tweakcn**: [https://tweak.vercel.app/](https://tweak.vercel.app/)
2.  **shadcn/ui themes**: [https://ui.shadcn.com/themes](https://ui.shadcn.com/themes)

### 操作步骤

1.  在上述网站中调整颜色，直到满意为止。
2.  复制生成的 CSS 代码（确保是 CSS 变量格式）。
3.  打开项目中的 `src/app/theme.css` 文件。
4.  将 `:root`（浅色模式）和 `.dark`（深色模式）下的颜色变量替换为你复制的代码。

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  /* ... 其他变量 */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... 其他变量 */
}
```

## 环境变量配置

在 `.env` 文件中，你可以设置默认的主题模式：

```env
# theme
NEXT_PUBLIC_THEME = "default"

# appearance
NEXT_PUBLIC_APPEARANCE = "system" # 可选: system, light, dark
```

-   `NEXT_PUBLIC_THEME`: 对应 `src/themes` 目录下的主题文件夹（如果项目支持多主题切换）。
-   `NEXT_PUBLIC_APPEARANCE`: 设置默认的外观模式。`system` 跟随系统，`light` 强制浅色，`dark` 强制深色。
