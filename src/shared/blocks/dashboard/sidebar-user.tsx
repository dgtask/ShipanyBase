"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { ChevronsUpDown, Loader2, LogOut } from "lucide-react";
import { Link, useRouter } from "@/core/i18n/navigation";
import { signOut, useSession } from "@/core/auth/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  useSidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/shared/components/ui/sidebar";

import { Button } from "@/shared/components/ui/button";
import { Fragment, useEffect, useState } from "react";
import { NavItem } from "@/shared/types/blocks/common";
import { SidebarUser as SidebarUserType } from "@/shared/types/blocks/dashboard";
import { useTranslations } from "next-intl";
import { SmartIcon } from "@/shared/blocks/common";

// SSR/CSR hydration bug fix: Avoid rendering session-dependent UI until mounted on client
export function SidebarUser({ user }: { user: SidebarUserType }) {
  const t = useTranslations("common.sign");
  const { data: session, isPending } = useSession();
  const { isMobile, open } = useSidebar();
  const router = useRouter();

  // This state will ensure rendering only happens after client hydration
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push(user.signout_callback || "/sign-in");
  };

  // If not mounted, render placeholder to avoid hydration mismatch
  if (!hasMounted) {
    return (
      <div className="flex justify-center items-center h-full px-4 py-4">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (session?.user) {
    return (
      <SidebarMenu className="gap-4">
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="rounded-lg h-8 w-8">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name}
                  />
                  <AvatarFallback className="rounded-lg">
                    {session?.user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {session?.user?.name}
                  </span>
                  {user.show_email && (
                    <span className="truncate text-xs">
                      {session?.user?.email}
                    </span>
                  )}
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-background"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={session?.user?.image || ""}
                      alt={session?.user?.name}
                    />
                    <AvatarFallback className="rounded-lg">
                      {session?.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {session?.user?.name}
                    </span>
                    {user.show_email && (
                      <span className="truncate text-xs">
                        {session?.user?.email}
                      </span>
                    )}
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {user.nav?.items.map((item: NavItem | undefined) => (
                  <Fragment key={item?.title || item?.url}>
                    <DropdownMenuItem className="cursor-pointer">
                      <Link
                        href={item?.url || ""}
                        target={item?.target}
                        className="w-full flex items-center gap-2"
                      >
                        {item?.icon && <SmartIcon name={item.icon as string} />}
                        {item?.title || ""}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </Fragment>
                ))}
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleSignOut}
                >
                  <LogOut />
                  {t("sign_out_title")}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  // When user is not logged in
  return (
    <>
      {open ? (
        <div className="flex justify-center items-center h-full px-4 py-4">
          {isPending ? (
            <div className="w-full flex justify-center items-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <Button className="w-full" onClick={() => {}}>
              Sign in
            </Button>
          )}
        </div>
      ) : (
        <SidebarMenu />
      )}
    </>
  );
}
