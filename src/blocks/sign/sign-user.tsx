"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "@/core/auth/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "@/core/i18n/navigation";
import { Loader2 } from "lucide-react";
import { envConfigs } from "@/config";
import { SignModal } from "./sign-modal";
import { useAppContext } from "@/contexts/app";

export function SignUser({
  isScrolled,
  signButtonSize = "sm",
}: {
  isScrolled?: boolean;
  signButtonSize?: "default" | "sm" | "lg" | "icon";
}) {
  if (
    typeof window === "undefined" &&
    (!envConfigs.database_url || !envConfigs.auth_secret)
  ) {
    return null;
  }

  const { isCheckSign, user, setIsShowSignModal } = useAppContext();
  const router = useRouter();

  if (isCheckSign) {
    return (
      <div>
        <Loader2 className="size-4 animate-spin" />
      </div>
    );
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user.image || ""} alt={user.name || ""} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
      <Button
        asChild
        size={signButtonSize}
        className={cn(
          "border-foreground/10 ml-4 h-7 ring-0",
          isScrolled && "lg:hidden"
        )}
        onClick={() => setIsShowSignModal(true)}
      >
        <span>Sign In</span>
      </Button>
      <SignModal />
    </div>
  );
}
