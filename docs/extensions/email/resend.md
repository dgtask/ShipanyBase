
# 使用 Resend 发送邮件

ShipAny 使用 [Resend](https://resend.com/) 来发送交易性邮件，例如欢迎邮件、密码重置等。

## 获取 Resend API 密钥

1.  注册并登录你的 [Resend](https://resend.com/) 账户。
2.  在左侧菜单中，点击 `API Keys`。
3.  点击 `Create API Key`。
4.  为你的 API 密钥命名，并设置权限 (例如 `Full access`)。
5.  复制生成的 API 密钥。

## 添加并验证域名

为了提高邮件的送达率，你需要添加并验证你的发件域名。

1.  在 Resend 仪表盘中，点击 `Domains`。
2.  点击 `Add Domain` 并输入你的域名。
3.  按照 Resend 提供的 DNS 记录，在你的域名提供商处完成配置。

## 配置环境变量

在你的 `.env.local` 文件中，添加以下 Resend 相关的环境变量:

```env
# -----------------------------------------------------------------------------
# Email with Resend
# -----------------------------------------------------------------------------
# https://resend.com/
# Set your Resend API key
RESEND_API_KEY="re_..."

# Set your email from address
EMAIL_FROM="Your Name <your-name@your-domain.com>"
```

-   `RESEND_API_KEY`: 你的 Resend API 密钥。
-   `EMAIL_FROM`: 你希望用来发送邮件的地址，必须是你已在 Resend 验证过的域名。

## 邮件模板

ShipAny 的邮件模板位于 `src/components/emails` 目录下。你可以根据需要自定义这些 React 组件来修改邮件的外观和内容。
