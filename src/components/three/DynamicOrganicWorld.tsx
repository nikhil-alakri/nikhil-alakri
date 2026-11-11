
import dynamic from "@/lib/dynamic";

const DynamicOrganicWorld = dynamic(
  () => import("./OrganicWorldCanvas"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default DynamicOrganicWorld;

