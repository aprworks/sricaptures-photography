import { site } from "@/content/site";

/** Reminder shown while `site.placeholderMode` is true. Set it to false in content/site.ts to remove. */
export function PlaceholderNotice() {
  if (!site.placeholderMode) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-3 right-3 z-[60] rounded-sm bg-[#ffd84d] px-3 py-1.5 text-[0.65rem] font-semibold uppercase leading-tight tracking-wider text-black shadow-lg"
    >
      Placeholder content<span className="hidden sm:inline"> — edit /content, then set placeholderMode=false</span>
    </div>
  );
}
