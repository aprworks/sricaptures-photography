import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export default function NotFound() {
  return (
    <div className="pb-32">
      <PageHeader
        eyebrow="404"
        title={<>This frame <em>is missing.</em></>}
        intro="The page you were looking for doesn’t exist or has moved. Let’s get you back to the work."
      />
      <div className="container-x flex flex-wrap gap-3">
        <Link href="/" className="btn btn-solid">Back home</Link>
        <Link href="/work" className="btn btn-outline">View work</Link>
      </div>
    </div>
  );
}
