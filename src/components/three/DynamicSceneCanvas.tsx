
import dynamic from "@/lib/dynamic";

const DynamicSceneCanvas = dynamic(
  () => import("./SceneCanvas"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default DynamicSceneCanvas;

