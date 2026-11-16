"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Link as LinkIcon,
  Search,
  Check,
  Sun,
  Layers,
  ArrowRight,
  Eye,
  FileText,
  AlertCircle,
  X,
  Loader2,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import {
  GlossaryData,
  GlossaryTab,
  GlossaryTerm,
  getGlossary,
  createOrUpdateTab,
  deleteTab,
  createOrUpdateTerm,
  deleteTerm,
} from "@/utils/glossaryService";

interface BlogSummary {
  _id?: string;
  title: string;
  slug: string;
}

interface GlossaryManagerProps {
  token: string | null;
  role: string | null;
  blogs: BlogSummary[];
}

export default function GlossaryManager({ token, role, blogs }: GlossaryManagerProps) {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [data, setData] = useState<GlossaryData>({ tabs: [], terms: [] });
  const [selectedTabId, setSelectedTabId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Tab Modal State
  const [isTabModalOpen, setIsTabModalOpen] = useState(false);
  const [editingTab, setEditingTab] = useState<GlossaryTab | null>(null);
  const [tabForm, setTabForm] = useState({
    id: "",
    title: "",
    description: "",
    order: 0,
  });

  // Term Modal State
  const [isTermModalOpen, setIsTermModalOpen] = useState(false);
  const [editingTerm, setEditingTerm] = useState<GlossaryTerm | null>(null);
  const [termForm, setTermForm] = useState({
    id: "",
    tabId: "",
    title: "",
    alias: "",
    paragraphsText: "",
    linkUrl: "",
    linkText: "",
    isBlockLink: false,
    hasNote: false,
    noteTag: "At SunLynk",
    noteText: "",
    order: 0,
  });

  const loadGlossaryData = async () => {
    setLoading(true);
    try {
      const res = await getGlossary();
      setData(res);
      if (res.tabs.length > 0 && selectedTabId === "all") {
        // default to "all"
      }
    } catch (err: any) {
      setMessage({ type: "error", text: "Failed to load glossary data: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGlossaryData();
  }, []);

  const showNotification = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  // --- TAB HANDLERS ---
  const openNewTabModal = () => {
    setEditingTab(null);
    setTabForm({
      id: "",
      title: "",
      description: "",
      order: data.tabs.length + 1,
    });
    setIsTabModalOpen(true);
  };

  const openEditTabModal = (tab: GlossaryTab) => {
    setEditingTab(tab);
    setTabForm({
      id: tab.id,
      title: tab.title,
      description: tab.description || "",
      order: tab.order || 0,
    });
    setIsTabModalOpen(true);
  };

  const handleSaveTab = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tabForm.title.trim()) {
      alert("Tab title is required");
      return;
    }
    setActionLoading(true);
    try {
      const slug =
        tabForm.id.trim() ||
        tabForm.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

      const isEditing = Boolean(editingTab);
      await createOrUpdateTab(
        {
          _id: editingTab?._id,
          originalId: editingTab?.id,
          isNew: !isEditing,
          id: slug,
          secId: `sec-${slug}`,
          title: tabForm.title.trim(),
          description: tabForm.description.trim(),
          order: Number(tabForm.order) || 0,
        },
        token
      );

      showNotification("success", editingTab ? "Tab updated successfully!" : "New tab created!");
      setIsTabModalOpen(false);
      await loadGlossaryData();
      if (!editingTab) setSelectedTabId(slug);
    } catch (err: any) {
      showNotification("error", err.message || "Failed to save tab");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTab = async (tab: GlossaryTab) => {
    const termsInTab = data.terms.filter((t) => t.tabId === tab.id).length;
    const confirmMsg =
      termsInTab > 0
        ? `Delete tab "${tab.title}"? WARNING: This will also delete ${termsInTab} glossary term(s) inside this tab!`
        : `Delete tab "${tab.title}"?`;

    if (!confirm(confirmMsg)) return;

    setActionLoading(true);
    try {
      await deleteTab(tab.id, token);
      showNotification("success", `Tab "${tab.title}" deleted.`);
      if (selectedTabId === tab.id) setSelectedTabId("all");
      await loadGlossaryData();
    } catch (err: any) {
      showNotification("error", err.message || "Failed to delete tab");
    } finally {
      setActionLoading(false);
    }
  };

  // --- TERM HANDLERS ---
  const openNewTermModal = () => {
    setEditingTerm(null);
    const defaultTab = selectedTabId !== "all" ? selectedTabId : data.tabs[0]?.id || "systems";
    setTermForm({
      id: "",
      tabId: defaultTab,
      title: "",
      alias: "",
      paragraphsText: "",
      linkUrl: "",
      linkText: "",
      isBlockLink: false,
      hasNote: false,
      noteTag: "At SunLynk",
      noteText: "",
      order: 0,
    });
    setIsTermModalOpen(true);
  };

  const openEditTermModal = (term: GlossaryTerm) => {
    setEditingTerm(term);
    setTermForm({
      id: term.id,
      tabId: term.tabId,
      title: term.title,
      alias: term.alias || "",
      paragraphsText: term.paragraphs.join("\n\n"),
      linkUrl: term.linkUrl || "",
      linkText: term.linkText || "",
      isBlockLink: Boolean(term.isBlockLink),
      hasNote: Boolean(term.note && term.note.text),
      noteTag: term.note?.tag || "At SunLynk",
      noteText: term.note?.text || "",
      order: term.order || 0,
    });
    setIsTermModalOpen(true);
  };

  const handleSaveTerm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termForm.title.trim() || !termForm.tabId) {
      alert("Term title and Tab are required");
      return;
    }
    setActionLoading(true);
    try {
      const slug =
        termForm.id.trim() ||
        termForm.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

      const paragraphs = termForm.paragraphsText
        .split(/\r?\n\r?\n/)
        .map((p) => p.trim())
        .filter(Boolean);

      const note =
        termForm.hasNote && termForm.noteText.trim()
          ? {
              tag: termForm.noteTag.trim() || "At SunLynk",
              text: termForm.noteText.trim(),
            }
          : null;

      const isEditing = Boolean(editingTerm);
      await createOrUpdateTerm(
        {
          _id: editingTerm?._id,
          originalId: editingTerm?.id,
          isNew: !isEditing,
          id: slug,
          tabId: termForm.tabId,
          title: termForm.title.trim(),
          alias: termForm.alias.trim(),
          paragraphs: paragraphs.length > 0 ? paragraphs : [termForm.title.trim()],
          linkUrl: termForm.linkUrl.trim(),
          linkText: termForm.linkText.trim(),
          isBlockLink: termForm.isBlockLink,
          note,
          order: Number(termForm.order) || 0,
        },
        token
      );

      showNotification("success", editingTerm ? "Glossary block updated!" : "Glossary block created!");
      setIsTermModalOpen(false);
      await loadGlossaryData();
    } catch (err: any) {
      showNotification("error", err.message || "Failed to save glossary term");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTerm = async (term: GlossaryTerm) => {
    if (!confirm(`Delete glossary term "${term.title}"?`)) return;
    setActionLoading(true);
    try {
      await deleteTerm(term.id, token);
      showNotification("success", `Term "${term.title}" deleted.`);
      await loadGlossaryData();
    } catch (err: any) {
      showNotification("error", err.message || "Failed to delete term");
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered terms
  const filteredTerms = data.terms.filter((term) => {
    if (selectedTabId !== "all" && term.tabId !== selectedTabId) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      term.title.toLowerCase().includes(q) ||
      (term.alias && term.alias.toLowerCase().includes(q)) ||
      term.paragraphs.some((p) => p.toLowerCase().includes(q))
    );
  });

  return (
    <div className="flex flex-col gap-6 text-left">
      {/* Top Banner Alert */}
      {message && (
        <div
          className={`py-3 px-5 rounded-2xl flex items-center justify-between text-xs font-bold transition-all shadow-sm ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-gray-500 hover:text-gray-800">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-500/10 text-amber-600 rounded-xl">
              <BookOpen size={20} />
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Solar Glossary Management</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Define tabs/sections, manage glossary blocks, and add custom hyperlinks to blogs, solutions, or pages.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/solar-glossary"
            target="_blank"
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3.5 rounded-xl text-xs font-bold transition-all"
          >
            <Eye size={14} />
            <span>View Live Glossary</span>
          </Link>
          <button
            type="button"
            onClick={openNewTabModal}
            className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white py-2 px-3.5 rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <Layers size={14} />
            <span>+ Define New Tab</span>
          </button>
          <button
            type="button"
            onClick={openNewTermModal}
            className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white py-2 px-4 rounded-xl text-xs font-bold transition-all shadow-sm shadow-primary/20"
          >
            <Plus size={15} />
            <span>+ Add Glossary Block</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Tab pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedTabId("all")}
            className={`shrink-0 flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              selectedTabId === "all"
                ? "bg-[#0B2E4F] text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <span>All Tabs</span>
            <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded-full">
              {data.terms.length}
            </span>
          </button>

          {data.tabs.map((tab) => {
            const count = data.terms.filter((t) => t.tabId === tab.id).length;
            const isSelected = selectedTabId === tab.id;
            return (
              <div key={tab.id} className="relative group shrink-0 flex items-center">
                <button
                  onClick={() => setSelectedTabId(tab.id)}
                  className={`flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#0B2E4F] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <span>{tab.title}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {count}
                  </span>
                </button>
                <div className="hidden group-hover:flex items-center ml-1 gap-1">
                  <button
                    onClick={() => openEditTabModal(tab)}
                    title="Edit Tab"
                    className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                  >
                    <Edit3 size={11} />
                  </button>
                  <button
                    onClick={() => handleDeleteTab(tab)}
                    title="Delete Tab"
                    className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-72 shrink-0">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search glossary blocks..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary"
          />
        </div>
      </div>

      {/* Selected Tab Info Card (if specific tab selected) */}
      {selectedTabId !== "all" && (
        (() => {
          const tab = data.tabs.find((t) => t.id === selectedTabId);
          if (!tab) return null;
          return (
            <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    Active Tab
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{tab.title}</h3>
                  <span className="text-xs text-slate-400">({tab.id})</span>
                </div>
                {tab.description && <p className="text-xs text-slate-600 mt-1">{tab.description}</p>}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditTabModal(tab)}
                  className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 py-1.5 px-3 rounded-lg shadow-2xs"
                >
                  Edit Tab
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteTab(tab)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 bg-white border border-red-200 py-1.5 px-3 rounded-lg shadow-2xs"
                >
                  Delete Tab
                </button>
              </div>
            </div>
          );
        })()
      )}

      {/* Terms Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <span className="text-xs text-slate-500 font-semibold">Loading glossary blocks...</span>
        </div>
      ) : filteredTerms.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <BookOpen size={32} className="text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No glossary blocks found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery
              ? "No terms matched your search. Try a different keyword."
              : "No terms exist in this tab yet. Click the button below to add one."}
          </p>
          <button
            type="button"
            onClick={openNewTermModal}
            className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2 px-4 rounded-xl shadow-sm"
          >
            <Plus size={14} />
            <span>Add First Block</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTerms.map((term) => {
            const tab = data.tabs.find((t) => t.id === term.tabId);
            return (
              <div
                key={term.id}
                className="bg-white border border-slate-200 hover:border-amber-300 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Tab Tag + Actions */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full truncate max-w-[150px]">
                      {tab?.title || term.tabId}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openEditTermModal(term)}
                        title="Edit Term"
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTerm(term)}
                        title="Delete Term"
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0B2E4F] transition-colors leading-snug">
                    {term.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">#{term.id}</span>

                  {/* Alias */}
                  {term.alias && (
                    <p className="text-xs text-slate-500 italic mt-1 line-clamp-1">{term.alias}</p>
                  )}

                  {/* Snippet */}
                  <div className="mt-3 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {term.paragraphs[0] || ""}
                  </div>

                  {/* Note preview if any */}
                  {term.note && term.note.text && (
                    <div className="mt-3 bg-amber-50 border-l-2 border-amber-400 p-2.5 rounded-r-lg text-[11px] text-amber-900 line-clamp-2">
                      <strong className="block text-amber-700 font-bold mb-0.5">{term.note.tag || "At SunLynk"}</strong>
                      {term.note.text}
                    </div>
                  )}
                </div>

                {/* Bottom: Block Hyperlink status & Preview link */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  {term.linkUrl ? (
                    <div className="flex items-center gap-1 text-blue-600 font-bold truncate max-w-[180px]">
                      <LinkIcon size={12} className="shrink-0" />
                      <span className="truncate">{term.linkText || term.linkUrl}</span>
                    </div>
                  ) : (
                    <span className="text-slate-400 text-[10px]">No block link</span>
                  )}

                  <Link
                    href={`/solar-glossary#${term.id}`}
                    target="_blank"
                    className="text-slate-500 hover:text-primary flex items-center gap-1 font-semibold transition-colors"
                  >
                    <span>View</span>
                    <ExternalLink size={11} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ══════════ MODAL: TAB EDITOR ══════════ */}
      {isTabModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers size={18} className="text-primary" />
                <h3 className="text-sm font-bold text-slate-900">
                  {editingTab ? "Edit Tab / Section" : "Define New Tab / Section"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsTabModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveTab} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tab Title *</label>
                <input
                  type="text"
                  required
                  value={tabForm.title}
                  onChange={(e) => setTabForm({ ...tabForm, title: e.target.value })}
                  placeholder="e.g. Types of System, Structure & Mounting"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tab Key / ID (slug)
                </label>
                <input
                  type="text"
                  value={tabForm.id}
                  disabled={Boolean(editingTab)}
                  onChange={(e) => setTabForm({ ...tabForm, id: e.target.value })}
                  placeholder="Auto-generated if left blank (e.g. systems, panels)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-primary disabled:opacity-50"
                />
                <span className="text-[10px] text-slate-400">Used as anchor identifier in URLs</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Description</label>
                <textarea
                  rows={2}
                  value={tabForm.description}
                  onChange={(e) => setTabForm({ ...tabForm, description: e.target.value })}
                  placeholder="e.g. On-grid, hybrid and the battery that makes backup possible."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Display Order</label>
                <input
                  type="number"
                  value={tabForm.order}
                  onChange={(e) => setTabForm({ ...tabForm, order: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-primary"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsTabModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 px-4 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2 px-5 rounded-xl shadow-sm"
                >
                  {actionLoading ? "Saving..." : editingTab ? "Update Tab" : "Create Tab"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════ MODAL: TERM / BLOCK EDITOR ══════════ */}
      {isTermModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-primary" />
                <h3 className="text-sm font-bold text-slate-900">
                  {editingTerm ? `Edit Glossary Block: ${editingTerm.title}` : "Add New Glossary Block"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsTermModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveTerm} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tab selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Assign to Tab *</label>
                  <select
                    required
                    value={termForm.tabId}
                    onChange={(e) => setTermForm({ ...termForm, tabId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:bg-white focus:border-primary"
                  >
                    {data.tabs.map((tab) => (
                      <option key={tab.id} value={tab.id}>
                        {tab.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Term title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Term / Block Title *</label>
                  <input
                    type="text"
                    required
                    value={termForm.title}
                    onChange={(e) => setTermForm({ ...termForm, title: e.target.value })}
                    placeholder="e.g. On-Grid Solar, Mono PERC"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Anchor ID */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Anchor Slug (#id)</label>
                  <input
                    type="text"
                    value={termForm.id}
                    disabled={Boolean(editingTerm)}
                    onChange={(e) => setTermForm({ ...termForm, id: e.target.value })}
                    placeholder="Auto-generated if blank (e.g. on-grid-solar)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-primary disabled:opacity-50"
                  />
                </div>

                {/* Alias */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Alias / Subtitle (optional)</label>
                  <input
                    type="text"
                    value={termForm.alias}
                    onChange={(e) => setTermForm({ ...termForm, alias: e.target.value })}
                    placeholder='e.g. Sometimes written "BECC" on quotes'
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-primary"
                  />
                </div>
              </div>

              {/* Definition / Paragraphs */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Definition / Content (Separate paragraphs with double Enter) *
                  </label>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span>Supports HTML &amp; Links</span>
                  </div>
                </div>

                {/* Quick Helper buttons to insert link */}
                <div className="flex flex-wrap items-center gap-1.5 mb-2 bg-slate-100 p-2 rounded-xl text-xs">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Insert Link:</span>
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt("Enter Target URL:", "https://");
                      const text = prompt("Enter Link Text:", "link");
                      if (url && text) {
                        setTermForm({
                          ...termForm,
                          paragraphsText:
                            termForm.paragraphsText + ` <a href="${url}">${text}</a>`,
                        });
                      }
                    }}
                    className="bg-white border border-slate-200 text-slate-700 hover:text-primary text-[11px] font-bold px-2 py-0.5 rounded-lg"
                  >
                    + Custom URL
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const term = prompt("Enter target term ID to anchor jump to (e.g. pm-surya-ghar):");
                      const label = prompt("Enter link text:", term || "");
                      if (term && label) {
                        setTermForm({
                          ...termForm,
                          paragraphsText:
                            termForm.paragraphsText + ` <a href="#${term}">${label}</a>`,
                        });
                      }
                    }}
                    className="bg-white border border-slate-200 text-slate-700 hover:text-primary text-[11px] font-bold px-2 py-0.5 rounded-lg"
                  >
                    + Term Anchor (#)
                  </button>
                </div>

                <textarea
                  rows={5}
                  required
                  value={termForm.paragraphsText}
                  onChange={(e) => setTermForm({ ...termForm, paragraphsText: e.target.value })}
                  placeholder="Write plain-English explanation..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-primary leading-relaxed"
                />
              </div>

              {/* ── BLOCK HYPERLINK SECTION ("can make block hyperlink") ── */}
              <div className="bg-blue-50/60 border border-blue-200/60 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <LinkIcon size={16} className="text-blue-600" />
                  <span className="text-xs font-black uppercase tracking-wider text-blue-900">
                    Block Hyperlink &amp; Blog Connection
                  </span>
                </div>
                <p className="text-[11px] text-blue-700 leading-relaxed">
                  Make this glossary block link to a blog article, a solar solution page, or an external guide.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Hyperlink Target URL
                    </label>
                    <input
                      type="text"
                      value={termForm.linkUrl}
                      onChange={(e) => setTermForm({ ...termForm, linkUrl: e.target.value })}
                      placeholder="e.g. /solutions/on-grid-solar or /blog/slug"
                      className="w-full bg-white border border-blue-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Link Button Label
                    </label>
                    <input
                      type="text"
                      value={termForm.linkText}
                      onChange={(e) => setTermForm({ ...termForm, linkText: e.target.value })}
                      placeholder="e.g. Read Blog Article, Explore Solution"
                      className="w-full bg-white border border-blue-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Quick Link from Published Blogs dropdown */}
                {blogs && blogs.length > 0 && (
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Quick connect to a Published Blog Article:
                    </label>
                    <select
                      onChange={(e) => {
                        const slug = e.target.value;
                        if (slug) {
                          const blog = blogs.find((b) => b.slug === slug);
                          setTermForm({
                            ...termForm,
                            linkUrl: `/blog/${slug}`,
                            linkText: `Read: ${blog?.title || "Blog Article"}`,
                          });
                          e.target.value = "";
                        }
                      }}
                      className="w-full bg-white border border-blue-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none"
                    >
                      <option value="">-- Choose blog article to link --</option>
                      {blogs.map((b) => (
                        <option key={b.slug} value={b.slug}>
                          {b.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isBlockLink"
                    checked={termForm.isBlockLink}
                    onChange={(e) => setTermForm({ ...termForm, isBlockLink: e.target.checked })}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <label htmlFor="isBlockLink" className="text-xs text-slate-700 font-semibold cursor-pointer">
                    Make entire glossary card clickable to this URL
                  </label>
                </div>
              </div>

              {/* Note Section ("At SunLynk") */}
              <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sun size={15} className="text-amber-600" />
                    <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                      SunLynk Highlight Note (optional)
                    </span>
                  </div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-amber-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termForm.hasNote}
                      onChange={(e) => setTermForm({ ...termForm, hasNote: e.target.checked })}
                      className="rounded text-amber-600"
                    />
                    <span>Include Note</span>
                  </label>
                </div>

                {termForm.hasNote && (
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Note Tag</label>
                      <input
                        type="text"
                        value={termForm.noteTag}
                        onChange={(e) => setTermForm({ ...termForm, noteTag: e.target.value })}
                        placeholder="At SunLynk"
                        className="w-full bg-white border border-amber-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Note Text</label>
                      <textarea
                        rows={2}
                        value={termForm.noteText}
                        onChange={(e) => setTermForm({ ...termForm, noteText: e.target.value })}
                        placeholder="e.g. Most SunLynk Solar homes run on-grid systems."
                        className="w-full bg-white border border-amber-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Order */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Display Order</label>
                <input
                  type="number"
                  value={termForm.order}
                  onChange={(e) => setTermForm({ ...termForm, order: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-primary"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsTermModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 px-4 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2 px-5 rounded-xl shadow-sm"
                >
                  {actionLoading ? "Saving..." : editingTerm ? "Update Glossary Block" : "Create Glossary Block"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
