"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import blogsData from "@/data/blogs.json";
import BlogSidebar from "@/components/BlogSidebar";
import { User, MessageSquare, ArrowRight, Tag, Layers } from "lucide-react";

function PostCard({ post }: { post: any }) {
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
      {/* Image */}
      <div className="relative aspect-[16/9] w-full bg-gray-100 overflow-hidden">
        <Image
          src={getImageUrl(post.image)}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Date badge */}
        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg flex flex-col items-center shadow-md">
          <span className="text-sm font-extrabold leading-none">{post.day || new Date(post.createdAt || post.date).getDate() || "13"}</span>
          <span className="text-[10px] uppercase leading-none mt-0.5">
            {post.month || new Date(post.createdAt || post.date).toLocaleString('default', { month: 'short' }) || "Jun"}
          </span>
        </div>
        {/* Template badge */}
        {post.template && (
          <div className="absolute top-4 right-4 bg-dark/70 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
            {post.template}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow text-left">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.categories.slice(0, 2).map((cat: string) => (
              <Link
                key={cat}
                href={`/blog/category/${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, "-"))}/`}
                className="inline-flex items-center gap-1 text-[10px] font-bold bg-primary/8 text-primary border border-primary/15 px-2.5 py-1 rounded-full hover:bg-primary hover:text-white transition-all"
              >
                <Layers size={9} />
                {cat}
              </Link>
            ))}
          </div>
        )}

        {/* Meta */}
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

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-gray-400"
              >
                <Tag size={8} />
                {tag}
              </span>
            ))}
          </div>
        )}

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

function BlogListContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");

  const [dynamicBlogs, setDynamicBlogs] = useState<any[]>([]);
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [dbTags, setDbTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl || !apiUrl.startsWith("http")) {
        setLoading(false);
        return;
      }
      try {
        const [blogsRes, catsRes, tagsRes] = await Promise.allSettled([
          fetch(`${apiUrl}/api/blogs`).then(r => r.ok ? r.json() : []),
          fetch(`${apiUrl}/api/categories`).then(r => r.ok ? r.json() : []),
          fetch(`${apiUrl}/api/tags`).then(r => r.ok ? r.json() : [])
        ]);

        if (blogsRes.status === "fulfilled") setDynamicBlogs(blogsRes.value);
        if (catsRes.status === "fulfilled") setDbCategories(catsRes.value);
        if (tagsRes.status === "fulfilled") setDbTags(tagsRes.value);
      } catch (err) {
        console.error("Error fetching blog list data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  const dynamicSlugs = new Set(dynamicBlogs.map((b: any) => b.slug));
  const staticBlogs = blogsData.filter(b => !dynamicSlugs.has(b.slug));
  const allPosts = [...dynamicBlogs, ...staticBlogs];

  // Map database categories & tags to display layout (purely from database, no fallback/dummy data)
  const displayCategories = dbCategories.map(c => ({ name: c.name, slug: c.slug }));
  const displayTags = dbTags.map(t => ({ name: t.name, slug: t.slug }));

  // Perform dynamic filtering based on category or tag
  let filteredPosts = [...allPosts];
  if (category) {
    filteredPosts = filteredPosts.filter((p) =>
      (p.categories || []).some(
        (c: string) => c.toLowerCase().replace(/\s+/g, "-") === category.toLowerCase()
      )
    );
  }
  if (tag) {
    filteredPosts = filteredPosts.filter((p) =>
      (p.tags || []).some(
        (t: string) => t.toLowerCase().replace(/\s+/g, "-") === tag.toLowerCase()
      )
    );
  }

  // Get active tag display name
  const activeTagName = tag ? (displayTags.find(t => t.slug === tag.toLowerCase())?.name || tag) : "";

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
            News &amp; Articles
          </span>
          <h1 className="text-3xl md:text-5xl font-black">Blog</h1>
          <div className="mt-4 flex items-center gap-2 text-xs md:text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Blog</span>
          </div>
        </div>
      </section>

      {/* Category filter bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex flex-wrap gap-2 items-center">
          <Link
            href="/blog/"
            className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${
              !category && !tag
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
            }`}
          >
            All Posts
          </Link>
          {displayCategories.map((cat) => {
            const isActive = category?.toLowerCase() === cat.slug;
            return (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}/`}
                className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main content + Sidebar */}
      <section className="py-14 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* LEFT: Blog post grid */}
            <div className="lg:col-span-8">
              {/* Active tag banner indicator */}
              {tag && (
                <div className="mb-6 bg-primary/5 border border-primary/20 rounded-xl p-4 flex justify-between items-center text-left">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Tag size={16} className="text-primary" />
                    <span>
                      Showing posts tagged with: <strong className="text-primary font-bold">#{activeTagName}</strong>
                    </span>
                  </div>
                  <Link
                    href="/blog/"
                    className="text-xs font-bold text-gray-400 hover:text-primary transition-colors border border-gray-200 rounded-lg px-2.5 py-1 bg-white hover:border-primary"
                  >
                    Clear Filter
                  </Link>
                </div>
              )}

              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
                </span>
              </div>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="mt-4 text-sm text-gray-400">Loading posts...</p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <p className="text-sm text-gray-400">No blog posts found matching your selection.</p>
                  <Link href="/blog/" className="mt-4 text-sm font-bold text-primary hover:underline">
                    ← View all posts
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {filteredPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Sidebar */}
            <div className="lg:col-span-4">
              <BlogSidebar allPosts={allPosts as any} activeTag={tag || undefined} dbCategories={dbCategories} dbTags={dbTags} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-sm text-gray-400">Loading Blog...</p>
      </div>
    }>
      <BlogListContent />
    </Suspense>
  );
}
