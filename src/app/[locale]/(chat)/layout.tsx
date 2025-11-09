import { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';

import { ChatLibrary } from '@/shared/blocks/chat/library';
import { LocaleDetector } from '@/shared/blocks/common';
import { DashboardLayout } from '@/shared/blocks/dashboard';
import { ChatContextProvider } from '@/shared/contexts/chat';
import { Sidebar as SidebarType } from '@/shared/types/blocks/dashboard';

export default async function ChatLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getTranslations('ai.chat');

  const sidebar: SidebarType = t.raw('sidebar');

  sidebar.library = <ChatLibrary />;

  return (
    <ChatContextProvider>
      <DashboardLayout sidebar={sidebar}>
        <LocaleDetector />
        {children}
      </DashboardLayout>
    </ChatContextProvider>
  );
}
