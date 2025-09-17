import React from "react";
import { MdOutlineHome } from "react-icons/md";
import { defaultMetadata } from "@/lib/seo";

export const generateMetadata = defaultMetadata;

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <a
        className="text-base-content cursor-pointer hover:opacity-80 transition-opacity"
        href="/"
      >
        <MdOutlineHome className="text-2xl mx-8 my-8" />
      </a>
      <section className="bg-background">
        <div className="bg-muted/25">
          <div className="max-w-full md:max-w-4xl mx-auto px:4 md:px-8 pb-16">
            <div className="bg-background ring-foreground/5 relative mx-auto rounded-3xl border border-transparent p-8 shadow ring-1 sm:p-12 sm:pb-10">
              <div>
                <div className="text-muted-foreground space-y-4 text-lg *:leading-relaxed">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
