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
  const allCategories = Array.from(
    new Set(blogsData.flatMap((p) => p.categories || []))
  );
  return allCategories.map((cat) => ({
    cat: cat.toLowerCase().replace(/\s+/g, "-"),
  }));
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

function PostCard({ post, cat }: { post: BlogPost; cat: string }) {
  return (
    <article className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      <div className="relative aspect-[16/9] w-full bg-gray-100 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg flex flex-col items-center shadow-md">
          <span className="text-sm font-extrabold leading-none">{post.day}</span>
          <span className="text-[10px] uppercase leading-none mt-0.5">{post.month}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow text-left">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.categories.slice(0, 2).map((c) => (
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
            <span>{post.commentsCount} Comments</span>
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

  const allCategories = Array.from(
    new Set(blogsData.flatMap((p) => p.categories || []))
  );

  // Find display name from slug
  const displayName =
    allCategories.find(
      (c) => c.toLowerCase().replace(/\s+/g, "-") === cat
    ) ?? decodeURIComponent(cat).replace(/-/g, " ");

  const filteredPosts = blogsData.filter((p) =>
    (p.categories || []).some(
      (c) => c.toLowerCase().replace(/\s+/g, "-") === cat
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
          {allCategories.map((c) => (
            <Link
              key={c}
              href={`/blog/category/${encodeURIComponent(c.toLowerCase().replace(/\s+/g, "-"))}/`}
              className={`text-xs font-bold px-4 py-2 rounded-full border transition-all ${
                c.toLowerCase().replace(/\s+/g, "-") === cat
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </Link>
          ))}
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
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <p className="text-sm text-gray-400">No posts in this category yet.</p>
                  <Link href="/blog/" className="mt-4 text-sm font-bold text-primary hover:underline">
                    ← View all posts
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} cat={cat} />
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <BlogSidebar allPosts={blogsData} activeCategory={displayName} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
