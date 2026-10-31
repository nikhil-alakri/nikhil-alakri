"use client";

import dynamic from "next/dynamic";

const DynamicOrganicWorld = dynamic(
  () => import("./OrganicWorldCanvas"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default DynamicOrganicWorld;
