import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  /** Optional link shown at the right on desktop, e.g. "All work" */
  action?: { label: string; href: string };
  className?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({ eyebrow, title, action, className, as: Tag = "h2" }: Props) {
  return (
    <Reveal className={cn("flex flex-col justify-between gap-6 md:flex-row md:items-end", className)}>
      <div>
        <p className="eyebrow mb-4">{eyebrow}</p>
        <Tag className="display-lg max-w-3xl">{title}</Tag>
      </div>
      {action && (
        <Link href={action.href} className="arrow-link link-underline self-start md:self-auto">
          {action.label} <span aria-hidden className="arrow">→</span>
        </Link>
      )}
    </Reveal>
  );
}
