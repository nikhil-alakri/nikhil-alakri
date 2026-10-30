import { MetadataRoute } from "next";
import { SITE_URLS } from "@/config/urls";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URLS.baseUrl;
  const currentDate = new Date();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}${SITE_URLS.projects.ipo.route}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}${SITE_URLS.projects.odinEye.route}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}${SITE_URLS.projects.projectOne.route}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}

