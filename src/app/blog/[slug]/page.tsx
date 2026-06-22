import React from "react";
import Link from "next/link";
import Image from "next/image";
import blogsData from "@/data/blogs.json";
import BlogSidebar from "@/components/BlogSidebar";
import ClientCommentsSection from "@/components/ClientCommentsSection";
import {
  User,
  MessageSquare,
  Calendar,
  Hash,
  Layers,
  ArrowLeft,
} from "lucide-react";

type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "two_column"; left: Block[]; right: Block[] }
  | { type: "list"; style: "bullet" | "ordered"; items: string[] }
  | { type: "grid"; columns: number; items: { image: string; caption?: string }[] };

type BlogPost = Omit<(typeof blogsData)[number], "blocks"> & {
  blocks: Block[];
};

interface PageProps {
  params: Promise<{ slug: string }>;
}
async function fetchFromApi(path: string, options: RequestInit = {}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl || !apiUrl.startsWith("http")) {
    return null;
  }
  try {
    const res = await fetch(`${apiUrl}${path}`, {
      ...options,
      signal: AbortSignal.timeout(3000), // 3-second timeout
    });
    return res;
  } catch (err) {
    return null;
  }
}

export async function generateStaticParams() {
  let dynamicBlogs: any[] = [];
  const res = await fetchFromApi("/api/blogs");
  if (res && res.ok) {
    try {
      dynamicBlogs = await res.json();
    } catch (err) {
      console.error("Failed to parse dynamic blogs in generateStaticParams", err);
    }
  }

  const dynamicSlugs = dynamicBlogs.map((b) => ({ slug: b.slug }));
  const staticSlugs = blogsData.map((post) => ({ slug: post.slug }));

  const seen = new Set();
  const combined = [];
  for (const item of [...dynamicSlugs, ...staticSlugs]) {
    if (!seen.has(item.slug)) {
      seen.add(item.slug);
      combined.push(item);
    }
  }
  return combined;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  
  let post: BlogPost | null = null;
  const res = await fetchFromApi(`/api/blogs/${slug}`, { next: { revalidate: 10 } });
  if (res && res.ok) {
    try {
      post = (await res.json()) as BlogPost;
    } catch (err) {
      // Fail silently
    }
  }

  if (!post) {
    post = blogsData.find((b) => b.slug === slug) as BlogPost | undefined || null;
  }

  if (!post) return { title: "Post Not Found | SunLynk Solar" };
  return {
    title: `${post.title} | SunLynk Solar Blog`,
    description: post.excerpt,
  };
}

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

