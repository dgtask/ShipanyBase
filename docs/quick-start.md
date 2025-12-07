# 快速开始

在开始使用 ShipAny 之前，请确保你已经 **获取 ShipAny** 并已获得 ShipAny Two 代码仓库访问权限。
并且确保你已经完成了 **前置要求**。

## 初始化项目

### 拉取 ShipAny Two 源代码

```bash
git clone git@github.com:shipanyai/shipany-template-two my-shipany-project
```

默认拉取的是 dev 分支的代码，基于 Next.js 16，可部署在 Vercel，或通过 VPS + Dokploy 部署。
dev 分支是开发分支，更新迭代快，包含最新的功能特性。如果你追求版本稳定性，可以选择拉取 main 分支的代码。

```bash
git clone -b main git@github.com:shipanyai/shipany-template-two my-shipany-project
```

如果你需要部署在 Cloudflare Workers，请拉取 cf 分支的代码，此分支基于 Next.js 15.5.5，暂不支持 Next.js 16。

```bash
git clone -b cf git@github.com:shipanyai/shipany-template-two my-shipany-project
```

拉取完代码之后，进入项目根目录，后续的命令行操作都在项目根目录下执行。

```bash
cd my-shipany-project
```

### 安装依赖

执行以下命令，安装项目依赖。

```bash
pnpm install
```

### 启动开发服务器

执行以下命令，启动开发服务器。

```bash
pnpm dev
```

点击输出的 Local 地址，在浏览器打开网页：`http://localhost:3000`，即可预览项目。
启动的开发服务器默认监听 3000 端口，如果你希望使用其他端口，可以在启动开发服务器时指定端口。

```bash
pnpm dev --port 8080
```

新的项目预览地址就是：`http://localhost:8080`。

### 预览项目

打开项目预览地址，首次看到的页面是这样的：

(此处为图片占位符)

## 配置环境变量

### 创建配置文件

通过下面的命令，复制一份配置文件，用于配置本地开发用到的环境变量。

```bash
cp .env.example .env.development
```

### 修改环境变量值

根据你的项目信息，自行修改配置文件中的内容。

```env
# app
NEXT_PUBLIC_APP_URL = "http://localhost:3000"
NEXT_PUBLIC_APP_NAME = "ShipAny Two"

# theme
NEXT_PUBLIC_THEME = "default"

# appearance
NEXT_PUBLIC_APPEARANCE = "system"

# database
DATABASE_URL = ""
DATABASE_PROVIDER = "postgresql"
DB_SINGLETON_ENABLED = "true"
DB_MAX_CONNECTIONS = "1"

# auth secret
# openssl rand -base64 32
AUTH_SECRET = ""
```

**必填项：**

- `NEXT_PUBLIC_APP_URL`：项目主页地址。复制项目预览地址填入
- `NEXT_PUBLIC_APP_NAME`：应用名称。改成你的项目名称

**选填项：**

- `NEXT_PUBLIC_THEME`：项目主题。默认是 default，对应的主题文件夹是： `src/themes/default`。如果你有自定义主题的需求，可以修改此选项。
- `NEXT_PUBLIC_APPEARANCE`：项目外观。默认是 system，会根据用户电脑设置的系统主题自动切换。你可以改成 light 或 dark，来控制项目默认显示的外观。
- `DATABASE_URL`：数据库连接地址。如果你需要用户登录、管理后台等功能，需要配置此项。
- `DATABASE_PROVIDER`：数据库提供商。目前仅支持 postgresql。支持 Supabase, Neon 等云数据库和自建的 PostgreSQL 数据库。
- `DB_SINGLETON_ENABLED`：数据库单例模式。默认是 true，会复用数据库连接。如果部署在 Cloudflare Workers 等 Serverless 平台，需要改为 false。
- `DB_MAX_CONNECTIONS`：数据库连接池最大连接数。默认是 1，你可适当调大此值，提升数据库并发能力。
- `AUTH_SECRET`：鉴权密钥。如果要开启用户登录功能，需要配置此项。

可以通过以下命令生成随机密钥：

```bash
openssl rand -base64 32
```

## 配置数据库

如果你的项目需要用户登录、管理后台等功能，必须按照以下步骤配置数据库。

### 创建数据库

你可以在 Supabase、Neon 等云数据库平台创建数据库，得到云数据库的远程连接地址，类似这种：

`postgresql://postgres.xxx:xxxxxx@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres`

你也可以使用自建的 PostgreSQL 数据库，得到数据库的连接地址，类似这种：

`postgresql://user:password@127.0.0.1:5432/my_shipany_project`

建议本地开发使用自建的 PostgreSQL 数据库，线上版本使用云数据库。
常用数据库的创建和连接地址获取，可以参考：数据库 部分的文档。

### 设置环境变量

把上一步骤得到的数据库连接地址填入环境变量 `DATABASE_URL`。

```env
DATABASE_URL = "postgresql://user:password@127.0.0.1:5432/my_shipany_project"
DATABASE_PROVIDER = "postgresql"
DB_SINGLETON_ENABLED = "true"
DB_MAX_CONNECTIONS = "1"
```

### 迁移数据表

执行以下命令，迁移数据表

```bash
pnpm db:generate
pnpm db:migrate
```

迁移数据表命令，在连接数据库时，读取的是 `.env.development` 文件中的 `DATABASE_URL` 变量。
如果在执行迁移命令：`pnpm db:migrate` 时遇到 Timeout 超时问题，或者长时间无响应。你需要通过以下命令检查你的数据库能否被正常连接。

```bash
psql "postgresql://user:password@address:port/database" # YOUR-DATABASE-URL
```

如果通过命令直接连接数据库也无法连上，你需要检查你的数据库地址是否有误，或者是否存在网络问题（比如防火墙、代理等）。
正常执行 `pnpm db:migrate` 迁移数据表成功后，你可以再次执行上述命令，验证。
