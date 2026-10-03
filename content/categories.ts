/**
 * Portfolio categories. Add, remove or rename freely — then use the `id`
 * in `category:` on each project. TypeScript will flag any typo.
 * Categories with no projects are hidden from the filter automatically.
 */
export const categories = [
  { id: "weddings", label: "Weddings" },
  { id: "pre-wedding", label: "Pre-Wedding" },
  { id: "haldi-sangeet", label: "Haldi & Sangeet" },
  { id: "engagement", label: "Engagement" },
  { id: "portraits", label: "Portraits" },
] as const;

/** Which contact-form option a category's "inquire" button pre-selects (must match site.shootTypes). */
export const inquiryTypeByCategory: Partial<Record<string, string>> = {
  weddings: "Wedding",
  "pre-wedding": "Pre-wedding shoot",
  "haldi-sangeet": "Haldi / Sangeet / Mehendi",
  engagement: "Engagement",
  portraits: "Portrait / Model shoot",
};

export const categoryLabel = (id: string) => categories.find((c) => c.id === id)?.label ?? id;
