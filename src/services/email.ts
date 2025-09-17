import { EmailManager, ResendProvider } from "@/extensions/email";
import { Configs, getAllConfigs } from "@/services/config";

/**
 * get email service for sending email
 */
export function getEmailService(configs: Configs) {
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
 * default email service
 */
export const emailService = getEmailService(await getAllConfigs());
