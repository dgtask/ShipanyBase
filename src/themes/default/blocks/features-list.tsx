"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { Features as FeaturesType } from "@/shared/types/blocks/landing";
import { SmartIcon } from "@/shared/blocks/common";
import { Button } from "@/shared/components/ui/button";
import { ScrollAnimation } from "@/shared/components/ui/scroll-animation";

export function FeaturesList({
  features,
  className,
}: {
  features: FeaturesType;
  className?: string;
}) {
  return (
    // Prevent horizontal scrolling
    <section className={`py-16 md:py-24 overflow-x-hidden ${className}`}>
      <div className="container overflow-x-hidden">
        <div className="flex flex-wrap items-center pb-12 md:gap-24 gap-8">
          <ScrollAnimation direction="left">
            <div className="w-full max-w-[500px] flex-shrink-0 mx-auto md:mx-0">
              <Image
                src={features.image?.src ?? ""}
                alt={features.image?.alt ?? ""}
                width={500}
                height={300}
                className="rounded-lg object-cover w-full h-auto"
                // Limit max image width & responsive width
                style={{ maxWidth: "100%", height: "auto", display: "block" }}
              />
            </div>
          </ScrollAnimation>
          <div className="flex-1 min-w-0 w-full">
            <ScrollAnimation delay={0.1}>
              <h2 className="text-foreground text-balance text-4xl font-semibold break-words">
                {features.title}
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <p className="my-6 text-balance text-md text-muted-foreground break-words">
                {features.description}
              </p>
            </ScrollAnimation>

            {features.buttons && features.buttons.length > 0 && (
              <ScrollAnimation delay={0.3}>
                <div className="flex flex-wrap items-center gap-2 justify-start">
                  {features.buttons?.map((button, idx) => (
                    <Button
                      asChild
                      key={idx}
                      variant={button.variant || "default"}
                      size={button.size || "default"}
                    >
                      <Link
                        key={idx}
                        href={button.url ?? ""}
                        target={button.target ?? "_self"}
                        className={cn(
                          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                          "h-9 px-4 py-2",
                          "shadow-sm shadow-black/15 border border-transparent bg-background ring-1 ring-foreground/10 duration-200 hover:bg-muted/50 dark:ring-foreground/15 dark:hover:bg-muted/50"
                        )}
                      >
                        {button.icon && (
                          <SmartIcon name={button.icon as string} size={24} />
                        )}
                        {button.title}
                      </Link>
                    </Button>
                  ))}
                </div>
              </ScrollAnimation>
            )}
          </div>
        </div>

        <ScrollAnimation delay={0.1}>
          {/* Prevent horizontal scrolling, min-w-0 and break-words */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6 sm:gap-6 border-t pt-12 min-w-0 break-words">
            {features.items?.map((item, idx) => (
              <div className="space-y-3 min-w-0 break-words" key={idx}>
                <div className="flex items-center gap-2 min-w-0">
                  {item.icon && (
                    <SmartIcon name={item.icon as string} size={16} />
                  )}
                  <h3 className="text-sm font-medium min-w-0 break-words">
                    {item.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm min-w-0 break-words">
                  {item.description ?? ""}
                </p>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
