
# 使用 Cloudflare R2 进行文件存储

ShipAny 支持使用 [Cloudflare R2](https://www.cloudflare.com/products/r2/) 作为文件存储服务。R2 与 Amazon S3 兼容，并提供零出口费用的优势，非常适合存储用户上传的图片、文件等。

## 创建 R2 存储桶 (Bucket)

1.  登录你的 [Cloudflare](https://dash.cloudflare.com/) 控制台。
2.  在左侧菜单中，选择 `R2`。
3.  点击 `Create bucket` 并为你的存储桶命名。

## 获取 R2 凭据

1.  在 R2 概览页面，点击右上角的 `Manage R2 API Tokens`。
2.  点击 `Create API token`。
3.  选择 `Edit` 权限模板，然后创建一个新的 API token。
4.  复制生成的 `Access Key ID` 和 `Secret Access Key`。
5.  你的 `Account ID` 可以在 R2 概览页面的右侧找到。

## 获取存储桶的公共 URL

1.  进入你创建的 R2 存储桶的设置页面。
2.  在 `Public access` 部分，连接一个自定义域名或使用 `*.r2.dev` 域名来公开你的存储桶。
3.  复制你的存储桶的公共 URL。

## 配置环境变量

在你的 `.env.local` 文件中，添加以下 R2 相关的环境变量:

```env
# -----------------------------------------------------------------------------
# Storage with Cloudflare R2
# -----------------------------------------------------------------------------
# https://www.cloudflare.com/products/r2/
# Set your Cloudflare R2 credentials
R2_BUCKET_NAME="your-bucket-name"
R2_ACCOUNT_ID="your-account-id"
R2_ACCESS_KEY_ID="your-access-key-id"
R2_SECRET_ACCESS_KEY="your-secret-access-key"

# Set your R2 public URL
NEXT_PUBLIC_R2_PUBLIC_URL="https://your-public-url.r2.dev"
```

将上述值替换为你自己的 R2 凭据和 URL。
