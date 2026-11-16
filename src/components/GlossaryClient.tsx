"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Check,
  ExternalLink,
  MessageCircle,
  Phone,
  Sun,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Share2,
  Loader2,
  BookOpen,
} from "lucide-react";
import { GlossaryData, getGlossary } from "@/utils/glossaryService";

export default function GlossaryClient({ initialData }: { initialData?: GlossaryData }) {
  const [data, setData] = useState<GlossaryData>(initialData || { tabs: [], terms: [] });
  const [loading, setLoading] = useState<boolean>(!initialData || initialData.terms.length === 0);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeToc, setActiveToc] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Fetch purely from database on mount
  useEffect(() => {
    let mounted = true;
    async function loadDbGlossary() {
      try {
        const dbData = await getGlossary();
        if (mounted) {
          setData(dbData);
        }
      } catch (err) {
        console.error("Error loading glossary from database:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadDbGlossary();
    return () => {
      mounted = false;
    };
  }, []);

  // Normalize string for search
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9₹ ]+/g, " ")
      .trim();

  // Filtered terms
  const filteredTerms = useMemo(() => {
    const q = normalize(searchQuery);
    const searchWords = q.split(/\s+/).filter(Boolean);

    return data.terms.filter((term) => {
      // Filter by category/tab
      if (activeFilter !== "all" && term.tabId !== activeFilter) {
        return false;
      }

      // Filter by search query
      if (searchWords.length === 0) return true;

      const searchableText = normalize(
        `${term.title} ${term.alias || ""} ${term.paragraphs.join(" ")} ${term.note?.text || ""}`
      );

      return searchWords.every((word) => searchableText.includes(word));
    });
  }, [data.terms, activeFilter, searchQuery]);

  // Count terms per tab
  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { all: data.terms.length };
    data.tabs.forEach((tab) => {
      counts[tab.id] = data.terms.filter((t) => t.tabId === tab.id).length;
    });
    return counts;
  }, [data]);

  // Group terms by tab for display
  const sectionsWithTerms = useMemo(() => {
    return data.tabs
      .map((tab) => {
        const terms = filteredTerms.filter((t) => t.tabId === tab.id);
        return {
          ...tab,
          terms,
        };
      })
      .filter((section) => section.terms.length > 0);
  }, [data.tabs, filteredTerms]);

  // IntersectionObserver for Table of Contents
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const secId = entry.target.getAttribute("data-sec");
            if (secId) setActiveToc(secId);
          }
        });
      },
      { rootMargin: "-120px 0px -60% 0px" }
    );

    const sections = document.querySelectorAll("section[data-sec]");
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, [sectionsWithTerms]);

  // Flash highlight term on anchor navigation
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (targetId.startsWith("#")) {
      const cleanId = targetId.slice(1);
      const el = document.getElementById(cleanId);
      if (el) {
        if (!filteredTerms.some((t) => t.id === cleanId)) {
          setActiveFilter("all");
          setSearchQuery("");
        }
        setTimeout(() => {
          const targetEl = document.getElementById(cleanId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
            targetEl.classList.add("flash-highlight");
            setTimeout(() => targetEl.classList.remove("flash-highlight"), 2000);
          }
        }, 80);
      }
    }
  };

  // Copy anchor link
  const copyAnchor = (id: string) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/solar-glossary#${id}`;
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="bg-[#F5F8FC] min-h-screen text-[#0E1C2B] font-sans antialiased selection:bg-[#FFF3E3] selection:text-[#D9770A]">
      <style jsx global>{`
        @keyframes flashEffect {
          0% {
            box-shadow: 0 0 0 5px rgba(247, 147, 30, 0.4);
            border-color: #f7931e;
          }
          50% {
            box-shadow: 0 0 0 8px rgba(247, 147, 30, 0.2);
            border-color: #f7931e;
          }
          100% {
            box-shadow: none;
            border-color: #e2e8f0;
          }
        }
        .flash-highlight {
          animation: flashEffect 2s ease-in-out;
        }
        .term-content a {
          color: #14457a;
          font-weight: 500;
          text-decoration: underline;
          text-decoration-color: rgba(20, 69, 122, 0.35);
          text-underline-offset: 3px;
          transition: all 0.15s ease;
        }
        .term-content a:hover {
          color: #d9770a;
          text-decoration-color: #d9770a;
        }
      `}</style>

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF1F9] via-[#F2F6FA] to-[#F5F8FC] pt-12 pb-10 border-b border-[#E2E8F0]">
        <div className="max-w-[1220px] mx-auto px-5 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm text-[#5A6B7D] mb-4">
            <Link href="/" className="hover:text-[#D9770A] transition-colors">
              Home
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-[#0E1C2B] font-medium">Solar Glossary</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#FFF3E3] text-[#D9770A] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
            <Sun size={15} className="text-[#F7931E]" />
            <span>Solar Glossary</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl md:text-5xl font-black text-[#0B2E4F] tracking-tight leading-[1.2] max-w-4xl mb-4">
            Solar Glossary That Makes <span className="text-[#F7931E]">Technical Terms</span> Easy to Understand
          </h1>

          <p className="text-base md:text-lg text-[#36485B] max-w-3xl leading-relaxed mb-8">
            Every term on a rooftop solar quote, explained in plain words, along with the question
            worth asking when it shows up. Search for a word, or browse by section.
          </p>

          {/* Live Search Input */}
          <div className="relative max-w-2xl mb-5 shadow-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A6B7D]" size={20} />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search a term, e.g. net metering, HDGI, TOPCon..."
              className="w-full bg-white text-[#0E1C2B] text-base rounded-full pl-12 pr-6 py-4 border border-[#E2E8F0] focus:border-[#F7931E] focus:ring-4 focus:ring-[#F7931E]/20 outline-none transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full px-2.5 py-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* Meta Count info */}
          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-[#5A6B7D]">
            <span>
              <strong className="text-[#0B2E4F] font-bold">{data.terms.length}</strong> terms in{" "}
              <strong className="text-[#0B2E4F] font-bold">{data.tabs.length}</strong> sections
            </span>
            <span className="opacity-40">•</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#F7931E]" />
              Updated November 2026
            </span>
          </div>
        </div>
      </section>

      {/* Sticky Filter Chips */}
      {data.tabs.length > 0 && (
        <div className="sticky top-0 md:top-[76px] z-30 bg-[#F5F8FC]/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs">
          <div className="max-w-[1220px] mx-auto px-5 py-3 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            <button
              onClick={() => setActiveFilter("all")}
              className={`shrink-0 inline-flex items-center gap-2 text-xs md:text-sm font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                activeFilter === "all"
                  ? "bg-[#0B2E4F] text-white shadow-sm"
                  : "bg-white text-[#0E1C2B] border border-[#E2E8F0] hover:border-[#F7931E] hover:text-[#D9770A]"
              }`}
            >
              <span>All Terms</span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  activeFilter === "all" ? "bg-white/20 text-white" : "bg-[#F5F8FC] text-[#5A6B7D]"
                }`}
              >
                {tabCounts["all"] || 0}
              </span>
            </button>

            {data.tabs.map((tab) => {
              const count = tabCounts[tab.id] || 0;
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveFilter(tab.id);
                    const el = document.getElementById(tab.secId || `sec-${tab.id}`);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className={`shrink-0 inline-flex items-center gap-2 text-xs md:text-sm font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#0B2E4F] text-white shadow-sm"
                      : "bg-white text-[#0E1C2B] border border-[#E2E8F0] hover:border-[#F7931E] hover:text-[#D9770A]"
                  }`}
                >
                  <span>{tab.title}</span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-[#F5F8FC] text-[#5A6B7D]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Layout: TOC Sidebar + Terms Grid */}
      <div className="max-w-[1220px] mx-auto px-5 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left TOC Sidebar (Desktop) */}
        {data.tabs.length > 0 && (
          <aside className="hidden lg:block lg:col-span-3 sticky top-36">
            <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-xs">
              <h2 className="text-xs font-bold tracking-wider uppercase text-[#5A6B7D] mb-4">On this page</h2>
              <ul className="space-y-1 border-l-2 border-[#E2E8F0]">
                {data.tabs.map((tab) => {
                  const isCurrent = activeToc === tab.id || activeFilter === tab.id;
                  const count = tabCounts[tab.id] || 0;
                  return (
                    <li key={tab.id}>
                      <a
                        href={`#${tab.secId || `sec-${tab.id}`}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveFilter("all");
                          const el = document.getElementById(tab.secId || `sec-${tab.id}`);
                          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className={`flex items-center justify-between pl-3.5 py-1.5 -ml-[2px] border-l-2 text-xs font-medium transition-all ${
                          isCurrent
                            ? "border-[#F7931E] text-[#0B2E4F] font-bold"
                            : "border-transparent text-[#3A4B5D] hover:text-[#D9770A]"
                        }`}
                      >
                        <span className="truncate pr-2">{tab.title}</span>
                        <span className="text-[11px] text-[#5A6B7D]">{count}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* Quick WhatsApp Card */}
              <div className="mt-6 bg-[#0B2E4F] text-white rounded-xl p-4 text-left">
                <p className="text-xs text-[#D7E3F0] leading-relaxed mb-3">
                  Have a quote and a term that isn't here? Send it to our solar engineers on WhatsApp.
                </p>
                <a
                  href="https://wa.me/918573003001?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20free%20Solar%20Consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#189248] text-white text-xs font-bold py-2.5 px-3 rounded-lg transition-colors shadow-sm"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </aside>
        )}

        {/* Right Main Content */}
        <main className={`${data.tabs.length > 0 ? "lg:col-span-9" : "lg:col-span-12"} space-y-12`}>
          {/* Status search line */}
          {(searchQuery || activeFilter !== "all") && (
            <div className="flex items-center justify-between text-xs text-[#5A6B7D] bg-white border border-[#E2E8F0] px-4 py-2.5 rounded-xl shadow-xs">
              <span>
                Showing <strong className="text-[#0B2E4F]">{filteredTerms.length}</strong> of{" "}
                {data.terms.length} terms {activeFilter !== "all" && `in this tab`}
              </span>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("all");
                }}
                className="text-[#D9770A] hover:underline font-bold"
              >
                Reset all filters
              </button>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center space-y-3">
              <Loader2 size={32} className="text-[#F7931E] animate-spin mx-auto" />
              <p className="text-sm font-bold text-[#0B2E4F]">Loading solar glossary from database...</p>
            </div>
          )}

          {/* Empty state when 0 terms in database */}
          {!loading && data.terms.length === 0 && (
            <div className="bg-white border-2 border-dashed border-[#E2E8F0] rounded-2xl p-12 text-center space-y-4">
              <div className="w-14 h-14 bg-[#FFF3E3] text-[#F7931E] rounded-full flex items-center justify-center mx-auto">
                <BookOpen size={26} />
              </div>
              <h3 className="text-xl font-bold text-[#0B2E4F]">No glossary terms found in database</h3>
              <p className="text-sm text-[#5A6B7D] max-w-md mx-auto">
                All data is loaded dynamically from your database. Add new tabs and glossary blocks in the Blog Editor / Admin Panel.
              </p>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 bg-[#0B2E4F] text-white text-xs font-bold py-3 px-6 rounded-full hover:bg-[#14457A] transition-all shadow-md"
              >
                <span>Go to Blog Editor &amp; Admin</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          )}

          {/* Empty search state when search has 0 matches */}
          {!loading && data.terms.length > 0 && filteredTerms.length === 0 && (
            <div className="bg-white border-2 border-dashed border-[#E2E8F0] rounded-2xl p-10 text-center space-y-4">
              <div className="w-14 h-14 bg-[#FFF3E3] text-[#F7931E] rounded-full flex items-center justify-center mx-auto">
                <Search size={26} />
              </div>
              <h3 className="text-xl font-bold text-[#0B2E4F]">No term matches that search</h3>
              <p className="text-sm text-[#5A6B7D] max-w-md mx-auto">
                Try a shorter keyword, check your spelling, or ask our solar expert directly. We'll explain it in
                writing.
              </p>
              <a
                href="https://wa.me/918573003001?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20free%20Solar%20Consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1FA855] text-white text-xs font-bold py-3 px-6 rounded-full hover:brightness-95 transition-all shadow-md"
              >
                <MessageCircle size={16} />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          )}

          {/* Render Sections purely from database */}
          {!loading &&
            sectionsWithTerms.map((section, secIdx) => {
              const formattedNum = String(section.order || secIdx + 1).padStart(2, "0");
              return (
                <section
                  key={section.id}
                  id={section.secId || `sec-${section.id}`}
                  data-sec={section.id}
                  className="scroll-mt-36"
                >
                  {/* Section Header */}
                  <div className="flex items-start gap-4 pb-4 mb-6 border-b border-[#E2E8F0]">
                    <span className="font-heading font-black text-sm text-[#F7931E] bg-[#FFF3E3] px-3 py-1.5 rounded-lg shrink-0 mt-0.5">
                      {formattedNum}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl md:text-2xl font-bold text-[#0B2E4F] tracking-tight">{section.title}</h2>
                      {section.description && (
                        <p className="text-xs md:text-sm text-[#5A6B7D] mt-1">{section.description}</p>
                      )}
                    </div>
                    <span className="hidden sm:inline-block text-xs font-medium text-[#5A6B7D] shrink-0 mt-1">
                      {section.terms.length} {section.terms.length === 1 ? "term" : "terms"}
                    </span>
                  </div>

                  {/* Terms Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                    {section.terms.map((term) => {
                      const isCopied = copiedId === term.id;
                      return (
                        <article
                          key={term.id}
                          id={term.id}
                          className={`bg-white border border-[#E2E8F0] rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between group hover:shadow-lg hover:border-[#F7931E]/40 relative ${
                            term.isBlockLink ? "cursor-pointer ring-1 ring-primary/20 hover:ring-primary" : ""
                          }`}
                        >
                          <div>
                            {/* Term Title with Anchor */}
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="text-lg font-bold text-[#0E1C2B] group-hover:text-[#0B2E4F] transition-colors leading-snug">
                                {term.title}
                              </h3>
                              <button
                                type="button"
                                onClick={() => copyAnchor(term.id)}
                                title="Copy link to this term"
                                className="text-[#F7931E] opacity-60 hover:opacity-100 p-1 rounded-md transition-opacity"
                              >
                                {isCopied ? <Check size={16} className="text-green-600" /> : <Share2 size={15} />}
                              </button>
                            </div>

                            {/* Alias */}
                            {term.alias && (
                              <p className="text-xs text-[#5A6B7D] italic mb-3">
                                {term.alias}
                              </p>
                            )}

                            {/* Paragraphs */}
                            <div className="space-y-3 text-sm text-[#2B3A4A] leading-relaxed term-content">
                              {term.paragraphs.map((p, pIdx) => (
                                <div
                                  key={pIdx}
                                  dangerouslySetInnerHTML={{ __html: p }}
                                  onClick={(e) => {
                                    const target = e.target as HTMLElement;
                                    const anchor = target.closest("a");
                                    if (anchor) {
                                      const href = anchor.getAttribute("href");
                                      if (href && href.startsWith("#")) {
                                        e.preventDefault();
                                        handleAnchorClick(e as any, href);
                                      }
                                    }
                                  }}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Bottom: Note and/or Block Hyperlink */}
                          <div className="mt-5 pt-3">
                            {/* Note Block */}
                            {term.note && term.note.text && (
                              <div className="bg-[#FFF3E3] border-l-3 border-[#F7931E] rounded-r-xl p-3.5 mt-2 text-left mb-3">
                                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#D9770A] mb-1">
                                  <Sun size={12} className="text-[#F7931E]" />
                                  <span>{term.note.tag || "At SunLynk"}</span>
                                </div>
                                <div
                                  className="text-xs text-[#3B2A12] leading-relaxed term-content"
                                  dangerouslySetInnerHTML={{ __html: term.note.text }}
                                />
                              </div>
                            )}

                            {/* Block Hyperlink action if defined */}
                            {term.linkUrl && (
                              <div className="pt-2">
                                <Link
                                  href={term.linkUrl}
                                  target={term.linkUrl.startsWith("http") ? "_blank" : undefined}
                                  rel={term.linkUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14457A] bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200/50 px-3.5 py-1.5 rounded-full transition-all group-hover:border-[#14457A]/40"
                                >
                                  <span>{term.linkText || "Explore Details"}</span>
                                  {term.linkUrl.startsWith("http") ? (
                                    <ExternalLink size={12} />
                                  ) : (
                                    <ArrowRight size={12} />
                                  )}
                                </Link>
                              </div>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}

          {/* Checklist Section: "Read your quote against this page" */}
          <section className="bg-white border border-[#E2E8F0] rounded-2xl p-6 md:p-8 mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-xs">
            <div className="md:col-span-6 space-y-3">
              <h2 className="text-2xl font-bold text-[#0B2E4F]">Read your quote against this page</h2>
              <p className="text-sm text-[#36485B] leading-relaxed">
                Take the quote you already have and go through it line by line. If a term on it isn't explained here,
                ask the installer to explain it in writing.
              </p>
              <p className="text-sm text-[#36485B] leading-relaxed">
                Then check the other direction. If any of these are missing from the quote, ask why.
              </p>
            </div>
            <div className="md:col-span-6">
              <ul className="space-y-2.5">
                {[
                  { title: "Structure coating", desc: 'Zinc thickness in microns, not just "GI"' },
                  { title: "Clamps", desc: "Standard point clamps or H-profile" },
                  { title: "Inverter warranty", desc: "How many years, and who files the claim" },
                  { title: "Repair cover", desc: "Who pays for parts and labour, and for how long" },
                  { title: "Generation guarantee", desc: "Minimum units per year, in writing" },
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 bg-[#F8FAFD] border border-[#E2E8F0] rounded-xl p-3 text-sm"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#1FA855] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={13} strokeWidth={3} />
                    </div>
                    <div>
                      <strong className="block text-[#0E1C2B] font-bold text-xs md:text-sm">{item.title}</strong>
                      <span className="text-xs text-[#5A6B7D]">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* CTA Band */}
          <section className="relative overflow-hidden bg-gradient-to-r from-[#0B2E4F] via-[#14457A] to-[#0B2E4F] text-white rounded-2xl p-8 md:p-10 shadow-lg">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Rather we went through it for you?</h2>
                <p className="text-sm md:text-base text-[#D5E2F0] leading-relaxed">
                  Book a free home visit. We check shade, roof strength and usable space, give you a 3D design, and put
                  every promise in writing. No pressure: book only if you're satisfied.
                </p>
                <ul className="flex flex-wrap gap-4 text-xs md:text-sm text-white pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#F7931E]" />
                    <span>Shade mapped on site</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#F7931E]" />
                    <span>Slab and anchoring checked</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#F7931E]" />
                    <span>3D layout before ordering</span>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-4 flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center bg-[#F7931E] hover:bg-[#D9770A] text-white font-bold text-xs md:text-sm py-3 px-6 rounded-full transition-all text-center shadow-md"
                >
                  Book Free Home Visit
                </Link>
                <a
                  href="https://wa.me/918573003001?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20free%20Solar%20Consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#189248] text-white font-bold text-xs md:text-sm py-3 px-6 rounded-full transition-all text-center"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Us</span>
                </a>
                <a
                  href="tel:+918573003001"
                  className="w-full inline-flex items-center justify-center gap-2 border border-white/40 hover:bg-white hover:text-[#0B2E4F] text-white font-bold text-xs md:text-sm py-3 px-6 rounded-full transition-all text-center"
                >
                  <Phone size={15} />
                  <span>Call 8573003001</span>
                </a>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <p className="text-xs text-[#5A6B7D] leading-relaxed pt-2 pb-6" id="disclaimer">
            * Actual generation, savings and payback depend on system size, rooftop conditions, electricity
            consumption and applicable DISCOM regulations. LynkSure generation guarantee terms and conditions apply.
            Subsidy amounts are as notified for 2026 and may change.
          </p>
        </main>
      </div>
    </div>
  );
}
