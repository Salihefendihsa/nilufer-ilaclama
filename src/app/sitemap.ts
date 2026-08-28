import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data/company";
import { SERVICES } from "@/lib/data/services";
import { PESTS } from "@/lib/data/pests";
import { BLOG_POSTS } from "@/lib/data/blog-posts";

const STATIC_ROUTES = [
  "",
  "/hizmetlerimiz",
  "/hasere-rehberi",
  "/blog",
  "/paketler",
  "/sss",
  "/kurumsal",
  "/subelerimiz",
  "/iletisim",
  "/teklif",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const serviceEntries: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${SITE_URL}/hizmetlerimiz/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const pestEntries: MetadataRoute.Sitemap = PESTS.map((pest) => ({
    url: `${SITE_URL}/hasere-rehberi/${pest.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...serviceEntries, ...pestEntries, ...blogEntries];
}
