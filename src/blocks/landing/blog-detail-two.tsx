"use client";

import { type Post as PostType } from "@/types/blocks/blog";
import { Crumb } from "@/blocks/common/crumb";
import { NavItem } from "@/types/blocks/common";
import { type TocItem, getTocItems, MarkdownPreview } from "@/blocks/common";
import { useState, useEffect } from "react";

export function BlogDetailTwo({
  post,
  crumbTitle = "Blog",
}: {
  post: PostType;
  crumbTitle?: string;
}) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  const crumbItems: NavItem[] = [
    {
      title: crumbTitle,
      url: "/blog",
      is_active: false,
    },
    {
      title: post.title || "",
      url: `/blog/${post.slug}`,
      is_active: true,
    },
  ];

  useEffect(() => {
    if (post.content) {
      const toc = getTocItems(post.content);
      setTocItems(toc);
    }
  }, [post.content]);

  useEffect(() => {
    const handleScroll = () => {
      const headings = tocItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        if (heading && heading.getBoundingClientRect().top <= 100) {
          setActiveId(heading.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Update URL hash
      window.history.pushState(null, "", `#${id}`);

      // Calculate offset to account for fixed header
      const header =
        document.querySelector("header") || document.querySelector("nav");
      const headerOffset = header ? header.offsetHeight + 96 : 150;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id={post.id}>
      <div className="py-16 md:py-32">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <Crumb items={crumbItems} />

          {/* Header Section */}
          <div className="mt-16 text-center">
            <h1 className="text-4xl md:text-5xl w-full md:max-w-4xl mx-auto font-bold mb-4 text-foreground">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm mb-8">
              {post.author_name && <span>By {post.author_name}</span>}
              {post.created_at && <span>{post.created_at}</span>}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Table of Contents - Left Sidebar */}
            <div className="lg:col-span-3">
              <div className="sticky top-24 hidden md:block">
                <div className="bg-muted/30 rounded-lg">
                  <h2 className="font-semibold text-foreground px-6 pt-4">
                    Table of Contents
                  </h2>
                  {tocItems.length > 0 ? (
                    <nav className="space-y-2 p-4">
                      {tocItems.map((item) => (
                        <li
                          key={item.id}
                          onClick={() => scrollToHeading(item.id)}
                          className={`rounded-md line-clamp-1 py-1 block w-full text-left text-sm cursor-pointer transition-colors ${
                            activeId === item.id
                              ? "bg-primary text-primary-foreground font-medium"
                              : "hover:bg-muted hover:text-muted-foreground  text-muted-foreground"
                          }`}
                          style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                        >
                          {item.text}
                        </li>
                      ))}
                    </nav>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No headings found
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content - Center */}
            <div className="lg:col-span-6">
              <article className="p-0">
                {post.content && (
                  <div className="prose prose-lg max-w-none text-muted-foreground space-y-6 *:leading-relaxed">
                    <MarkdownPreview content={post.content} />
                  </div>
                )}
              </article>
            </div>

            {/* Author Info - Right Sidebar */}
            <div className="lg:col-span-3">
              <div className="sticky top-24">
                <div className="bg-muted/30 rounded-lg p-6">
                  <div className="text-center">
                    {post.author_image && (
                      <div className="ring-foreground/10 aspect-square size-20 mx-auto mb-4 overflow-hidden rounded-xl border border-transparent shadow-md shadow-black/15 ring-1">
                        <img
                          src={post.author_image}
                          alt={post.author_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <p className="font-semibold text-foreground text-lg mb-1">
                      {post.author_name}
                    </p>
                    <p className="text-muted-foreground text-sm mb-4">
                      {post.author_role}
                    </p>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
