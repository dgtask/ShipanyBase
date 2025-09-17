import { Header, Main, MainHeader } from "@/blocks/dashboard";
import { FormCard } from "@/blocks/form";
import { NavItem } from "@/types/blocks/common";
import { Form as FormType } from "@/types/blocks/form";
import { saveConfigs } from "@/services/config";
import { getConfigs } from "@/services/config";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const configs = await getConfigs();
  const { tab } = await params;

  const tabs: NavItem[] = [
    {
      title: "Auth",
      url: "/admin/settings/auth",
      is_active: tab === "auth",
    },
    {
      title: "Payment",
      url: "/admin/settings/payment",
      is_active: tab === "payment",
    },
    {
      title: "Email",
      url: "/admin/settings/email",
      is_active: tab === "email",
    },
    {
      title: "Storage",
      url: "/admin/settings/storage",
      is_active: tab === "storage",
    },

    {
      title: "AI",
      url: "/admin/settings/ai",
      is_active: tab === "ai",
    },
    {
      title: "Analytics",
      url: "/admin/settings/analytics",
      is_active: tab === "analytics",
    },
    {
      title: "Ads",
      url: "/admin/settings/ads",
      is_active: tab === "ads",
    },
  ];

  const handleSubmit = async (data: FormData, passby: any) => {
    "use server";

    const tab = passby.tab;
    const provider = passby.provider;

    switch (tab) {
      case "auth":
        if (provider === "google") {
          const googleClientId = data.get("google_client_id") || "";
          const googleClientSecret = data.get("google_client_secret") || "";

          await saveConfigs({
            google_client_id: googleClientId as string,
            google_client_secret: googleClientSecret as string,
          });
          break;
        } else if (provider === "github") {
          const githubClientId = data.get("github_client_id") || "";
          const githubClientSecret = data.get("github_client_secret") || "";

          await saveConfigs({
            github_client_id: githubClientId as string,
            github_client_secret: githubClientSecret as string,
          });
          break;
        } else {
          throw new Error("invalid provider");
        }
      case "payment":
        if (provider === "stripe") {
          const stripePublishableKey = data.get("stripe_publishable_key") || "";
          const stripeSecretKey = data.get("stripe_secret_key") || "";
          const stripeSigningSecret = data.get("stripe_signing_secret") || "";
          await saveConfigs({
            stripe_publishable_key: stripePublishableKey as string,
            stripe_secret_key: stripeSecretKey as string,
            stripe_signing_secret: stripeSigningSecret as string,
          });
          break;
        } else {
          throw new Error("invalid provider");
        }
      case "analytics":
        if (provider === "google_analytics") {
          const googleAnalyticsId = data.get("google_analytics_id") || "";
          await saveConfigs({
            google_analytics_id: googleAnalyticsId as string,
          });
          break;
        } else if (provider === "plausible") {
          const plausibleDomain = data.get("plausible_domain") || "";
          const plausibleSrc = data.get("plausible_src") || "";
          await saveConfigs({
            plausible_domain: plausibleDomain as string,
            plausible_src: plausibleSrc as string,
          });
          break;
        } else if (provider === "openpanel") {
          const openpanelClientId = data.get("openpanel_client_id") || "";
          await saveConfigs({
            openpanel_client_id: openpanelClientId as string,
          });
          break;
        } else {
          throw new Error("invalid provider");
        }
      case "email":
        if (provider === "resend") {
          const resendApiKey = data.get("resend_api_key") || "";
          const resendSenderEmail = data.get("resend_sender_email") || "";
          await saveConfigs({
            resend_api_key: resendApiKey as string,
            resend_sender_email: resendSenderEmail as string,
          });
          break;
        } else {
          throw new Error("invalid provider");
        }
      case "storage":
        if (provider === "r2") {
          const r2AccessKey = data.get("r2_access_key") || "";
          const r2SecretKey = data.get("r2_secret_key") || "";
          const r2BucketName = data.get("r2_bucket_name") || "";
          const r2Region = data.get("r2_region") || "";
          const r2Endpoint = data.get("r2_endpoint") || "";
          const r2Domain = data.get("r2_domain") || "";
          await saveConfigs({
            r2_access_key: r2AccessKey as string,
            r2_secret_key: r2SecretKey as string,
            r2_bucket_name: r2BucketName as string,
            r2_region: r2Region as string,
            r2_endpoint: r2Endpoint as string,
            r2_domain: r2Domain as string,
          });
          break;
        } else {
          throw new Error("invalid provider");
        }
      case "ads":
        if (provider === "adsense") {
          const adsenseCode = data.get("adsense_code") || "";
          await saveConfigs({
            adsense_code: adsenseCode as string,
          });
          break;
        } else {
          throw new Error("invalid provider");
        }
      case "ai":
        if (provider === "openrouter") {
          const openrouterApiKey = data.get("openrouter_api_key") || "";
          await saveConfigs({
            openrouter_api_key: openrouterApiKey as string,
          });
          break;
        } else if (provider === "replicate") {
          const replicateApiToken = data.get("replicate_api_token") || "";
          await saveConfigs({
            replicate_api_token: replicateApiToken as string,
          });
          break;
        } else if (provider === "fal") {
          const falApiKey = data.get("fal_api_key") || "";
          await saveConfigs({
            fal_api_key: falApiKey as string,
          });
          break;
        } else {
          throw new Error("invalid provider");
        }
        break;
      case "ai":
        if (provider === "fal") {
          const falApiKey = data.get("fal_api_key") || "";
          await saveConfigs({
            fal_api_key: falApiKey as string,
          });
          break;
        } else {
          throw new Error("invalid provider");
        }
      default:
        throw new Error("invalid tab");
    }

    return {
      status: "success",
      message: "Settings updated",
    };
  };

  let forms: FormType[] = [];

  if (tab === "auth") {
    forms.push({
      title: "Google Auth",
      description: "custom your google auth settings",
      data: configs,
      fields: [
        {
          name: "google_client_id",
          type: "text",
          title: "Google Client ID",
          placeholder: "",
        },
        {
          name: "google_client_secret",
          type: "password",
          title: "Google Client Secret",
          placeholder: "",
        },
      ],
      passby: {
        tab: "auth",
        group: "auth",
        provider: "google",
      },
      submit: {
        button: {
          title: "Save",
        },
        handler: handleSubmit as any,
      },
    });
    forms.push({
      title: "Github Auth",
      description: "custom your github auth settings",
      fields: [
        {
          name: "github_client_id",
          type: "text",
          title: "Github Client ID",
          placeholder: "",
        },
        {
          name: "github_client_secret",
          type: "password",
          title: "Github Client Secret",
          placeholder: "",
        },
      ],
      data: configs,
      passby: {
        tab: "auth",
        group: "auth",
        provider: "github",
      },
      submit: {
        button: {
          title: "Save",
        },
        handler: handleSubmit as any,
      },
    });
  } else if (tab === "payment") {
    forms.push({
      title: "Stripe",
      description: "custorm your stripe settings",
      fields: [
        {
          name: "stripe_publishable_key",
          type: "text",
          title: "Stripe Publishable Key",
          placeholder: "pk_xxx",
        },
        {
          name: "stripe_secret_key",
          type: "password",
          title: "Stripe Secret Key",
          placeholder: "sk_xxx",
        },
        {
          name: "stripe_signing_secret",
          type: "password",
          title: "Stripe Signing Secret",
          placeholder: "whsec_xxx",
          tip: "Stripe Signing Secret is used to verify the webhook from Stripe",
        },
      ],
      data: configs,
      passby: {
        tab: "payment",
        group: "payment",
        provider: "stripe",
      },
      submit: {
        button: {
          title: "Save",
        },
        handler: handleSubmit as any,
      },
    });
  } else if (tab === "analytics") {
    // google analytics
    forms.push({
      title: "Google Analytics",
      description: "custorm your google analytics settings",
      fields: [
        {
          name: "google_analytics_id",
          type: "text",
          title: "Google Analytics ID",
          placeholder: "",
        },
      ],
      data: configs,
      passby: {
        tab: "analytics",
        group: "analytics",
        provider: "google_analytics",
      },
      submit: {
        button: {
          title: "Save",
        },
        handler: handleSubmit as any,
      },
    });

    // plausible
    forms.push({
      title: "Plausible",
      description: "custorm your plausible settings",
      fields: [
        {
          name: "plausible_domain",
          type: "text",
          title: "Plausible Domain",
          placeholder: "shipany.site",
        },
        {
          name: "plausible_src",
          type: "url",
          title: "Plausible Script Src",
          placeholder: "https://plausible.io/js/script.js",
        },
      ],
      data: configs,
      passby: {
        tab: "analytics",
        group: "analytics",
        provider: "plausible",
      },
      submit: {
        button: {
          title: "Save",
        },
        handler: handleSubmit as any,
      },
    });

    // openpanel
    forms.push({
      title: "OpenPanel",
      description: "custorm your openpanel settings",
      fields: [
        {
          name: "openpanel_client_id",
          type: "text",
          title: "OpenPanel Client ID",
          placeholder: "",
        },
      ],
      data: configs,
      passby: {
        tab: "analytics",
        group: "analytics",
        provider: "openpanel",
      },
      submit: {
        button: {
          title: "Save",
        },
        handler: handleSubmit as any,
      },
    });
  } else if (tab === "email") {
    forms.push({
      title: "Resend",
      description: "custorm your resend settings",
      fields: [
        {
          name: "resend_api_key",
          type: "password",
          title: "Resend API Key",
          placeholder: "",
        },
        {
          name: "resend_sender_email",
          type: "email",
          title: "Resend Sender Email",
          placeholder: "",
        },
      ],
      data: configs,
      passby: {
        tab: "email",
        group: "email",
        provider: "resend",
      },
      submit: {
        button: {
          title: "Save",
        },
        handler: handleSubmit as any,
      },
    });
  } else if (tab === "storage") {
    forms.push({
      title: "Cloudflare R2",
      description: "custorm your cloudflare r2 settings",
      fields: [
        {
          name: "r2_access_key",
          type: "text",
          title: "Cloudflare Access Key",
          placeholder: "",
        },
        {
          name: "r2_secret_key",
          type: "password",
          title: "Cloudflare Secret Key",
          placeholder: "",
        },
        {
          name: "r2_bucket_name",
          type: "text",
          title: "Bucket Name",
          placeholder: "",
        },
        {
          name: "r2_region",
          type: "text",
          title: "Region",
          placeholder: "",
          value: "auto",
        },
        {
          name: "r2_endpoint",
          type: "url",
          title: "Endpoint",
          placeholder: "https://xxx.r2.cloudflarestorage.com",
        },
        {
          name: "r2_domain",
          type: "url",
          title: "Domain",
          placeholder: "https://xxx.com",
          tip: "Custom domain for your r2 bucket",
        },
      ],
      data: configs,
      passby: {
        tab: "storage",
        group: "storage",
        provider: "r2",
      },
      submit: {
        button: {
          title: "Save",
        },
        handler: handleSubmit as any,
      },
    });
  } else if (tab === "ads") {
    forms.push({
      title: "Adsense",
      description: "custorm your adsense settings",
      fields: [
        {
          name: "adsense_code",
          type: "text",
          title: "Adsense Code",
          placeholder: "ca-pub-xxx",
        },
      ],
      data: configs,
      passby: {
        tab: "ads",
        group: "ads",
        provider: "adsense",
      },
      submit: {
        button: {
          title: "Save",
        },
        handler: handleSubmit as any,
      },
    });
  } else if (tab === "ai") {
    forms.push({
      title: "OpenRouter",
      description: "custorm your openrouter settings",
      fields: [
        {
          name: "openrouter_api_key",
          type: "password",
          title: "OpenRouter API Key",
          placeholder: "sk-or-xxx",
        },
      ],
      data: configs,
      passby: {
        tab: "ai",
        group: "ai",
        provider: "openrouter",
      },
      submit: {
        button: {
          title: "Save",
        },
        handler: handleSubmit as any,
      },
    });
    forms.push({
      title: "Replicate",
      description: "custorm your replicate settings",
      fields: [
        {
          name: "replicate_api_token",
          type: "password",
          title: "Replicate API Token",
          placeholder: "r8_xxx",
        },
      ],
      data: configs,
      passby: {
        tab: "ai",
        group: "ai",
        provider: "replicate",
      },
      submit: {
        button: {
          title: "Save",
        },
        handler: handleSubmit as any,
      },
    });
    forms.push({
      title: "Fal",
      description: "custorm your fal settings",
      fields: [
        {
          name: "fal_api_key",
          type: "password",
          title: "Fal API Key",
          placeholder: "",
        },
      ],
      data: configs,
      passby: {
        tab: "ai",
        group: "ai",
        provider: "fal",
      },
      submit: {
        button: {
          title: "Save",
        },
        handler: handleSubmit as any,
      },
    });
  }

  return (
    <>
      <Header />
      <Main>
        <MainHeader title="Settings" tabs={tabs} />
        {forms.map((form) => (
          <FormCard key={form.title} form={form} className="md:max-w-xl mb-8" />
        ))}
      </Main>
    </>
  );
}
