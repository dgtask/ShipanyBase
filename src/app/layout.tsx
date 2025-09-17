import "@/config/style/global.css";

import { getLocale, setRequestLocale } from "next-intl/server";
import { locales } from "@/config/locale";
import { envConfigs } from "@/config";
import { getAllConfigs } from "@/services/config";
import { getAdsComponents } from "@/services/ads";
import { getAnalyticsComponents } from "@/services/analytics";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  setRequestLocale(locale);

  const isProduction = process.env.NODE_ENV === "production" || true;

  // app url
  const appUrl = envConfigs.app_url || "";

  // get configs from db
  const configs = await getAllConfigs();

  // get analytics components in production
  const { analyticsMetaTags, analyticsHeadScripts, analyticsBodyScripts } =
    getAnalyticsComponents(isProduction ? configs : {});

  // get ads components in production
  const { adsMetaTags, adsHeadScripts, adsBodyScripts } = getAdsComponents(
    isProduction ? configs : {}
  );

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* inject locales */}
        {locales ? (
          <>
            {locales.map((loc) => (
              <link
                key={loc}
                rel="alternate"
                hrefLang={loc}
                href={`${appUrl}${loc === "en" ? "" : `/${loc}`}/`}
              />
            ))}
            <link rel="alternate" hrefLang="x-default" href={appUrl} />
          </>
        ) : null}

        {/* inject ads meta tags */}
        {adsMetaTags}
        {/* inject ads head scripts */}
        {adsHeadScripts}

        {/* inject analytics meta tags */}
        {analyticsMetaTags}
        {/* inject analytics head scripts */}
        {analyticsHeadScripts}
      </head>
      <body>
        {children}

        {/* inject ads body scripts */}
        {adsBodyScripts}

        {/* inject analytics body scripts */}
        {analyticsBodyScripts}
      </body>
    </html>
  );
}
