"use client";

import dynamic from "next/dynamic";

const DynamicSceneCanvas = dynamic(
  () => import("./SceneCanvas"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default DynamicSceneCanvas;

