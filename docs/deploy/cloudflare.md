
# 使用 Cloudflare 部署

ShipAny 兼容 Cloudflare Pages，通过 OpenNext 框架将 Next.js 应用适配到 Cloudflare 环境。

## 部署步骤

1.  **登录 Cloudflare 控制台**:
    进入你的 Cloudflare 账户。

2.  **创建 Pages 项目**:
    在 `Workers & Pages` 菜单中，选择 `Create application` -> `Pages` -> `Connect to Git`。

3.  **连接你的 Git 仓库**:
    选择你的 ShipAny项目所在的 Git 仓库并授权 Cloudflare 访问。

4.  **配置构建设置**:
    -   **框架预设 (Framework preset)**: 选择 `Next.js`。
    -   **构建命令 (Build command)**: `npm run open-build`
    -   **构建输出目录 (Build output directory)**: `.open-next`

5.  **添加环境变量**:
    在项目的 `Settings` -> `Environment variables` 中，添加你的应用所需的环境变量。

6.  **保存并部署**:
    点击 `Save and Deploy`，Cloudflare 将开始构建和部署你的应用。

部署完成后，你将获得一个 `*.pages.dev` 的域名，你也可以在 `Custom domains` 中绑定你自己的域名。
