import { UIMessage } from 'ai';

import { redirect } from '@/core/i18n/navigation';
import { ChatBox } from '@/shared/blocks/chat/box';
import { findChatById } from '@/shared/services/chat';
import { getChatMessages } from '@/shared/services/chat_message';
import { Chat } from '@/shared/types/chat';

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const resolvedParams = await params;
  const { id, locale } = resolvedParams;

  const chat = await findChatById(id);
  if (!chat) {
    redirect({ href: '/chat', locale });
  }

  // load chat messages from database
  const messages = await getChatMessages({
    chatId: chat.id,
    page: 1,
    limit: 200,
  });

  const initialChat: Chat = {
    id: chat.id,
    title: chat.title,
    createdAt: chat.createdAt,
    model: chat.model,
    provider: chat.provider,
    parts: chat.parts ? JSON.parse(chat.parts) : [],
    metadata: chat.metadata ? JSON.parse(chat.metadata) : {},
    content: chat.content ? JSON.parse(chat.content) : {},
  };

  const initialMessages = messages.map((message) => ({
    id: message.id,
    role: message.role,
    metadata: message.metadata ? JSON.parse(message.metadata) : {},
    parts: message.parts ? JSON.parse(message.parts) : [],
  }));

  return (
    <ChatBox
      initialChat={initialChat}
      initialMessages={initialMessages as UIMessage[]}
    />
  );
}
