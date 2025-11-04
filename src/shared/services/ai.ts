import { AIManager, KieProvider } from '@/extensions/ai';
import { Configs, getAllConfigs } from '@/shared/services/config';

/**
 * get ai manager with configs
 */
export function getAIManagerWithConfigs(configs: Configs) {
  const aiManager = new AIManager();

  if (configs.kie_api_key) {
    aiManager.addProvider(
      new KieProvider({
        apiKey: configs.kie_api_key,
      })
    );
  }

  return aiManager;
}

/**
 * global ai service
 */
let aiService: AIManager | null = null;

/**
 * get ai service manager
 */
export async function getAIService(): Promise<AIManager> {
  if (true) {
    const configs = await getAllConfigs();
    aiService = getAIManagerWithConfigs(configs);
  }
  return aiService;
}
