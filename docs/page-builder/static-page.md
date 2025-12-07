
# 创建静态页面

ShipAny 允许你通过创建 Markdown 文件来快速生成静态页面，例如关于我们、隐私政策、服务条款等。

## 页面文件位置

所有的静态页面都存放在 `src/showcase/pages` 目录下。

## 创建新页面

1.  在 `src/showcase/pages` 目录下创建一个新的 `.md` 或 `.mdx` 文件。
    例如，创建一个 `about-us.md` 文件。

2.  **添加页面内容**:
    使用 Markdown 语法编写你的页面内容。你也可以在 MDX 文件中使用 React 组件。

    ```markdown
    ---
    title: 关于我们
    description: 了解更多关于我们团队的信息。
    ---

    # 关于我们

    我们是一个充满激情的团队，致力于创造出色的产品。
    ```

3.  **Frontmatter**:
    文件头部的 `---` 部分是 frontmatter，用于定义页面的元数据。
    -   `title`: 页面的标题，会显示在浏览器标签页和页面顶部。
    -   `description`: 页面的描述，用于 SEO。

## 访问页面

创建文件后，你可以通过 `https://<你的域名>/p/about-us` 来访问这个新页面。

-   `p` 是静态页面的固定路由前缀。
-   `about-us` 是你的文件名（不包含 `.md` 或 `.mdx` 后缀）。
