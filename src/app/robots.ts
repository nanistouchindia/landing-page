import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
    ],
    sitemap: "https://www.nanistouch.in/sitemap.xml",
    host: "https://www.nanistouch.in",
  };
}
