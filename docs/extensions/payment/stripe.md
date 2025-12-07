
# 集成 Stripe 支付

ShipAny 通过 Stripe 实现支付功能，包括一次性付款和订阅。

## 获取 Stripe API 密钥

1.  登录你的 [Stripe Dashboard](https://dashboard.stripe.com/)。
2.  进入 `Developers` -> `API keys`。
3.  复制你的 `Publishable key` 和 `Secret key`。

## 配置环境变量

在你的 `.env.local` 文件中，添加以下 Stripe 相关的环境变量:

```env
# -----------------------------------------------------------------------------
# Payment with Stripe
# -----------------------------------------------------------------------------
# https://stripe.com/
# Set your Stripe API keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# Set your Stripe webhook secret
STRIPE_WEBHOOK_SECRET="whsec_..."
```

-   `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: 你的 Stripe 可发布密钥。
-   `STRIPE_SECRET_KEY`: 你的 Stripe 秘密密钥。
-   `STRIPE_WEBHOOK_SECRET`: 你的 Stripe webhook 密钥 (下一步会讲到)。

## 配置 Stripe Webhook

Webhook 用于接收来自 Stripe 的事件通知，例如支付成功、订阅更新等。

1.  在 Stripe Dashboard 中，进入 `Developers` -> `Webhooks`。
2.  点击 `Add an endpoint`。
3.  在 `Endpoint URL` 中，输入 `https://<你的域名>/api/webhook/stripe`。
4.  在 `Select events to listen to` 中，选择你需要的事件，例如 `checkout.session.completed`。
5.  创建 endpoint 后，复制 `Signing secret` 并将其粘贴到 `.env.local` 文件的 `STRIPE_WEBHOOK_SECRET` 中。

## 配置价格方案

你可以在 `src/config/pricing.ts` 文件中配置你的价格方案，这些方案会显示在你的网站的价格页面上。

```typescript
// src/config/pricing.ts
export const pricing = {
  items: [
    {
      title: 'Starter',
      features: [
        'Payment with Stripe',
        'Auth with Google',
        'Database with Supabase',
      ],
      interval: 'one-time',
      amount: 9900, // in cents
      currency: 'USD',
    },
  ],
};
```

-   `interval`: 可以是 `one-time` (一次性) 或 `month` / `year` (订阅)。
-   `amount`: 价格，以美分为单位 (例如 `9900` 代表 $99.00)。
-   `currency`: 货币代码 (例如 `USD`, `EUR`)。
