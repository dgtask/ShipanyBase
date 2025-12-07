
# 集成 Google Analytics

ShipAny 支持与 Google Analytics (GA) 集成，以跟踪你网站的流量和用户行为。

## 获取 GA Measurement ID

1.  登录你的 [Google Analytics](https://analytics.google.com/) 账户。
2.  进入 `Admin` 面板。
3.  在 `Property` 列中，选择 `Data Streams`。
4.  选择你的网站数据流，或者创建一个新的。
5.  复制 `Measurement ID` (格式为 `G-XXXXXXXXXX`)。

## 配置环境变量

在你的 `.env.local` 文件中，添加以下环境变量:

```env
# -----------------------------------------------------------------------------
# Analytics with Google Analytics
# -----------------------------------------------------------------------------
# https://analytics.google.com/
# Set your Google Analytics Measurement ID
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

将 `G-XXXXXXXXXX` 替换为你的实际 Measurement ID。

## 完成

重新启动你的 ShipAny 应用后，Google Analytics 将开始跟踪你网站的数据。
