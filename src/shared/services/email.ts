import { EmailManager, ResendProvider } from '@/extensions/email';
import { Configs, getAllConfigs } from '@/shared/services/config';

/**
 * get email service with configs
 */
export function getEmailServiceWithConfigs(configs: Configs) {
  const emailManager = new EmailManager();

  if (configs.resend_api_key) {
    emailManager.addProvider(
      new ResendProvider({
        apiKey: configs.resend_api_key,
        defaultFrom: configs.resend_sender_email,
      })
    );
  }

  return emailManager;
}

/**
 * global email service
 */
let emailService: EmailManager | null = null;

/**
 * get email service instance
 */
export async function getEmailService(): Promise<EmailManager> {
  if (true) {
    const configs = await getAllConfigs();
    emailService = getEmailServiceWithConfigs(configs);
  }
  return emailService;
}
