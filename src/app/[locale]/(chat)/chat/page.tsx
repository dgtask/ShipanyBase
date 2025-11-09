import { ChatGenerator } from '@/shared/blocks/chat/generator';

export default async function ChatPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <ChatGenerator />;
}
