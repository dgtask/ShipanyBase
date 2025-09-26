"use client";

import { Link } from "@/core/i18n/navigation";
import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useMedia } from "@/hooks/use-media";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { type Header as HeaderType } from "@/types/blocks/landing";
import { NavItem } from "@/types/blocks/common";
import { SmartIcon } from "@/blocks/common/smart-icon";
import Image from "next/image";
import { SignUser } from "@/blocks/sign/sign-user";
import { BrandLogo, LocaleSelector, ThemeToggler } from "@/blocks/common";

export function HeaderOne({
  header,
  className,
}: {
  header: HeaderType;
  className?: string;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLarge = useMedia("(min-width: 64rem)");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 75);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const MobileMenu = ({ closeMenu }: { closeMenu: () => void }) => {
    return (
      <nav
        role="navigation"
        className="w-full [--color-border:--alpha(var(--color-foreground)/5%)] [--color-muted:--alpha(var(--color-foreground)/5%)]"
      >
        <Accordion
          type="single"
          collapsible
          className="**:hover:no-underline -mx-4 mt-0.5 space-y-0.5"
        >
          {header.nav?.items?.map((item: NavItem, index) => {
            if (item.children && item.children.length > 0) {
              return (
                <AccordionItem
                  key={index}
                  value={item.title || ""}
                  className="before:border-border group relative border-b-0 before:pointer-events-none before:absolute before:inset-x-4 before:bottom-0 before:border-b"
                >
                  <AccordionTrigger className="**:!font-normal data-[state=open]:bg-muted flex items-center justify-between px-4 py-3 text-lg">
                    {item.title || ""}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <ul>
                      {item.children.map((subItem: NavItem, featureIndex) => (
                        <li key={featureIndex}>
                          <Link
                            href={subItem.url || ""}
                            target={subItem.target || "_self"}
                            onClick={closeMenu}
                            className="grid grid-cols-[auto_1fr] items-center gap-2.5 px-4 py-2"
                          >
                            <div
                              aria-hidden
                              className="flex items-center justify-center *:size-4"
                            >
                              {subItem.icon && (
                                <SmartIcon name={subItem.icon as string} />
                              )}
                            </div>
                            <div className="text-base">
                              {subItem.title || ""}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            }
            return null;
          })}
        </Accordion>
        {header.nav?.items?.map((item: NavItem, index) => {
          return (
            <Link
              key={index}
              href={item.url || ""}
              onClick={closeMenu}
              className="group relative block border-0 border-b py-4 text-lg"
            >
              {item.title || ""}
            </Link>
          );
        })}
      </nav>
    );
  };

  const NavMenu = () => {
    return (
      <NavigationMenu className="**:data-[slot=navigation-menu-viewport]:left-8 **:data-[slot=navigation-menu-viewport]:top-3 max-lg:hidden">
        <NavigationMenuList className="gap-3">
          {header.nav?.items?.map((item: NavItem) => {
            return (
              <NavigationMenuItem key={item.title || ""}>
                {item.children && item.children.length > 0 ? (
                  <NavigationMenuTrigger>
                    <SmartIcon
                      name={item.icon as string}
                      className="w-4 h-4 mr-2"
                    />
                    {item.title}
                  </NavigationMenuTrigger>
                ) : (
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle({
                      className: "text-foreground/75 h-7 px-3 text-sm",
                    })}
                  >
                    <Link
                      href={item.url || ""}
                      target={item.target || "_self"}
                      className=""
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                )}
                {item.children && item.children.length > 0 && (
                  <NavigationMenuContent className="p-0.5">
                    <div className="w-80 pr-[1.5px]">
                      <div className="bg-card ring-foreground/5 rounded-[calc(var(--radius)-2px)] border border-transparent p-2 shadow ring-1">
                        <ul className="mt-1 space-y-2">
                          {item.children.map((subItem: NavItem, index) => (
                            <ListItem
                              key={index}
                              href={subItem.url || ""}
                              title={subItem.title || ""}
                              description={subItem.description || ""}
                            >
                              {subItem.icon && (
                                <SmartIcon name={subItem.icon as string} />
                              )}
                            </ListItem>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                )}
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    );
  };

  function ListItem({
    title,
    description,
    children,
    href,
    ...props
  }: React.ComponentPropsWithoutRef<"li"> & {
    href: string;
    title: string;
    description?: string;
  }) {
    return (
      <li {...props}>
        <NavigationMenuLink asChild>
          <Link href={href} className="grid grid-cols-[auto_1fr] gap-3.5">
            <div className="bg-background ring-foreground/10 before:mask-y-from-80% after:mask-x-from-80% before:border-foreground/[0.075] after:border-foreground/[0.075] relative flex size-10 items-center justify-center rounded border border-transparent shadow shadow-sm ring-1 before:absolute before:-inset-x-1 before:-inset-y-3 before:border-x before:border-dashed after:absolute after:-inset-x-3 after:-inset-y-1 after:border-y after:border-dashed">
              {children}
            </div>
            <div className="space-y-0.5">
              <div className="text-foreground text-sm font-medium">{title}</div>
              {description && (
                <p className="text-muted-foreground line-clamp-1 text-xs">
                  {description}
                </p>
              )}
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }

  return (
    <>
      <header
        role="banner"
        data-theme="dark"
        {...(isScrolled && { "data-scrolled": true })}
        data-state={isMobileMenuOpen ? "active" : "inactive"}
        className={cn(
          "bg-background [--color-popover:color-mix(in_oklch,var(--color-muted)_25%,var(--color-background))]",
          className
        )}
      >
        <div
          className={cn(
            "relative",
            "not-in-data-scrolled:has-data-[state=open]:[--viewport-translate:-4rem]",
            !isLarge &&
              "in-data-scrolled:border-b in-data-scrolled:border-foreground/5 in-data-scrolled:backdrop-blur in-data-scrolled:bg-card/50 fixed inset-x-0 top-0 z-50 h-16 overflow-hidden",
            "max-lg:in-data-[state=active]:bg-card/50 max-lg:in-data-[state=active]:h-screen max-lg:in-data-[state=active]:backdrop-blur"
          )}
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-lg:not-in-data-[state=active]:h-16 relative flex flex-wrap items-center justify-between py-1.5 lg:py-5 lg:z-[60]">
              <div className="max-lg:in-data-[state=active]:border-foreground/5 max-lg:in-data-[state=active]:border-b flex items-center justify-between gap-8 max-lg:h-14 max-lg:w-full lg:relative lg:z-10">
                {header.brand && <BrandLogo brand={header.brand} />}

                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={
                    isMobileMenuOpen == true ? "Close Menu" : "Open Menu"
                  }
                  className="relative z-20 -m-2.5 -mr-3 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-5 duration-200" />
                  <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-5 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>

              {isLarge && (
                <motion.div
                  animate={{ width: "fit-content", gap: 8 }}
                  className="bg-popover/50 ring-background inset-shadow-sm inset-shadow-white/[0.02] border-foreground/5 fixed left-1/2 top-4 z-50 -translate-x-1/2 size-fit max-w-xl rounded-xl border p-1.5 shadow-xl shadow-black/25 ring-1 backdrop-blur-xl"
                >
                  <div className="flex items-center">
                    <AnimatePresence>
                      {isScrolled && (
                        <motion.div
                          key="logo"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "3rem" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="before:bg-foreground/10 before:border-background/75 relative before:absolute before:inset-y-1 before:right-2 before:w-0.5 before:rounded before:border-r"
                        >
                          <Link
                            href={header.brand?.url || "/"}
                            aria-label="home"
                            className="hover:bg-foreground/5 flex size-7 rounded-md"
                          >
                            <Image
                              src={header.brand?.logo?.src || "/logo.png"}
                              alt={
                                header.brand?.logo?.alt ||
                                header.brand?.title ||
                                ""
                              }
                              width={100}
                              height={100}
                              className="m-auto size-6"
                            />
                          </Link>
                        </motion.div>
                      )}
                      {header.nav && <NavMenu />}
                      {isScrolled && (
                        <motion.div
                          key="sign-in-button"
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mx-4">
                            <SignUser isScrolled={!isScrolled} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
              {!isLarge && isMobileMenuOpen && (
                <MobileMenu closeMenu={() => setIsMobileMenuOpen(false)} />
              )}

              <div className="max-lg:in-data-[state=active]:mt-6 max-lg:in-data-[state=active]:flex mb-6 max-lg:hidden w-full flex-wrap items-center justify-end space-y-8 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent lg:relative lg:z-10">
                <div className="flex w-full flex-row items-center gap-6 md:w-fit">
                  <SignUser isScrolled={isScrolled} signButtonSize="lg" />
                  <ThemeToggler />
                  <LocaleSelector />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
