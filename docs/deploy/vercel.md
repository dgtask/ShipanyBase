
# 使用 Vercel 部署

Vercel 是部署 Next.js 应用的首选平台，提供开箱即用的体验。

## 一键部署

你可以使用 ShipAny 提供的一键部署按钮，直接将项目模板部署到你的 Vercel 账户。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshipany-app%2Fshipany-two&project-name=shipany-two&repository-name=shipany-two)

## 手动部署

1.  **登录 Vercel**:
    使用你的 GitHub, GitLab, 或 Bitbucket 账户登录 Vercel。

2.  **导入项目**:
    点击 `Add New...` -> `Project`，然后选择你的 ShipAny Git 仓库。

3.  **配置项目**:
    Vercel 会自动识别出这是一个 Next.js 项目，并为你配置好构建和部署设置。

4.  **添加环境变量**:
    在项目设置的 `Environment Variables` 中，添加你的应用所需的环境变量。

5.  **部署**:
    点击 `Deploy` 按钮，Vercel 将开始构建和部署你的应用。
