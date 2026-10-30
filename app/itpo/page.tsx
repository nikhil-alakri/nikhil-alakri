import { SITE_URLS } from "@/config/urls";

export const metadata = {
  title: "ITPO Platform | Nikhil Alakri",
  description: "ITPO Platform live application.",
};

export default function ItpoLivePage() {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-white z-50">
      <iframe
        src={SITE_URLS.projects.ipo.liveApp}
        title="ITPO Platform Live Application"
        className="w-full h-full border-0 block"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </div>
  );
}
