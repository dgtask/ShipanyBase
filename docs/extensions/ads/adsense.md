
# 集成 Google AdSense

ShipAny 支持与 Google AdSense 集成，以便在你的网站上展示广告并获得收入。

## 获取 AdSense Publisher ID

1.  登录你的 [Google AdSense](https://www.google.com/adsense/start/) 账户。
2.  在左侧菜单中，导航到 `Account` -> `Settings` -> `Account information`。
3.  复制你的 `Publisher ID` (格式为 `pub-XXXXXXXXXXXXXX`)。

## 配置环境变量

在你的 `.env.local` 文件中，添加以下环境变量:

```env
# -----------------------------------------------------------------------------
# Ads with Google AdSense
# -----------------------------------------------------------------------------
# https://www.google.com/adsense/start/
# Set your Google AdSense Publisher ID
NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID="pub-XXXXXXXXXXXXXX"
```

将 `pub-XXXXXXXXXXXXXX` 替换为你的实际 Publisher ID。

## 完成

重新启动你的 ShipAny 应用后，Google AdSense 将根据你的 AdSense 账户中的设置，在你的网站上展示广告。
