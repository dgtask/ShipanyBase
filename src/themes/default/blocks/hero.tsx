"use client";

import React from "react";
import { Link } from "@/core/i18n/navigation";
import { Button } from "@/shared/components/ui/button";
import { SmartIcon } from "@/shared/blocks/common/smart-icon";
import Image from "next/image";
import { SocialAvatars } from "@/shared/blocks/common";
import { Hero as HeroType } from "@/shared/types/blocks/landing";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedGridPattern } from "@/shared/components/ui/animated-grid-pattern";
import { cn } from "@/shared/lib/utils";
import { Highlighter } from "@/shared/components/ui/highlighter";

// Create animation configuration function
const createFadeInVariant = (delay: number) => ({
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  transition: {
    duration: 0.6,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

export function Hero({
  hero,
  className,
}: {
  hero: HeroType;
  className?: string;
}) {
  const highlightText = hero.highlight_text ?? "";
  let texts = null;
  if (highlightText) {
    texts = hero.title?.split(highlightText, 2);
  }

  return (
    <>
      <section
        id={hero.id}
        className={`pt-24 pb-8 md:pt-36 md:pb-8 ${hero.className} ${className}`}
      >
        {/* Announcement - Element 1 */}
        {hero.announcement && (
          <motion.div {...createFadeInVariant(0)}>
            <Link
              href={hero.announcement.url || ""}
              target={hero.announcement.target || "_self"}
              className="mb-8 hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
            >
              <span className="text-foreground text-sm">
                {hero.announcement.title}
              </span>
              <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

              <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                  <span className="flex size-6">
                    <ArrowRight className="m-auto size-3" />
                  </span>
                  <span className="flex size-6">
                    <ArrowRight className="m-auto size-3" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        <div className="relative mx-auto max-w-5xl text-center">
          {/* Title - Element 2 */}
          <motion.div {...createFadeInVariant(0.15)}>
            {texts && texts.length > 0 ? (
              <h1 className="text-foreground text-balance text-5xl font-semibold sm:mt-12 sm:text-7xl">
                {texts[0]}
                <Highlighter action="underline" color="#FF9800">
                  {highlightText}
                </Highlighter>
                {texts[1]}
              </h1>
            ) : (
              <h1 className="text-foreground text-balance text-5xl font-semibold sm:mt-12 sm:text-7xl">
                {hero.title}
              </h1>
            )}
          </motion.div>

          {/* Description - Element 3 */}
          <motion.p
            {...createFadeInVariant(0.3)}
            className="text-muted-foreground mb-8 mt-8 text-balance text-lg"
            dangerouslySetInnerHTML={{ __html: hero.description ?? "" }}
          />

          {/* Button Group - Element 4 */}
          {hero.buttons && (
            <motion.div
              {...createFadeInVariant(0.45)}
              className="flex items-center justify-center gap-4"
            >
              {hero.buttons.map((button, idx) => (
                <Button
                  asChild
                  size={button.size || "default"}
                  variant={button.variant || "default"}
                  className="px-4 text-sm"
                  key={idx}
                >
                  <Link
                    href={button.url ?? ""}
                    target={button.target ?? "_self"}
                  >
                    {button.icon && <SmartIcon name={button.icon as string} />}
                    <span>{button.title}</span>
                  </Link>
                </Button>
              ))}
            </motion.div>
          )}

          {/* Hint Text - Element 5 */}
          {hero.tip && (
            <motion.p
              {...createFadeInVariant(0.6)}
              className="text-muted-foreground mt-6 block text-center text-sm"
              dangerouslySetInnerHTML={{ __html: hero.tip ?? "" }}
            />
          )}

          {/* Social Avatars - Element 6 */}
          {hero.show_avatars && (
            <motion.div {...createFadeInVariant(0.75)}>
              <SocialAvatars num={999} />
            </motion.div>
          )}
        </div>
      </section>
      {/* Image - Element 7 */}
      {hero.image && (
        <motion.section
          className="border-foreground/10 relative mt-8 border-y sm:mt-16"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.9,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
        >
          <div className="relative z-10 mx-auto max-w-6xl border-x px-3">
            <div className="border-x">
              <div
                aria-hidden
                className="h-3 w-full bg-[repeating-linear-gradient(-45deg,var(--color-foreground),var(--color-foreground)_1px,transparent_1px,transparent_4px)] opacity-5"
              />
              <Image
                className="z-2 border-border/25 relative hidden rounded-2xl border dark:block"
                src={hero.image_invert?.src || hero.image?.src || ""}
                alt="app screen"
                width={2796}
                height={2008}
              />
              <Image
                className="z-2 border-border/25 relative rounded-2xl border dark:hidden"
                src={hero.image?.src || hero.image_invert?.src || ""}
                alt="app screen"
                width={2796}
                height={2008}
              />
            </div>
          </div>
        </motion.section>
      )}

      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    </>
  );
}
