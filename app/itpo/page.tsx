import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { SITE_URLS } from "@/config/urls";

export const metadata = {
  title: "ITPO Platform | Nikhil Alakri",
  description: "ITPO Platform live application.",
};

export default function ItpoLivePage() {
  const liveUrl = (SITE_URLS.projects.ipo.liveApp || "") as string;
  const isAvailable = Boolean(liveUrl && liveUrl.startsWith("http"));

  if (!isAvailable) {
    return (
      <div className="fixed inset-0 w-screen h-screen bg-background flex flex-col items-center justify-center p-6 text-center z-50">
        <div className="p-4 rounded-2xl bg-surface border border-surface-border text-accent mb-6">
          <Clock className="w-10 h-10" />
        </div>
        <h1 className="font-primary text-3xl sm:text-4xl font-bold text-headline mb-3">
          Platform Preview in Progress
        </h1>
        <p className="text-bodytext text-sm sm:text-base max-w-md mb-8">
          This live platform preview is temporarily private while architecture updates and security audits are being completed.
        </p>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-background font-semibold hover:bg-accent transition-all text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-white z-50">
      <iframe
        src={liveUrl}
        title="ITPO Platform Live Application"
        className="w-full h-full border-0 block"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </div>
  );
}
