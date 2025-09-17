import { ReactNode } from "react";
import { Configs, getAllConfigs } from "@/services/config";
import {
  AnalyticsManager,
  GoogleAnalyticsProvider,
  OpenPanelAnalyticsProvider,
  PlausibleAnalyticsProvider,
  VercelAnalyticsProvider,
} from "@/extensions/analytics";

export function getAnalyticsComponents(configs: Configs): {
  analyticsMetaTags: ReactNode;
  analyticsHeadScripts: ReactNode;
  analyticsBodyScripts: ReactNode;
} {
  const analytics = new AnalyticsManager();

  // google analytics
  if (configs.google_analytics_id) {
    analytics.addProvider(
      new GoogleAnalyticsProvider({ gaId: configs.google_analytics_id })
    );
  }

  // plausible
  if (configs.plausible_domain && configs.plausible_src) {
    analytics.addProvider(
      new PlausibleAnalyticsProvider({
        domain: configs.plausible_domain,
        src: configs.plausible_src,
      })
    );
  }

  // openpanel
  if (configs.openpanel_client_id) {
    analytics.addProvider(
      new OpenPanelAnalyticsProvider({
        clientId: configs.openpanel_client_id,
      })
    );
  }

  // vercel analytics
  // TODO: read config from db
  if (true) {
    analytics.addProvider(new VercelAnalyticsProvider({ mode: "auto" }));
  }

  return {
    analyticsMetaTags: analytics.getMetaTags(),
    analyticsHeadScripts: analytics.getHeadScripts(),
    analyticsBodyScripts: analytics.getBodyScripts(),
  };
}

export const analyticsService = getAnalyticsComponents(await getAllConfigs());
