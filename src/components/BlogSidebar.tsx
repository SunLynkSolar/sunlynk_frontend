"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Hash, Clock } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  day: string;
  month: string;
  image: string;
  categories: string[];
  tags: string[];
  commentsCount: number;
}

interface RelatedPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  image: string;
}

interface BlogSidebarProps {
  allPosts: BlogPost[];
  currentSlug?: string;
  relatedPosts?: RelatedPost[];
  activeCategory?: string;
  activeTag?: string;
  dbCategories?: { name: string; slug: string }[];
  dbTags?: { name: string; slug: string }[];
}

function getCategoryCounts(posts: BlogPost[]): Record<string, number> {
  const counts: Record<string, number> = {};
  posts.forEach((p) => {
    (p.categories || []).forEach((cat) => {
      counts[cat] = (counts[cat] || 0) + 1;
    });
  });
  return counts;
}

export default function BlogSidebar({
  allPosts,
  currentSlug,
  relatedPosts,
  activeCategory,
  activeTag,
  dbCategories,
  dbTags,
}: BlogSidebarProps) {
  const recentPosts = allPosts
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 5);
  const rawCategoryCounts = getCategoryCounts(allPosts);
  const categoryCounts: Record<string, number> = {};
  if (dbCategories) {
    dbCategories.forEach((cat) => {
      const matchedKey = Object.keys(rawCategoryCounts).find(
        (key) => key.toLowerCase() === cat.name.toLowerCase()
      );
      categoryCounts[cat.name] = matchedKey ? rawCategoryCounts[matchedKey] : 0;
    });
  }
  const allTags = dbTags ? dbTags.map((t) => t.name) : [];

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
    <aside className="flex flex-col gap-6">
      {/* Recent Posts */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h4 className="font-extrabold text-dark text-sm mb-5 uppercase tracking-widest flex items-center gap-2">
          <Clock size={14} className="text-primary" />
          Recent Posts
        </h4>
        <ul className="flex flex-col gap-4">
          {recentPosts.length === 0 && (
            <li className="text-xs text-gray-400 text-center py-4">
              No recent posts.
            </li>
          )}
          {recentPosts.map((rp) => (
            <li key={rp.slug} className="flex gap-3 items-center group">
              <div className="relative w-16 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                <Image
                  src={getImageUrl(rp.image)}
                  alt={rp.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 text-left min-w-0">
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider block">
                  {rp.date}
                </span>
                <Link
                  href={`/blog/${rp.slug}`}
                  className="text-xs font-bold text-gray-700 hover:text-primary transition-colors line-clamp-2 mt-0.5 block"
                >
                  {rp.title}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h4 className="font-extrabold text-dark text-sm mb-5 uppercase tracking-widest flex items-center gap-2">
          <ChevronRight size={14} className="text-primary" />
          Categories
        </h4>
        <ul className="flex flex-col gap-1">
          {Object.entries(categoryCounts).map(([cat, count]) => (
            <li key={cat}>
              <Link
                href={`/blog/category/${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, "-"))}/`}
                className={`flex justify-between items-center text-xs font-semibold py-2.5 px-3 rounded-lg transition-all group ${activeCategory?.toLowerCase() === cat.toLowerCase()
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                  }`}
              >
                <span className="flex items-center gap-2">
                  <ChevronRight
                    size={12}
                    className={`transition-transform group-hover:translate-x-0.5 ${activeCategory?.toLowerCase() === cat.toLowerCase()
                      ? "text-white"
                      : "text-primary"
                      }`}
                  />
                  {cat}
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeCategory?.toLowerCase() === cat.toLowerCase()
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                    }`}
                >
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tags Cloud */}
      {allTags.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h4 className="font-extrabold text-dark text-sm mb-5 uppercase tracking-widest flex items-center gap-2">
            <Hash size={14} className="text-primary" />
            Tags
          </h4>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const tagSlug = tag.toLowerCase().replace(/\s+/g, "-");
              const isSelected = activeTag?.toLowerCase() === tagSlug;
              return (
                <Link
                  key={tag}
                  href={isSelected ? "/blog/" : `/blog?tag=${encodeURIComponent(tagSlug)}`}
                  className={`inline-flex items-center gap-1 text-[11px] font-bold border px-3 py-1.5 rounded-full transition-all ${
                    isSelected
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-primary/8 text-primary border-primary/15 hover:bg-primary hover:text-white"
                  }`}
                >
                  <Hash size={9} />
                  {tag}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h4 className="font-extrabold text-dark text-sm mb-5 uppercase tracking-widest">
            Related Posts
          </h4>
          <ul className="flex flex-col gap-4">
            {relatedPosts.map((rp) => (
              <li key={rp.slug} className="flex gap-3 items-center group">
                <div className="relative w-16 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={getImageUrl(rp.image)}
                    alt={rp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wider block">
                    {rp.date}
                  </span>
                  <Link
                    href={`/blog/${rp.slug}/`}
                    className="text-xs font-bold text-gray-700 hover:text-primary transition-colors line-clamp-2 mt-0.5 block"
                  >
                    {rp.title}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 shadow-md text-white">
        <h4 className="font-extrabold text-base mb-2">Stay Updated</h4>
        <p className="text-xs text-white/80 mb-4 leading-relaxed">
          Get the latest solar energy insights, tech updates, and industry news from SunLynk.
        </p>
        <Link
          href="/#contact"
          className="inline-block bg-white text-primary font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-white/90 transition-colors"
        >
          Contact Us →
        </Link>
      </div>
    </aside>
  );
}