// ─── Block Renderer ────────────────────────────────────────────────────────────
function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "heading": {
      const hb = block as { type: "heading"; level: number; text: string };
      if (hb.level === 2) {
        return (
          <h2 className="text-xl md:text-2xl font-extrabold text-dark mt-8 mb-3 leading-tight border-l-4 border-primary pl-4">
            {hb.text}
          </h2>
        );
      }
      return (
        <h3 className="text-lg font-bold text-dark mt-6 mb-2 leading-tight">
          {hb.text}
        </h3>
      );
    }

    case "paragraph": {
      const pb = block as { type: "paragraph"; text: string };
      return (
        <p className="text-sm md:text-base text-gray-700 leading-relaxed text-justify">
          {pb.text}
        </p>
      );
    }

    case "image": {
      const imgb = block as { type: "image"; src: string; alt: string; caption?: string };
      return (
        <figure className="my-6">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-md border border-gray-100">
            <Image src={getImageUrl(imgb.src)} alt={imgb.alt} fill className="object-cover" />
          </div>
          {imgb.caption && (
            <figcaption className="text-center text-xs text-gray-400 mt-2 italic">
              {imgb.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "two_column": {
      const tc = block as {
        type: "two_column";
        left: Block[];
        right: Block[];
      };
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 bg-gray-50 border border-gray-100 rounded-2xl p-6">
          <div className="flex flex-col gap-3">
            {tc.left.map((b, i) => <BlockRenderer key={i} block={b} />)}
          </div>
          <div className="flex flex-col gap-3 md:border-l md:border-gray-200 md:pl-6">
            {tc.right.map((b, i) => <BlockRenderer key={i} block={b} />)}
          </div>
        </div>
      );
    }

    case "list": {
      const lb = block as { type: "list"; style: "bullet" | "ordered"; items: string[] };
      if (lb.style === "ordered") {
        return (
          <ol className="list-decimal pl-6 flex flex-col gap-1.5 text-sm text-gray-700 leading-relaxed">
            {lb.items.map((item, i) => <li key={i}>{item}</li>)}
          </ol>
        );
      }
      return (
        <ul className="list-none pl-0 flex flex-col gap-1.5">
          {lb.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    }

    case "grid": {
      const gb = block as {
        type: "grid";
        columns: number;
        items: { image: string; caption?: string }[];
      };
      const cols = gb.columns === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2";
      return (
        <div className={`grid ${cols} gap-4 my-6`}>
          {gb.items.map((item, i) => (
            <figure key={i} className="flex flex-col gap-2">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow border border-gray-100">
                <Image src={getImageUrl(item.image)} alt={item.caption || ""} fill className="object-cover" />
              </div>
              {item.caption && (
                <figcaption className="text-center text-xs text-gray-400 italic">{item.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      );
    }

    default:
      return null;
  }
}

// ─── Template Hero ────────────────────────────────────────────────────────────
function TemplateHero({ post }: { post: any }) {
  const template = post.template || "editorial";

  if (template === "magazine") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-md border border-gray-100">
          <Image src={getImageUrl(post.image)} alt={post.title} fill className="object-cover" />
          <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-md flex flex-col items-center shadow">
            <span className="text-sm font-extrabold leading-none">{post.day || new Date(post.createdAt || post.date).getDate() || "13"}</span>
            <span className="text-[10px] uppercase leading-none mt-0.5">
              {post.month || new Date(post.createdAt || post.date).toLocaleString('default', { month: 'short' }) || "Jun"}
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-dark leading-tight">{post.title}</h2>
          <p className="text-base text-gray-600 leading-relaxed">{post.excerpt}</p>
          <div className="flex items-center gap-5 text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><User size={13} className="text-primary" />{post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={13} className="text-primary" />{post.date || new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    );
  }

  if (template === "minimal") {
    return (
      <div className="mb-6 pb-6 border-b border-gray-100">
        <h2 className="text-2xl md:text-4xl font-black text-dark leading-tight mb-4">{post.title}</h2>
        <div className="flex items-center gap-5 text-xs text-gray-400">
          <span className="flex items-center gap-1.5"><User size={13} className="text-primary" />{post.author}</span>
          <span className="flex items-center gap-1.5"><Calendar size={13} className="text-primary" />{post.date || new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="flex items-center gap-1.5"><MessageSquare size={13} className="text-primary" />{post.commentsCount || 0} Comments</span>
        </div>
        <p className="text-base text-gray-600 mt-4 leading-relaxed border-l-4 border-primary pl-4">{post.excerpt}</p>
      </div>
    );
  }

  // editorial (default)
  return (
    <div className="mb-6">
      <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-2xl overflow-hidden shadow-md border border-gray-100">
        <Image src={getImageUrl(post.image)} alt={post.title} fill className="object-cover" />
        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-md flex flex-col items-center shadow">
          <span className="text-sm font-extrabold leading-none">{post.day || new Date(post.createdAt || post.date).getDate() || "13"}</span>
          <span className="text-[10px] uppercase leading-none mt-0.5">
            {post.month || new Date(post.createdAt || post.date).toLocaleString('default', { month: 'short' }) || "Jun"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-5 text-xs text-gray-400 mt-4">
        <span className="flex items-center gap-1.5"><User size={13} className="text-primary" />by {post.author}</span>
        <span className="flex items-center gap-1.5"><MessageSquare size={13} className="text-primary" />{post.commentsCount || 0} Comments</span>
        <span className="flex items-center gap-1.5"><Calendar size={13} className="text-primary" />{post.date || new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-dark mt-4 leading-tight">{post.title}</h2>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let post: BlogPost | null = null;
  const res = await fetchFromApi(`/api/blogs/${slug}`, { next: { revalidate: 10 } });
  if (res && res.ok) {
    try {
      post = (await res.json()) as BlogPost;
    } catch (err) {
      console.error("Failed to parse blog post from API", err);
    }
  }

  if (!post) {
    post = blogsData.find((b) => b.slug === slug) as BlogPost | undefined || null;
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-black text-dark">Post Not Found</h1>
        <Link href="/blog/" className="text-primary font-bold hover:underline">← Back to Blog</Link>
      </div>
    );
  }

  let allPosts = blogsData;
  let dbCategories: { _id: string; name: string; slug: string }[] = [];
  let dbTags: { _id: string; name: string; slug: string }[] = [];

  const [allRes, catsRes, tagsRes] = await Promise.allSettled([
    fetchFromApi("/api/blogs", { next: { revalidate: 10 } }),
    fetchFromApi("/api/categories", { next: { revalidate: 10 } }),
    fetchFromApi("/api/tags", { next: { revalidate: 10 } })
  ]);

  if (allRes.status === "fulfilled" && allRes.value && allRes.value.ok) {
    try {
      const dynamicBlogs = await allRes.value.json();
      const dynamicSlugs = new Set(dynamicBlogs.map((b: any) => b.slug));
      const filteredJSON = blogsData.filter(b => !dynamicSlugs.has(b.slug));
      allPosts = [...dynamicBlogs, ...filteredJSON];
    } catch (err) {
      console.error("Failed to parse all blogs from API, using static JSON", err);
    }
  }

  if (catsRes.status === "fulfilled" && catsRes.value && catsRes.value.ok) {
    try {
      dbCategories = await catsRes.value.json();
    } catch (err) {
      console.error("Failed to parse categories from API", err);
    }
  }

  if (tagsRes.status === "fulfilled" && tagsRes.value && tagsRes.value.ok) {
    try {
      dbTags = await tagsRes.value.json();
    } catch (err) {
      console.error("Failed to parse tags from API", err);
    }
  }

  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        (p.categories || []).some((c) => (post.categories || []).includes(c))
    )
    .slice(0, 3);

  const postComments = (post as BlogPost & {
    comments?: { author: string; avatar?: string; text: string; createdAt: string }[];
  }).comments || [];

  return (
    <div>
      {/* Page Header */}
      <section className="relative bg-dark text-white py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: "url(/assets/images/backgrounds/page-header-bg-1-1.webp)" }}
        />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">Article</span>
          <h1 className="text-2xl md:text-4xl font-black max-w-3xl leading-tight">{post.title}</h1>
          <div className="mt-4 flex items-center gap-2 text-xs md:text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog/" className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white line-clamp-1">{post.title}</span>
          </div>
        </div>
      </section>

      {/* Main content + Sidebar */}
      <section className="py-14 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* LEFT: Post content */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                <Link
                  href="/blog/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-primary transition-colors mb-6"
                >
                  <ArrowLeft size={13} />
                  Back to Blog
                </Link>

                <TemplateHero post={post} />

                {/* Categories */}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.categories.map((cat) => (
                      <Link
                        key={cat}
                        href={`/blog/category/${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, "-"))}/`}
                        className="inline-flex items-center gap-1 text-xs font-bold bg-primary/8 text-primary border border-primary/15 px-3 py-1.5 rounded-full hover:bg-primary hover:text-white transition-all"
                      >
                        <Layers size={10} />
                        {cat}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Rich blocks */}
                <div className="flex flex-col gap-4">
                  {post.blocks && post.blocks.length > 0 ? (
                    post.blocks.map((block, i) => (
                      <BlockRenderer key={i} block={block} />
                    ))
                  ) : (
                    <div
                      className="text-sm md:text-base text-gray-700 leading-relaxed text-justify flex flex-col gap-4"
                      dangerouslySetInnerHTML={{
                        __html: (post as BlogPost & { content?: string }).content || "",
                      }}
                    />
                  )}
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="border-t border-b border-gray-100 py-5 mt-8 flex flex-wrap gap-2 items-center">
                    <span className="font-bold text-gray-600 text-xs uppercase tracking-wider mr-1">Tags:</span>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-xs font-bold bg-primary/8 text-primary border border-primary/15 px-3 py-1.5 rounded-full"
                      >
                        <Hash size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Comments — rendered client-side only */}
              <ClientCommentsSection
                postSlug={post.slug}
                initialComments={postComments}
              />
            </div>

            {/* RIGHT: Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <BlogSidebar
                  allPosts={allPosts}
                  currentSlug={post.slug}
                  relatedPosts={relatedPosts}
                  dbCategories={dbCategories}
                  dbTags={dbTags}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
