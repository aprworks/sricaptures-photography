import { PageTransition } from "@/components/PageTransition";

// Unlike layout.tsx, a template re-mounts on every navigation → the page transition replays.
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
