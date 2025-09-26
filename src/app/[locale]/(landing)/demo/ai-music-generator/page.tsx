import { PageHeader } from "@/blocks/common";
import { CTA, FAQ } from "@/blocks/landing";
import { MusicGenerator } from "@/blocks/generator";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getMetadata } from "@/lib/seo";

export const generateMetadata = getMetadata({
  metadataKey: "demo.ai-music-generator.metadata",
  canonicalUrl: "/demo/ai-music-generator",
});

export default async function GeneratePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("landing");
  const tt = await getTranslations("demo.ai-music-generator");

  return (
    <>
      <PageHeader
        title={tt.raw("title")}
        description={tt.raw("description")}
        className="-mb-32 mt-16"
      />
      <MusicGenerator srOnlyTitle={tt.raw("h1-title")} />
      <FAQ faq={t.raw("faq")} />
      <CTA cta={t.raw("cta")} className="bg-muted" />
    </>
  );
}
