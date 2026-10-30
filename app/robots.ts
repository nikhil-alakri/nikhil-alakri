import { MetadataRoute } from "next";
import { SITE_URLS } from "@/config/urls";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_URLS.baseUrl;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

