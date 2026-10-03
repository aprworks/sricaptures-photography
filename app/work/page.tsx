import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ProjectGrid } from "@/components/ProjectGrid";
import { site } from "@/content/site";
import { allProjects, usedCategories } from "@/lib/projects";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Portfolio",
  description: `Wedding, pre-wedding, haldi, sangeet and engagement stories photographed by ${site.name} in ${site.location.city} and beyond.`,
  path: "/work",
  image: allProjects[0]?.coverImage,
});

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Portfolio — ${allProjects.length} projects`}
        title={<>Selected <em>work.</em></>}
        intro="Weddings, pre-wedding shoots and celebrations. Each one is a small photo story — open it to see more."
      />
      <ProjectGrid projects={allProjects} categories={usedCategories.map((c) => ({ id: c.id, label: c.label }))} />
      <div className="mt-24 md:mt-40">
        <CTASection location="work-final" heading={<>Have a story <em>to tell?</em></>} primaryLabel="Check availability" />
      </div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/work" }])} />
    </>
  );
}
