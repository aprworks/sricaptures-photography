import { cn } from "@/lib/cn";

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  className?: string;
}

/** Title block for inner pages. Includes the offset for the fixed header. */
export function PageHeader({ eyebrow, title, intro, className }: Props) {
  return (
    <header className={cn("container-x pb-12 pt-[calc(var(--header-h)+clamp(3rem,8vw,7rem))] md:pb-20", className)}>
      <p className="eyebrow mb-6">{eyebrow}</p>
      <h1 className="display-xl max-w-[16ch]">{title}</h1>
      {intro && <div className="lede mt-8 md:mt-10">{intro}</div>}
    </header>
  );
}
