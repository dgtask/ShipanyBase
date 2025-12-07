
# 集成 Crisp 在线客服

ShipAny 支持集成 [Crisp](https://crisp.chat/)，一个功能强大的在线客服平台。

## 获取 Crisp Website ID

1.  登录你的 [Crisp](https://app.crisp.chat/) 账户。
2.  进入 `Settings` -> `Website Settings`。
3.  选择你的网站，然后点击 `Setup Instructions`。
4.  在给出的代码片段中，你会找到你的 `CRISP_WEBSITE_ID`。

    ```html
    <script type="text/javascript">
      window.$crisp=[];
      window.CRISP_WEBSITE_ID="YOUR_WEBSITE_ID";
      (function(){
        d=document;s=d.createElement("script");
        s.src="https://client.crisp.chat/l.js";
        s.async=1;d.getElementsByTagName("head")[0].appendChild(s);
      })();
    </script>
    ```

    `YOUR_WEBSITE_ID` 就是你的 Website ID。

## 配置环境变量

在你的 `.env.local` 文件中，添加以下环境变量:

```env
# -----------------------------------------------------------------------------
# Customer Service with Crisp
# -----------------------------------------------------------------------------
# https://crisp.chat/
# Set your Crisp Website ID
NEXT_PUBLIC_CRISP_WEBSITE_ID="YOUR_WEBSITE_ID"
```

将 `YOUR_WEBSITE_ID` 替换为你的实际 Website ID。

## 完成

重新启动你的 ShipAny 应用后，Crisp 的聊天窗口将出现在你网站的右下角。
