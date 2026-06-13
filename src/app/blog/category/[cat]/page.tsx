import React from "react";
import Link from "next/link";
import Image from "next/image";
import blogsData from "@/data/blogs.json";
import BlogSidebar from "@/components/BlogSidebar";
import { User, MessageSquare, ArrowRight, Layers } from "lucide-react";

type BlogPost = (typeof blogsData)[number];

interface PageProps {
  params: Promise<{ cat: string }>;
}

export async function generateStaticParams() {
  const staticCategories = Array.from(
    new Set(blogsData.flatMap((p) => p.categories || []))
  );

  let dbCategories: { name: string; slug: string }[] = [];
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl && apiUrl.startsWith("http")) {
    try {
      const res = await fetch(`${apiUrl}/api/categories`, {
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        dbCategories = await res.json();
      }
    } catch (err) {
      console.error("Failed to fetch categories in generateStaticParams", err);
    }
  }

  const categoriesSet = new Set<string>();
  staticCategories.forEach(c => categoriesSet.add(c.toLowerCase().replace(/\s+/g, "-")));
  dbCategories.forEach(c => categoriesSet.add(c.slug.toLowerCase()));

  const paramsList = Array.from(categoriesSet).map((cat) => ({
    cat,
  }));

  console.log("=== GENERATED STATIC PARAMS FOR CATEGORY ===", paramsList);
  return paramsList;
}

export async function generateMetadata({ params }: PageProps) {
  const { cat } = await params;
  const categoryName = decodeURIComponent(cat).replace(/-/g, " ");
  const display = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  return {
    title: `${display} — Blog | SunLynk Solar`,
    description: `Browse all SunLynk Solar blog posts in the ${display} category.`,
  };
}

function PostCard({ post, cat }: { post: any; cat: string }) {
  const getImageUrl = (img: string) => {
    if (!img) return "/assets/images/blog_bifacial_panels.webp";
    if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("data:")) {
      return img;
    }
    if (img.startsWith("/uploads/") || img.startsWith("uploads/")) {
      const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const relative = img.startsWith("/") ? img : `/${img}`;
      return `${base}${relative}`;
    }
    return img;
  };

  return (
    <article className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      <div className="relative aspect-[16/9] w-full bg-gray-100 overflow-hidden">
        <Image
          src={getImageUrl(post.image)}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg flex flex-col items-center shadow-md">
          <span className="text-sm font-extrabold leading-none">{post.day || new Date(post.createdAt || post.date).getDate() || "13"}</span>
          <span className="text-[10px] uppercase leading-none mt-0.5">
            {post.month || new Date(post.createdAt || post.date).toLocaleString('default', { month: 'short' }) || "Jun"}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow text-left">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.categories.slice(0, 2).map((c: string) => (
              <Link
                key={c}
                href={`/blog/category/${encodeURIComponent(c.toLowerCase().replace(/\s+/g, "-"))}/`}
                className="inline-flex items-center gap-1 text-[10px] font-bold bg-primary/8 text-primary border border-primary/15 px-2.5 py-1 rounded-full hover:bg-primary hover:text-white transition-all"
              >
                <Layers size={9} />
                {c}
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1.5">
            <User size={12} className="text-primary" />
            <span>by {post.author}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <MessageSquare size={12} className="text-primary" />
            <span>{post.commentsCount || 0} Comments</span>
          </span>
        </div>

        <h2 className="font-extrabold text-dark text-base mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {post.title}
        </h2>

        <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-4 flex-grow">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}/`}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-3 transition-all duration-200 mt-auto"
        >
          <span>Read More</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}

export default async function CategoryPage({ params }: PageProps) {
  const { cat } = await params;

  let dynamicBlogs = [];
  let dbCategories: { _id: string; name: string; slug: string }[] = [];
  let dbTags: { _id: string; name: string; slug: string }[] = [];
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (apiUrl && apiUrl.startsWith("http")) {
    try {
      const res = await fetch(`${apiUrl}/api/blogs`, {
        next: { revalidate: 10 },
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        dynamicBlogs = await res.json();
      }
    } catch (err) {
      console.error("Failed to fetch dynamic blogs", err);
    }

    try {
      const [catsRes, tagsRes] = await Promise.allSettled([
        fetch(`${apiUrl}/api/categories`, { next: { revalidate: 10 }, signal: AbortSignal.timeout(3000) }).then(r => r.ok ? r.json() : []),
        fetch(`${apiUrl}/api/tags`, { next: { revalidate: 10 }, signal: AbortSignal.timeout(3000) }).then(r => r.ok ? r.json() : [])
      ]);
      if (catsRes.status === "fulfilled") dbCategories = catsRes.value;
      if (tagsRes.status === "fulfilled") dbTags = tagsRes.value;
    } catch (err) {
      console.error("Failed to fetch categories and tags from API", err);
    }
  }

  const dynamicSlugs = new Set(dynamicBlogs.map((b: any) => b.slug));
  const staticBlogs = blogsData.filter(b => !dynamicSlugs.has(b.slug));
  const allPosts = [...dynamicBlogs, ...staticBlogs];

  // Get categories to display in filter bar (purely from database, no fallback/dummy data)
  const displayCategories = dbCategories.map(c => ({ name: c.name, slug: c.slug }));

  // Find dynamic display name from slug or fallback
  const foundCat = displayCategories.find(c => c.slug === cat);
  const displayName = foundCat ? foundCat.name : decodeURIComponent(cat).replace(/-/g, " ");

  const filteredPosts = allPosts.filter((p) =>
    (p.categories || []).some(
      (c: string) => c.toLowerCase().replace(/\s+/g, "-") === cat.toLowerCase()
    )
  );

  return (
    <div>
      {/* Page Header */}
      <section className="relative bg-dark text-white py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: "url(/assets/images/backgrounds/page-header-bg-1-1.webp)" }}
        />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">
            Category
          </span>
          <h1 className="text-3xl md:text-5xl font-black">{displayName}</h1>
          <div className="mt-4 flex items-center gap-2 text-xs md:text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog/" className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white">{displayName}</span>
          </div>
        </div>
      </section>

      {/* Category filter bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex flex-wrap gap-2 items-center">
          <Link
            href="/blog/"
            className="text-xs font-bold px-4 py-2 rounded-full border bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary transition-all"
          >
            All Posts
          </Link>
          {displayCategories.map((c) => {
            const isActive = c.slug === cat.toLowerCase();
            return (
              <Link
                key={c.slug}
                href={`/blog/category/${c.slug}/`}
                className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                }`}
              >
                {c.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main content + Sidebar */}
      <section className="py-14 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* LEFT: Blog grid */}
            <div className="lg:col-span-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""} in &quot;{displayName}&quot;
                </span>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <p className="text-sm text-gray-400">No posts in this category yet.</p>
                  <Link href="/blog/" className="mt-4 text-sm font-bold text-primary hover:underline">
                    ← View all posts
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {filteredPosts.map((post) => (
                    <PostCard key={post.slug} post={post} cat={cat} />
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <BlogSidebar allPosts={allPosts as any} activeCategory={displayName} dbCategories={dbCategories} dbTags={dbTags} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
