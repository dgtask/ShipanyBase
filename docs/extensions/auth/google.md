
# 使用 Google 登录

ShipAny 使用 NextAuth.js (Better-Auth) 来处理身份验证，并支持多种 OAuth 提供商，包括 Google。

## 创建 Google OAuth 凭据

1.  访问 [Google Cloud Console](https://console.cloud.google.com/)。
2.  创建一个新项目。
3.  在左侧菜单中，导航到 `APIs & Services` -> `Credentials`。
4.  点击 `Create Credentials` -> `OAuth client ID`。
5.  选择 `Web application` 作为应用类型。
6.  在 `Authorized JavaScript origins` 中，添加你的应用 URL (例如 `http://localhost:3000` 或 `https://<你的域名>`)。
7.  在 `Authorized redirect URIs` 中，添加 `https://<你的域名>/api/auth/callback/google`。
8.  创建凭据后，复制 `Client ID` 和 `Client secret`。

## 配置环境变量

在你的 `.env.local` 文件中，添加以下 Google 相关的环境变量:

```env
# -----------------------------------------------------------------------------
# Auth with Google
# -----------------------------------------------------------------------------
# https://console.cloud.google.com/apis/credentials
# Set your Google OAuth credentials
AUTH_GOOGLE_ID="YOUR_GOOGLE_CLIENT_ID"
AUTH_GOOGLE_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

# Enable Google login
NEXT_PUBLIC_AUTH_GOOGLE_ENABLED="true"
```

-   `AUTH_GOOGLE_ID`: 你的 Google OAuth Client ID。
-   `AUTH_GOOGLE_SECRET`: 你的 Google OAuth Client Secret。
-   `NEXT_PUBLIC_AUTH_GOOGLE_ENABLED`: 设置为 `true` 来启用 Google 登录按钮。

## 启用 Google 登录

确保 `NEXT_PUBLIC_AUTH_GOOGLE_ENABLED` 设置为 `true`，这样在登录页面就会显示 “使用 Google 登录” 的按钮。
