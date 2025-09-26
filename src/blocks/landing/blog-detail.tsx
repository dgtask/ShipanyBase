import { type Post as PostType } from "@/types/blocks/blog";
import { Crumb } from "@/blocks/common/crumb";
import { NavItem } from "@/types/blocks/common";
import { getTranslations } from "next-intl/server";
import { MarkdownPreview } from "@/blocks/common";

export async function BlogDetail({ post }: { post: PostType }) {
  const t = await getTranslations("blog");

  const crumbItems: NavItem[] = [
    {
      title: t("title"),
      url: "/blog",
      is_active: false,
    },
    {
      title: post.title,
      url: `/blog/${post.slug}`,
      is_active: true,
    },
  ];

  return (
    <section id={post.id}>
      <div className="py-16 md:py-32">
        <div className="w-full max-w-4xl mx-auto px-6 md:px-8">
          <Crumb items={crumbItems} />

          <div className="mt-8 ring-foreground/5 relative rounded-3xl border border-transparent p-8 shadow ring-1 sm:p-12 sm:pb-10">
            <div>
              <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
              <h2 className="sr-only">{post.description}</h2>

              <p className="text-muted-foreground text-sm mb-4">
                {post.created_at}
              </p>

              {post.content && (
                <div className="my-8 text-muted-foreground space-y-4 text-lg *:leading-relaxed">
                  <MarkdownPreview content={post.content} />
                </div>
              )}

              <div className="mt-12">
                <div className="mt-6 flex items-center gap-3 pb-2 pl-px">
                  {post.author_image && (
                    <div className="ring-foreground/10 aspect-square size-12 overflow-hidden rounded-xl border border-transparent shadow-md shadow-black/15 ring-1">
                      <img src={post.author_image} alt={post.author_name} />
                    </div>
                  )}
                  <div className="space-y-0.5 text-base *:block">
                    <span className="text-foreground font-medium">
                      {post.author_name}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {post.author_role}
                    </span>
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
