import type { MetadataRoute } from "next";
import blogsData from "@/data/blogs.json";
import productsData from "@/data/products.json";
import solutionsData from "@/data/solutions.json";

const BASE_URL = "https://www.sunlynksolar.com";

// Helper function to safely fetch dynamic blogs from API with timeout
async function fetchDynamicBlogs(): Promise<any[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl || !apiUrl.startsWith("http")) {
    return [];
  }
  try {
    const res = await fetch(`${apiUrl}/api/blogs`, {
      signal: AbortSignal.timeout(3000), // 3-second timeout
      next: { revalidate: 3600 }, // cache for 1 hour
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error("Failed to fetch dynamic blogs for sitemap:", err);
  }
  return [];
}

// Helper to safely parse dates
function parseDate(dateStr?: string): Date {
  if (!dateStr) return new Date();
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date() : d;
}

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Define static routes (ending with trailing slash to match config)
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/about/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/cancellation-refund/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/careers/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/faqs/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/terms/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/services/calibration/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/solutions/housing-societies/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/solutions/homes/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/solutions/commercial/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/support/inverter-downloads/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/support/warranty/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/support/wms-downloads/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog/`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
  ];

  // 2. Fetch blogs (static JSON + dynamic API)
  const dynamicBlogs = await fetchDynamicBlogs();
  const allBlogsMap = new Map<string, { slug: string; date?: string }>();
  
  // Load static blogs
  blogsData.forEach((blog) => {
    allBlogsMap.set(blog.slug, { slug: blog.slug, date: blog.date });
  });
  
  // Load dynamic blogs (overwrite/complement static list)
  dynamicBlogs.forEach((blog: any) => {
    if (blog && blog.slug) {
      allBlogsMap.set(blog.slug, { slug: blog.slug, date: blog.createdAt || blog.date });
    }
  });

  const blogRoutes: MetadataRoute.Sitemap = Array.from(allBlogsMap.values()).map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}/`,
    lastModified: parseDate(blog.date),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // 3. Compile unique blog categories
  const categoriesSet = new Set<string>();
  blogsData.forEach((blog) => {
    (blog.categories || []).forEach((cat) => {
      categoriesSet.add(cat.toLowerCase().replace(/\s+/g, "-"));
    });
  });
  dynamicBlogs.forEach((blog: any) => {
    (blog.categories || []).forEach((cat: string) => {
      categoriesSet.add(cat.toLowerCase().replace(/\s+/g, "-"));
    });
  });

  const categoryRoutes: MetadataRoute.Sitemap = Array.from(categoriesSet).map((cat) => ({
    url: `${BASE_URL}/blog/category/${encodeURIComponent(cat)}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  // 4. Load products
  const productRoutes: MetadataRoute.Sitemap = productsData.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 5. Load solutions
  const solutionRoutes: MetadataRoute.Sitemap = solutionsData.map((solution) => ({
    url: `${BASE_URL}/solutions/${solution.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Combine and return all routes
  return [
    ...staticRoutes,
    ...blogRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...solutionRoutes,
  ];
}
