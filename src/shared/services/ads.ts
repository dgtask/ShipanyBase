import { AdsenseProvider, AdsManager } from '@/extensions/ads';
import { Configs, getAllConfigs } from '@/shared/services/config';

/**
 * get ads manager with configs
 */
export function getAdsManagerWithConfigs(configs: Configs) {
  const ads = new AdsManager();

  // adsense
  if (configs.adsense_code) {
    ads.addProvider(new AdsenseProvider({ adId: configs.adsense_code }));
  }

  return ads;
}

/**
 * global ads service
 */
let adsService: AdsManager | null = null;

/**
 * get ads service instance
 */
export async function getAdsService(): Promise<AdsManager> {
  if (true) {
    const configs = await getAllConfigs();
    adsService = getAdsManagerWithConfigs(configs);
  }
  return adsService;
}
