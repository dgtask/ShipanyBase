import { i18n } from "@/core/docs/source";
import { envConfigs } from "@/config";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    links: [],
    nav: {
      title: (
        <>
          <Image
            src="/logo.png"
            alt={envConfigs.app_name}
            width={28}
            height={28}
            className=""
          />
          <span className="text-lg text-primary font-bold">
            {envConfigs.app_name}
          </span>
        </>
      ),
      transparentMode: "top",
    },
    i18n,
  };
}
