import { Configs, getAllConfigs } from "@/services/config";
import { AdsManager, AdsenseProvider } from "@/extensions/ads";
import { ReactNode } from "react";

export function getAdsComponents(configs: Configs): {
  adsMetaTags: ReactNode;
  adsHeadScripts: ReactNode;
  adsBodyScripts: ReactNode;
} {
  const ads = new AdsManager();

  // adsense
  if (configs.adsense_code) {
    ads.addProvider(new AdsenseProvider({ adId: configs.adsense_code }));
  }

  return {
    adsMetaTags: ads.getMetaTags(),
    adsHeadScripts: ads.getHeadScripts(),
    adsBodyScripts: ads.getBodyScripts(),
  };
}

export const adsService = getAdsComponents(await getAllConfigs());
