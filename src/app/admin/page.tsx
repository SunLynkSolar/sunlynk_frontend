"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Sun,
  LogOut,
  Users,
  FileText,
  FileSpreadsheet,
  Plus,
  Trash2,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  ChevronUp,
  ChevronDown,
  Image as ImageIcon,
  AlignLeft,
  Heading,
  List,
  LayoutGrid,
  Columns,
  Hash,
  Eye,
  BarChart3,
  PenLine,
  Newspaper,
  Minimize2,
  Edit3,
  ShieldCheck,
  Briefcase,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
} from "lucide-react";
import {
  parseMarkdownToBlocks,
  parseBlocksToMarkdown,
  compileBlocksToHTML,
  parseHTMLToBlocks,
  type ContentBlock,
  type HeadingBlock,
  type ParagraphBlock,
  type ImageBlock,
  type TwoColumnBlock,
  type ListBlock,
  type GridBlock,
} from "@/utils/markdown";

interface Comment {
  _id?: string;
  text: string;
  author: string;
  createdAt: string;
}

interface Lead {
  _id: string;
  type: "residential" | "society" | "commercial";
  fullName: string;
  whatsappNumber: string;
  pinCode: string;
  monthlyBill: string;
  societyName?: string;
  agmStatus?: string;
  designation?: string;
  companyName?: string;
  city?: string;
  status: "New" | "Interested" | "Not Interested" | "Contacted" | "Closed";
  comments: Comment[];
  tags: string[];
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: "superadmin" | "co_admin" | "bde" | "content_editor";
  createdAt: string;
}

interface WarrantyClaim {
  _id: string;
  name: string;
  email: string;
  phone: string;
  productSerial: string;
  purchaseDate: string;
  issueDescription: string;
  status: "Pending" | "Under Review" | "Resolved" | "Rejected";
  adminNotes: string;
  createdAt: string;
}

interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  isActive: boolean;
  createdAt: string;
}

interface JobApplication {
  _id: string;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  resumeLink: string;
  coverNote: string;
  status: "New" | "Reviewed" | "Shortlisted" | "Rejected";
  createdAt: string;
}

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  categories: string[];
  image: string;
  tags: string[];
  template: "editorial" | "magazine" | "minimal";
  blocks: ContentBlock[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminDashboard() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [activeTab, setActiveTab] = useState<"leads" | "blogs" | "users" | "warranty" | "careers" | "analytics">("leads");

  // Analytics state
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsPeriod, setAnalyticsPeriod] = useState<"daily" | "monthly" | "yearly">("daily");

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const [leads, setLeads] = useState<Lead[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [warranties, setWarranties] = useState<WarrantyClaim[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [selectedJobForApps, setSelectedJobForApps] = useState<Job | null>(null);
  const [warrantyStatusFilter, setWarrantyStatusFilter] = useState("all");
  const [appStatusFilter, setAppStatusFilter] = useState("all");

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newComment, setNewComment] = useState("");
  const [newTag, setNewTag] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [newUser, setNewUser] = useState({
    name: "", email: "", password: "",
    role: "bde" as "superadmin" | "co_admin" | "bde" | "content_editor",
  });

  const [careersSubTab, setCareersSubTab] = useState<"jobs" | "applications">("jobs");
  const [blogsSubTab, setBlogsSubTab] = useState<"articles" | "editor" | "categories" | "tags">("articles");

  const [categories, setCategories] = useState<{ _id: string; name: string; slug: string }[]>([]);
  const [tags, setTags] = useState<{ _id: string; name: string; slug: string }[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);

  // Job Form state
  const [jobForm, setJobForm] = useState({
    title: "", department: "", location: "", type: "Full-Time", description: "",
  });
  const [jobRequirements, setJobRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState("");
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [jobFormLoading, setJobFormLoading] = useState(false);

  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: "", excerpt: "", content: "", author: "",
    image: "/assets/images/blog_bifacial_panels.webp",
    template: "editorial" as "editorial" | "magazine" | "minimal",
  });
  const [blogBlocks, setBlogBlocks] = useState<ContentBlock[]>([]);
  const [blogTags, setBlogTags] = useState<string[]>([]);
  const [blogCategories, setBlogCategories] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState("");
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [blogEditorView, setBlogEditorView] = useState<"editor" | "preview">("editor");

  const [selectedBlockIdx, setSelectedBlockIdx] = useState<number | null>(null);
  const [dragFrom, setDragFrom] = useState<
    | { source: "palette"; blockType: ContentBlock["type"] }
    | { source: "canvas"; index: number }
    | null
  >(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(true);

  // New editor features state
  const [editorMode, setEditorMode] = useState<"blocks" | "markdown">("blocks");
  const [markdownContent, setMarkdownContent] = useState("");
  const [hasDraft, setHasDraft] = useState(false);
  const [draftTime, setDraftTime] = useState("");

  // ─── Block Helpers ────────────────────────────────────────────────────────
  const addBlock = useCallback((type: ContentBlock["type"]) => {
    let newBlock: ContentBlock;
    switch (type) {
      case "heading": newBlock = { type: "heading", level: 2, text: "" }; break;
      case "paragraph": newBlock = { type: "paragraph", text: "" }; break;
      case "image": newBlock = { type: "image", src: "", alt: "", caption: "" }; break;
      case "two_column": newBlock = { type: "two_column", left: [{ type: "paragraph", text: "" }], right: [{ type: "paragraph", text: "" }] }; break;
      case "list": newBlock = { type: "list", style: "bullet", items: ["First item"] }; break;
      case "grid": newBlock = { type: "grid", columns: 2, items: [{ image: "", caption: "" }, { image: "", caption: "" }] }; break;
      default: return;
    }
    setBlogBlocks((prev) => [...prev, newBlock]);
  }, []);

  const removeBlock = useCallback((index: number) => {
    setBlogBlocks((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const moveBlock = useCallback((index: number, dir: -1 | 1) => {
    setBlogBlocks((prev) => {
      const arr = [...prev];
      const target = index + dir;
      if (target < 0 || target >= arr.length) return arr;
      [arr[index], arr[target]] = [arr[target], arr[index]];
      return arr;
    });
  }, []);

  const updateBlock = useCallback((index: number, updates: Partial<ContentBlock>) => {
    setBlogBlocks((prev) =>
      prev.map((b, i) => (i === index ? { ...b, ...updates } as ContentBlock : b))
    );
  }, []);

  const insertBlockAt = useCallback((blockType: ContentBlock["type"], insertIdx: number) => {
    let nb: ContentBlock;
    switch (blockType) {
      case "heading": nb = { type: "heading", level: 2, text: "New Heading" }; break;
      case "paragraph": nb = { type: "paragraph", text: "Write your text here..." }; break;
      case "image": nb = { type: "image", src: "", alt: "", caption: "" }; break;
      case "two_column": nb = { type: "two_column", left: [{ type: "paragraph", text: "Left column" }], right: [{ type: "paragraph", text: "Right column" }] }; break;
      case "list": nb = { type: "list", style: "bullet", items: ["Item 1", "Item 2"] }; break;
      case "grid": nb = { type: "grid", columns: 2, items: [{ image: "", caption: "" }, { image: "", caption: "" }] }; break;
      default: return;
    }
    setBlogBlocks((prev) => {
      const a = [...prev];
      a.splice(insertIdx, 0, nb);
      return a;
    });
    setSelectedBlockIdx(insertIdx);
  }, []);

  // Auto-save draft logic
  useEffect(() => {
    if (loading || (!blogForm.title && blogBlocks.length === 0)) return;

    const timer = setTimeout(() => {
      const draft = {
        blogForm,
        blogBlocks: editorMode === "markdown" ? parseMarkdownToBlocks(markdownContent) : blogBlocks,
        blogTags,
        blogCategories,
        timestamp: new Date().toLocaleTimeString(),
      };
      localStorage.setItem("sunlynk_blog_draft", JSON.stringify(draft));
    }, 1500);

    return () => clearTimeout(timer);
  }, [blogForm, blogBlocks, blogTags, blogCategories, markdownContent, editorMode, loading]);

  // Check for existing draft on mount
  useEffect(() => {
    const saved = localStorage.getItem("sunlynk_blog_draft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.blogForm?.title || parsed.blogBlocks?.length > 0) {
          setHasDraft(true);
          setDraftTime(parsed.timestamp || "");
        }
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
  }, []);

  const restoreDraft = () => {
    const saved = localStorage.getItem("sunlynk_blog_draft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBlogForm(parsed.blogForm || { title: "", excerpt: "", content: "", author: "", image: "/assets/images/blog_bifacial_panels.webp", template: "editorial" });
        setBlogBlocks(parsed.blogBlocks || []);
        setBlogTags(parsed.blogTags || []);
        setBlogCategories(parsed.blogCategories || ["Technology"]);
        setMarkdownContent(parseBlocksToMarkdown(parsed.blogBlocks || []));
        setHasDraft(false);
      } catch (e) {
        alert("Failed to restore draft");
      }
    }
  };

  const discardDraft = () => {
    localStorage.removeItem("sunlynk_blog_draft");
    setHasDraft(false);
  };

  const applyLayoutTemplate = (templateName: "standard" | "listicle" | "guide") => {
    if (blogBlocks.length > 0 && !confirm("Loading a template will overwrite your current canvas. Proceed?")) {
      return;
    }
    let templates: ContentBlock[] = [];
    if (templateName === "standard") {
      templates = [
        { type: "heading", level: 2, text: "Introduction" },
        { type: "paragraph", text: "Start your introduction here. Hook the reader and explain the main topic of this post." },
        { type: "heading", level: 2, text: "Key Takeaways" },
        { type: "paragraph", text: "Explain the main points or features of the topic in detail. You can use images or column splits below to highlight information." },
        { type: "image", src: "/assets/images/blog_bifacial_panels.webp", alt: "Solar panel project installation", caption: "SunLynk solar project setup" },
        { type: "heading", level: 2, text: "Conclusion" },
        { type: "paragraph", text: "Wrap up your thoughts and summarize the key benefits or next steps for the user." }
      ];
    } else if (templateName === "listicle") {
      templates = [
        { type: "heading", level: 2, text: "Overview" },
        { type: "paragraph", text: "Briefly explain the list items you are covering and why they are important." },
        { type: "heading", level: 3, text: "1. Efficiency and Performance" },
        { type: "paragraph", text: "Describe the first item in the list and its significance." },
        { type: "heading", level: 3, text: "2. Maintenance and Longevity" },
        { type: "paragraph", text: "Describe the second item in the list and its benefits." },
        { type: "heading", level: 2, text: "Summary Chart" },
        { type: "list", style: "bullet", items: ["Fast installation", "High efficiency ratings", "Extended manufacturer warranty"] },
        { type: "paragraph", text: "Closing thoughts on how to choose between these options." }
      ];
    } else if (templateName === "guide") {
      templates = [
        { type: "heading", level: 2, text: "Step-by-Step Technical Guide" },
        { type: "paragraph", text: "Provide an introductory paragraph detailing the goal of this technical configuration guide." },
        { type: "heading", level: 2, text: "Required Equipment & Pre-requisites" },
        { type: "list", style: "ordered", items: ["SunLynk Hybrid Inverter", "Battery energy storage pack", "connection cable"] },
        { type: "heading", level: 2, text: "Configuration Interface" },
        {
          type: "two_column", left: [
            { type: "heading", level: 3, text: "Left Column: Settings" },
            { type: "paragraph", text: "Adjust the inverter charge settings under the advanced parameters tab." }
          ], right: [
            { type: "heading", level: 3, text: "Right Column: Results" },
            { type: "paragraph", text: "Ensure the telemetry light shows green and the dashboard logs show status 200." }
          ]
        },
        { type: "heading", level: 2, text: "Conclusion & Troubleshooting" },
        { type: "paragraph", text: "If you encounter errors, refer to the console debugger or contact the SunLynk support center." }
      ];
    }

    setBlogBlocks(templates);
    setMarkdownContent(parseBlocksToMarkdown(templates));
  };

  // ─── Auth & Data ──────────────────────────────────────────────────────────
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("userRole");
    const savedName = localStorage.getItem("userName");

    if (!savedToken) { router.push("/login"); return; }

    setToken(savedToken);
    setRole(savedRole);
    setUserName(savedName || "User");
    setActiveTab(savedRole === "content_editor" ? "blogs" : "leads");
    fetchData(savedToken, savedRole);
  }, [router]);

  const fetchAnalytics = useCallback(async () => {
    if (!token) return;
    setAnalyticsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/analytics/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAnalyticsData(data);
      } else {
        console.error("Failed to fetch analytics");
      }
    } catch (err) {
      console.error("Error fetching analytics stats:", err);
    } finally {
      setAnalyticsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (activeTab === "analytics" && !analyticsData && !analyticsLoading) {
      fetchAnalytics();
    }
  }, [activeTab, analyticsData, analyticsLoading, fetchAnalytics]);

  const fetchData = async (authToken: string, userRole: string | null) => {
    setLoading(true);
    setError("");
    try {
      const headers = { Authorization: `Bearer ${authToken}` };
      if (userRole === "superadmin" || userRole === "co_admin") {
        const [leadsRes, blogsRes, usersRes, warrantiesRes, jobsRes, categoriesRes, tagsRes] = await Promise.all([
          fetch(`${API_URL}/api/leads`, { headers }),
          fetch(`${API_URL}/api/blogs`),
          fetch(`${API_URL}/api/auth/users`, { headers }),
          fetch(`${API_URL}/api/warranty`, { headers }),
          fetch(`${API_URL}/api/jobs/all`, { headers }),
          fetch(`${API_URL}/api/categories`),
          fetch(`${API_URL}/api/tags`),
        ]);
        if (leadsRes.ok) setLeads(await leadsRes.json());
        if (blogsRes.ok) setBlogs(await blogsRes.json());
        if (usersRes.ok) setUsers(await usersRes.json());
        if (warrantiesRes.ok) setWarranties(await warrantiesRes.json());
        if (jobsRes.ok) setJobs(await jobsRes.json());
        if (categoriesRes.ok) setCategories(await categoriesRes.json());
        if (tagsRes.ok) setTags(await tagsRes.json());
      } else if (userRole === "bde") {
        const leadsRes = await fetch(`${API_URL}/api/leads`, { headers });
        if (leadsRes.ok) setLeads(await leadsRes.json());
      } else if (userRole === "content_editor") {
        const [blogsRes, categoriesRes, tagsRes] = await Promise.all([
          fetch(`${API_URL}/api/blogs`),
          fetch(`${API_URL}/api/categories`),
          fetch(`${API_URL}/api/tags`),
        ]);
        if (blogsRes.ok) setBlogs(await blogsRes.json());
        if (categoriesRes.ok) setCategories(await categoriesRes.json());
        if (tagsRes.ok) setTags(await tagsRes.json());
      }
    } catch {
      setError("Failed to connect to the backend server. Please make sure the API is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => { localStorage.clear(); router.push("/login"); };

  // ─── Lead Actions ─────────────────────────────────────────────────────────
  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/leads/${leadId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setLeads(leads.map((l) => (l._id === leadId ? updated : l)));
      if (selectedLead?._id === leadId) setSelectedLead(updated);
    } catch { alert("Error updating status"); }
    finally { setActionLoading(false); }
  };

  const addLeadComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !selectedLead) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/leads/${selectedLead._id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text: newComment }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setLeads(leads.map((l) => (l._id === selectedLead._id ? updated : l)));
      setSelectedLead(updated);
      setNewComment("");
    } catch { alert("Error adding comment"); }
    finally { setActionLoading(false); }
  };

  const addLeadTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim() || !selectedLead) return;
    setActionLoading(true);
    const updatedTags = [...selectedLead.tags, newTag.trim().toLowerCase()];
    try {
      const res = await fetch(`${API_URL}/api/leads/${selectedLead._id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ tags: updatedTags }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setLeads(leads.map((l) => (l._id === selectedLead._id ? updated : l)));
      setSelectedLead(updated);
      setNewTag("");
    } catch { alert("Error adding tag"); }
    finally { setActionLoading(false); }
  };

  const removeLeadTag = async (tagToRemove: string) => {
    if (!selectedLead) return;
    setActionLoading(true);
    const updatedTags = selectedLead.tags.filter((t) => t !== tagToRemove);
    try {
      const res = await fetch(`${API_URL}/api/leads/${selectedLead._id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ tags: updatedTags }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setLeads(leads.map((l) => (l._id === selectedLead._id ? updated : l)));
      setSelectedLead(updated);
    } catch { alert("Error removing tag"); }
    finally { setActionLoading(false); }
  };

  const deleteLeadRecord = async (leadId: string) => {
    if (!confirm("Are you sure you want to permanently delete this lead?")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/leads/${leadId}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setLeads(leads.filter((l) => l._id !== leadId));
      if (selectedLead?._id === leadId) setSelectedLead(null);
    } catch { alert("Error deleting lead"); }
    finally { setActionLoading(false); }
  };

  const exportLeadsToCSV = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/leads/export`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads_export_${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      alert("Error exporting leads to CSV");
    } finally {
      setActionLoading(false);
    }
  };

  // ─── User Actions ─────────────────────────────────────────────────────────
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create user");
      setUsers([...users, data]);
      setNewUser({ name: "", email: "", password: "", role: "bde" });
      alert("Staff user account created successfully!");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error creating user");
    } finally { setActionLoading(false); }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this staff account?")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/users/${userId}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setUsers(users.filter((u) => u._id !== userId));
    } catch { alert("Error deleting user"); }
    finally { setActionLoading(false); }
  };

  // ─── Blog Actions ─────────────────────────────────────────────────────────
  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    let finalBlocks = blogBlocks;
    if (editorMode === "markdown") {
      finalBlocks = parseMarkdownToBlocks(markdownContent);
      setBlogBlocks(finalBlocks);
    }

    const slug = blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const now = new Date();
    const day = now.getDate().toString();
    const month = now.toLocaleString("en-IN", { month: "short" });
    const date = now.toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

    const compiledContent = compileBlocksToHTML(finalBlocks);

    const payload = {
      ...blogForm,
      slug,
      author: blogForm.author || userName,
      date, day, month,
      tags: blogTags,
      categories: blogCategories,
      template: blogForm.template,
      blocks: finalBlocks,
      content: compiledContent,
      commentsCount: 0,
    };

    try {
      const url = editingBlogId ? `${API_URL}/api/blogs/${editingBlogId}` : `${API_URL}/api/blogs`;
      const method = editingBlogId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      if (editingBlogId) {
        setBlogs(blogs.map((b) => (b._id === editingBlogId ? saved : b)));
        setEditingBlogId(null);
        alert("Blog article updated successfully!");
      } else {
        setBlogs([saved, ...blogs]);
        alert("Blog article published successfully!");
      }
      localStorage.removeItem("sunlynk_blog_draft");
      setHasDraft(false);
      resetBlogForm();
    } catch { alert("Error saving blog"); }
    finally { setActionLoading(false); }
  };

  const resetBlogForm = () => {
    setBlogForm({ title: "", excerpt: "", content: "", author: "", image: "/assets/images/blog_bifacial_panels.webp", template: "editorial" });
    setBlogBlocks([]);
    setMarkdownContent("");
    setBlogTags([]);
    setBlogCategories(["Technology"]);
    setNewTagInput("");
    setNewCategoryInput("");
    setEditingBlogId(null);
    setSelectedBlockIdx(null);
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlogId(blog._id);
    setBlogForm({
      title: blog.title, excerpt: blog.excerpt, content: blog.content || "",
      image: blog.image, author: blog.author, template: blog.template || "editorial",
    });
    let loadedBlocks = (blog.blocks as ContentBlock[]) || [];
    if (loadedBlocks.length === 0 && blog.content) {
      loadedBlocks = parseHTMLToBlocks(blog.content);
    }
    setBlogBlocks(loadedBlocks);
    setMarkdownContent(parseBlocksToMarkdown(loadedBlocks));
    setBlogTags(blog.tags || []);
    setBlogCategories(blog.categories || [blog.category]);
    setSelectedBlockIdx(null);
    setBlogEditorView("editor");
    setBlogsSubTab("editor");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/blogs/${blogId}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setBlogs(blogs.filter((b) => b._id !== blogId));
    } catch { alert("Error deleting blog"); }
    finally { setActionLoading(false); }
  };

  // ─── Category CRUD ────────────────────────────────────────────────────────
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create category");
      }
      const saved = await res.json();
      setCategories((prev) => [...prev, saved].sort((a, b) => a.name.localeCompare(b.name)));
      setNewCategoryName("");
    } catch (err: any) {
      alert(err.message || "Error creating category");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteCategory = async (catId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/categories/${catId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete category");
      }
      setCategories((prev) => prev.filter((c) => c._id !== catId));
    } catch (err: any) {
      alert(err.message || "Error deleting category");
    } finally {
      setActionLoading(false);
    }
  };

  // ─── Tag CRUD ─────────────────────────────────────────────────────────────
  const handleCreateTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName.trim()) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: newTagName.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create tag");
      }
      const saved = await res.json();
      setTags((prev) => [...prev, saved].sort((a, b) => a.name.localeCompare(b.name)));
      setNewTagName("");
    } catch (err: any) {
      alert(err.message || "Error creating tag");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    if (!confirm("Are you sure you want to delete this tag?")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/tags/${tagId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete tag");
      }
      setTags((prev) => prev.filter((t) => t._id !== tagId));
    } catch (err: any) {
      alert(err.message || "Error deleting tag");
    } finally {
      setActionLoading(false);
    }
  };

  // ─── Multer Upload helper ─────────────────────────────────────────────────
  const handleImageFileUpload = async (file: File, onSuccess: (url: string) => void) => {
    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(`${API_URL}/api/upload/image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to upload image file");
      }
      const data = await res.json();
      onSuccess(data.url);
    } catch (err: any) {
      alert(err.message || "Error uploading image");
    } finally {
      setUploadLoading(false);
    }
  };

  // ─── Warranty Actions ─────────────────────────────────────────────────────
  const updateWarrantyStatus = async (id: string, status: string, adminNotes?: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/warranty/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status, adminNotes }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setWarranties(warranties.map((w) => (w._id === id ? updated : w)));
    } catch { alert("Error updating warranty status"); }
    finally { setActionLoading(false); }
  };

  const deleteWarranty = async (id: string) => {
    if (!confirm("Permanently delete this warranty claim?")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/warranty/${id}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setWarranties(warranties.filter((w) => w._id !== id));
    } catch { alert("Error deleting warranty claim"); }
    finally { setActionLoading(false); }
  };

  // ─── Job Actions ──────────────────────────────────────────────────────────
  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setJobFormLoading(true);
    try {
      const url = editingJobId ? `${API_URL}/api/jobs/${editingJobId}` : `${API_URL}/api/jobs`;
      const method = editingJobId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...jobForm, requirements: jobRequirements }),
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      if (editingJobId) {
        setJobs(jobs.map((j) => (j._id === editingJobId ? saved : j)));
        setEditingJobId(null);
      } else {
        setJobs([saved, ...jobs]);
      }
      setJobForm({ title: "", department: "", location: "", type: "Full-Time", description: "" });
      setJobRequirements([]);
      alert(editingJobId ? "Job updated!" : "Job posted successfully!");
    } catch { alert("Error saving job"); }
    finally { setJobFormLoading(false); }
  };

  const handleToggleJob = async (jobId: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/jobs/${jobId}/toggle`, {
        method: "PATCH", headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setJobs(jobs.map((j) => (j._id === jobId ? updated : j)));
    } catch { alert("Error toggling job status"); }
    finally { setActionLoading(false); }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Permanently delete this job posting?")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/jobs/${jobId}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setJobs(jobs.filter((j) => j._id !== jobId));
      if (selectedJobForApps?._id === jobId) setSelectedJobForApps(null);
    } catch { alert("Error deleting job"); }
    finally { setActionLoading(false); }
  };

  const fetchApplicationsForJob = async (job: Job) => {
    setSelectedJobForApps(job);
    setCareersSubTab("applications");
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/jobs/${job._id}/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setApplications(await res.json());
    } catch { alert("Error fetching applications"); }
    finally { setActionLoading(false); }
  };

  const updateApplicationStatus = async (appId: string, status: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/jobs/applications/${appId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setApplications(applications.map((a) => (a._id === appId ? updated : a)));
    } catch { alert("Error updating application status"); }
    finally { setActionLoading(false); }
  };

  const deleteApplication = async (appId: string) => {
    if (!confirm("Permanently delete this application?")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/jobs/applications/${appId}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setApplications(applications.filter((a) => a._id !== appId));
    } catch { alert("Error deleting application"); }
    finally { setActionLoading(false); }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesType = typeFilter === "all" || lead.type === typeFilter;
    return matchesStatus && matchesType;
  });

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">

      {/* ── Header ── */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sm:px-8 flex justify-between items-center z-10 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
            <Sun className="w-5.5 h-5.5 animate-spin-slow" />
          </div>
          <div>
            <span className="text-base font-black tracking-wider block text-slate-900">SunLynk Solar</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Console</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-slate-700 block">{userName}</span>
            <span className="text-[9px] font-black uppercase text-primary tracking-widest">{role} panel</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-200 py-2 px-3.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

        {/* ── Sidebar ── */}
        <aside className="w-full md:w-60 bg-white border-r border-slate-200 flex flex-row md:flex-col py-2 md:py-6 px-4 md:px-3 gap-2 shrink-0 md:justify-start justify-center overflow-x-auto">
          {role !== "content_editor" && (
            <button
              onClick={() => setActiveTab("leads")}
              className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-2.5 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "leads" ? "bg-primary text-white shadow-md shadow-primary/10" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
            >
              <FileSpreadsheet size={16} />
              <span className="whitespace-nowrap">Leads Management</span>
            </button>
          )}
          {(role === "superadmin" || role === "co_admin" || role === "content_editor") && (
            <button
              onClick={() => setActiveTab("blogs")}
              className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-2.5 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "blogs" ? "bg-primary text-white shadow-md shadow-primary/10" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
            >
              <FileText size={16} />
              <span className="whitespace-nowrap">Blog Articles</span>
            </button>
          )}
          {(role === "superadmin" || role === "co_admin") && (
            <button
              onClick={() => setActiveTab("warranty")}
              className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-2.5 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "warranty" ? "bg-primary text-white shadow-md shadow-primary/10" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
            >
              <ShieldCheck size={16} />
              <span className="whitespace-nowrap">Warranty Claims</span>
            </button>
          )}
          {(role === "superadmin" || role === "co_admin") && (
            <button
              onClick={() => setActiveTab("careers")}
              className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-2.5 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "careers" ? "bg-primary text-white shadow-md shadow-primary/10" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
            >
              <Briefcase size={16} />
              <span className="whitespace-nowrap">Careers & Jobs</span>
            </button>
          )}
          {(role === "superadmin" || role === "co_admin") && (
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-2.5 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "users" ? "bg-primary text-white shadow-md shadow-primary/10" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
            >
              <Users size={16} />
              <span className="whitespace-nowrap">Staff Accounts</span>
            </button>
          )}
          {(role === "superadmin" || role === "co_admin") && (
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-2.5 py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === "analytics" ? "bg-primary text-white shadow-md shadow-primary/10" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}
            >
              <BarChart3 size={16} />
              <span className="whitespace-nowrap">Web Analytics</span>
            </button>
          )}
        </aside>

        {/* ── Main ── */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6 sm:p-8 flex flex-col justify-start">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm py-4 px-5 rounded-2xl">{error}</div>
          )}

          {/* Draft Recovery Banner */}
          {hasDraft && activeTab === "blogs" && (
            <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-800 text-xs py-3.5 px-5 rounded-2xl flex items-center justify-between shadow-sm animate-in fade-in">
              <div className="flex items-center gap-2.5">
                <Clock size={16} className="text-amber-600 animate-pulse" />
                <span>You have an autosaved blog draft from <strong>{draftTime}</strong>. Would you like to restore it?</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button type="button" onClick={restoreDraft} className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-1.5 px-3 rounded-lg transition-colors cursor-pointer text-[11px]">Restore Draft</button>
                <button type="button" onClick={discardDraft} className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-1.5 px-3 rounded-lg transition-colors cursor-pointer text-[11px]">Dismiss</button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <span className="text-sm text-slate-500 font-semibold">Loading console data...</span>
            </div>
          ) : (
            <>
              {/* ═══════════════ LEADS TAB ═══════════════ */}
              {activeTab === "leads" && role !== "content_editor" && (
                <div className="flex-1 flex flex-col gap-6 lg:grid lg:grid-cols-12 items-start">

                  {/* Leads List */}
                  <div className={`${selectedLead ? "lg:col-span-7" : "lg:col-span-12"} w-full flex flex-col gap-5`}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 text-left">Leads Captured</h2>
                        <p className="text-xs text-slate-500 text-left">Real-time submissions from contact form</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={exportLeadsToCSV}
                          disabled={actionLoading || leads.length === 0}
                          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-sm shadow-emerald-600/10"
                        >
                          {actionLoading ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <FileSpreadsheet size={14} />
                          )}
                          <span>Export CSV</span>
                        </button>
                        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
                          className="bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-bold text-slate-700 focus:outline-none focus:border-primary">
                          <option value="all">All Types</option>
                          <option value="residential">Residential</option>
                          <option value="society">Housing Society</option>
                          <option value="commercial">Commercial</option>
                        </select>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                          className="bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-bold text-slate-700 focus:outline-none focus:border-primary">
                          <option value="all">All Statuses</option>
                          <option value="New">New</option>
                          <option value="Interested">Interested</option>
                          <option value="Not Interested">Not Interested</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                            <tr>
                              <th className="py-4 px-5">Lead Name</th>
                              <th className="py-4 px-4">Contact</th>
                              <th className="py-4 px-4">Type</th>
                              <th className="py-4 px-4">Status</th>
                              <th className="py-4 px-5 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {filteredLeads.length === 0 ? (
                              <tr>
                                <td colSpan={5} className="py-8 text-center text-slate-400 font-medium">No leads found matching filters.</td>
                              </tr>
                            ) : (
                              filteredLeads.map((lead) => (
                                <tr key={lead._id} onClick={() => setSelectedLead(lead)}
                                  className={`hover:bg-slate-50/50 transition-colors cursor-pointer ${selectedLead?._id === lead._id ? "bg-slate-50" : ""}`}>
                                  <td className="py-4 px-5 font-bold text-slate-900 text-left">
                                    {lead.fullName}
                                    <span className="block text-[10px] text-slate-400 font-medium mt-0.5">PIN: {lead.pinCode}</span>
                                  </td>
                                  <td className="py-4 px-4 font-semibold text-slate-700 text-left">{lead.whatsappNumber}</td>
                                  <td className="py-4 px-4 text-left">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase ${lead.type === "residential" ? "bg-blue-50 text-blue-700 border border-blue-200/50" : lead.type === "society" ? "bg-purple-50 text-purple-700 border border-purple-200/50" : "bg-orange-50 text-orange-700 border border-orange-200/50"}`}>
                                      {lead.type}
                                    </span>
                                  </td>
                                  <td className="py-4 px-4 text-left">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase ${lead.status === "New" ? "bg-sky-50 text-sky-700 border border-sky-200" : lead.status === "Interested" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : lead.status === "Not Interested" ? "bg-rose-50 text-rose-700 border border-rose-200" : lead.status === "Contacted" ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-slate-100 text-slate-600 border border-slate-200"}`}>
                                      {lead.status}
                                    </span>
                                  </td>
                                  <td className="py-4 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex gap-2 justify-end">
                                      <button onClick={() => setSelectedLead(lead)}
                                        className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-1 px-2.5 rounded transition-all cursor-pointer">
                                        View
                                      </button>
                                      {role === "superadmin" && (
                                        <button onClick={() => deleteLeadRecord(lead._id)}
                                          className="text-red-650 hover:text-red-705 p-1 rounded hover:bg-red-50 transition-all cursor-pointer"
                                        >
                                          <Trash2 size={14} />
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Lead Detail Panel */}
                  {selectedLead && (
                    <div className="lg:col-span-5 w-full bg-white border border-slate-200 rounded-2xl p-6 shadow-xl flex flex-col gap-6 text-left relative animate-in fade-in slide-in-from-right-4 duration-300">
                      <button onClick={() => setSelectedLead(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                        <XCircle size={20} />
                      </button>
                      <div>
                        <span className="text-[10px] uppercase font-black tracking-widest text-primary">Lead Details</span>
                        <h3 className="text-xl font-extrabold text-slate-900 mt-1">{selectedLead.fullName}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Submitted: {new Date(selectedLead.createdAt).toLocaleString()}</p>
                      </div>

                      {/* Status controls */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-3">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Update Lead Status</span>
                        <div className="flex flex-wrap gap-2">
                          {(["Interested", "Not Interested", "Contacted"] as const).map((s) => (
                            <button key={s} onClick={() => updateLeadStatus(selectedLead._id, s)} disabled={actionLoading}
                              className={`flex items-center gap-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${selectedLead.status === s ? (s === "Interested" ? "bg-emerald-600 text-white" : s === "Not Interested" ? "bg-rose-600 text-white" : "bg-amber-600 text-white") : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"}`}>
                              {s === "Interested" && <CheckCircle size={12} />}
                              {s === "Not Interested" && <XCircle size={12} />}
                              {s === "Contacted" && <Clock size={12} />}
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Fields */}
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        {[
                          { label: "WhatsApp", value: selectedLead.whatsappNumber, color: "" },
                          { label: "Monthly Bill", value: selectedLead.monthlyBill, color: "text-primary" },
                          { label: "PIN Code", value: selectedLead.pinCode, color: "" },
                          { label: "Form Type", value: selectedLead.type.toUpperCase(), color: "text-purple-600" },
                        ].map(({ label, value, color }) => (
                          <div key={label} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wide">{label}</span>
                            <span className={`font-semibold mt-1 block ${color || "text-slate-800"}`}>{value}</span>
                          </div>
                        ))}
                        {selectedLead.type === "society" && (<>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 col-span-2">
                            <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wide">Society Name</span>
                            <span className="font-semibold text-slate-800 mt-1 block">{selectedLead.societyName}</span>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wide">AGM Approval</span>
                            <span className="font-semibold text-slate-800 mt-1 block">{selectedLead.agmStatus}</span>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wide">Designation</span>
                            <span className="font-semibold text-slate-800 mt-1 block">{selectedLead.designation}</span>
                          </div>
                        </>)}
                        {selectedLead.type === "commercial" && (<>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 col-span-2">
                            <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wide">Company Name</span>
                            <span className="font-semibold text-slate-800 mt-1 block">{selectedLead.companyName}</span>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 col-span-2">
                            <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wide">City</span>
                            <span className="font-semibold text-slate-800 mt-1 block">{selectedLead.city}</span>
                          </div>
                        </>)}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-col gap-3">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Tags / Labels</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedLead.tags.length === 0
                            ? <span className="text-xs text-slate-400 italic">No tags associated.</span>
                            : selectedLead.tags.map((tag) => (
                              <span key={tag} className="bg-slate-100 text-slate-700 text-[10px] font-bold py-1 pl-2.5 pr-1.5 rounded-full border border-slate-200 flex items-center gap-1 capitalize">
                                {tag}
                                <button type="button" onClick={() => removeLeadTag(tag)} className="text-slate-400 hover:text-red-500 p-0.5 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"><XCircle size={10} /></button>
                              </span>
                            ))
                          }
                        </div>
                        <form onSubmit={addLeadTag} className="flex gap-2 mt-1">
                          <input type="text" placeholder="Add new tag..." value={newTag} onChange={(e) => setNewTag(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-primary flex-1 outline-none text-slate-800" />
                          <button type="submit" disabled={actionLoading || !newTag.trim()}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold p-2.5 rounded-lg text-xs transition-colors shrink-0 disabled:opacity-50 cursor-pointer">
                            <Plus size={14} />
                          </button>
                        </form>
                      </div>

                      {/* Comments */}
                      <div className="border-t border-slate-200 pt-5 flex flex-col gap-4 flex-1 overflow-hidden min-h-[220px]">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <MessageSquare size={14} className="text-primary" /> Comment History
                        </h4>
                        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 max-h-[220px]">
                          {selectedLead.comments.length === 0
                            ? <p className="text-xs text-slate-400 italic py-2 text-center">No comments added yet.</p>
                            : selectedLead.comments.map((comment, index) => (
                              <div key={index} className="bg-slate-50 p-3 rounded-lg border border-slate-200/75">
                                <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold mb-1">
                                  <span>{comment.author}</span>
                                  <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-xs text-slate-700 leading-normal font-medium">{comment.text}</p>
                              </div>
                            ))
                          }
                        </div>
                        <form onSubmit={addLeadComment} className="flex gap-2">
                          <input type="text" placeholder="Add action note or status comment..." required value={newComment} onChange={(e) => setNewComment(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-primary flex-1 outline-none text-slate-800" />
                          <button type="submit" disabled={actionLoading || !newComment.trim()}
                            className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg text-xs transition-colors shrink-0 disabled:opacity-50 cursor-pointer">
                            Add
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ═══════════════ BLOGS TAB ═══════════════ */}
              {activeTab === "blogs" && (role === "superadmin" || role === "co_admin" || role === "content_editor") && (
                <div className="flex-1 flex flex-col gap-6">

                  {/* Blogs Sub-tabs */}
                  <div className="flex border-b border-slate-200 mb-6 shrink-0 bg-white p-2 rounded-2xl shadow-sm gap-2">
                    {([
                      { id: "articles", label: "Published Articles", icon: Newspaper },
                      { id: "editor", label: editingBlogId ? "Edit Article" : "Write Article", icon: PenLine },
                      { id: "categories", label: "Categories", icon: List },
                      { id: "tags", label: "Tags", icon: Hash },
                    ] as const).map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => {
                            setBlogsSubTab(tab.id);
                            if (tab.id !== "editor" && !editingBlogId) resetBlogForm();
                          }}
                          className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${blogsSubTab === tab.id
                            ? "bg-primary text-white shadow-md shadow-primary/10"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                        >
                          <Icon size={14} />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* SUB-TAB: Articles List */}
                  {blogsSubTab === "articles" && (
                    <div className="flex flex-col gap-5 text-left">
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">Published Articles</h2>
                        <p className="text-xs text-slate-500">Manage blog content displayed on the public website</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {blogs.length === 0 ? (
                          <div className="col-span-3 text-center py-12 bg-white border border-slate-200 rounded-2xl text-slate-400 font-semibold">
                            No blog posts found. Write one in the editor tab!
                          </div>
                        ) : (
                          blogs.map((blog) => (
                            <div key={blog._id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                              <div>
                                <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden border-b border-slate-200">
                                  <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-300 font-bold text-xs">[ Image ]</div>
                                  <img src={blog.image.startsWith("/uploads") ? `${API_URL}${blog.image}` : blog.image} alt={blog.title} className="absolute inset-0 w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = "none"; }} />
                                  <div className="absolute top-3 left-3 flex gap-1 flex-wrap">
                                    {(blog.categories || [blog.category]).slice(0, 2).map((cat) => (
                                      <span key={cat} className="bg-primary text-white text-[9px] uppercase font-bold py-0.5 px-2 rounded-md">{cat}</span>
                                    ))}
                                  </div>
                                  {blog.template && (
                                    <span className="absolute top-3 right-3 bg-black/70 text-white text-[9px] uppercase font-bold py-0.5 px-2 rounded-full">{blog.template}</span>
                                  )}
                                </div>
                                <div className="p-5">
                                  <span className="text-[10px] text-slate-500 font-bold block mb-1">{blog.date} • {blog.author}</span>
                                  <h4 className="font-extrabold text-slate-900 text-sm leading-snug mb-2 line-clamp-2">{blog.title}</h4>
                                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{blog.excerpt}</p>
                                  {(blog.tags || []).length > 0 && (
                                    <div className="flex gap-1 flex-wrap mt-2">
                                      {(blog.tags || []).slice(0, 3).map((tag) => (
                                        <span key={tag} className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-semibold">#{tag}</span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="p-5 pt-0 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-[10px] font-mono text-slate-400 truncate max-w-[120px]">/{blog.slug}</span>
                                <div className="flex gap-2">
                                  <button onClick={() => handleEditBlog(blog)}
                                    className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-1.5 px-3 rounded-lg text-[11px] transition-colors cursor-pointer border border-slate-200/50">
                                    <Edit3 size={11} /> Edit
                                  </button>
                                  {role === "superadmin" && (
                                    <button onClick={() => handleDeleteBlog(blog._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-all cursor-pointer">
                                      <Trash2 size={13} />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* SUB-TAB: Editor */}
                  {blogsSubTab === "editor" && (
                    <form onSubmit={handleBlogSubmit}>
                      <div className="flex rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white"
                        style={{ height: "calc(100vh - 230px)", minHeight: 600 }}>

                        {/* LEFT PANEL */}
                        <div className="w-72 shrink-0 bg-[#1a1f2e] flex flex-col overflow-hidden border-r border-slate-700 text-left">
                          <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-2">
                              <Sun size={16} className="text-primary" />
                              <span className="text-white text-xs font-extrabold tracking-wider uppercase">Blog Editor</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">{blogBlocks.length} blocks</span>
                          </div>

                          <div className="flex-1 overflow-y-auto">
                            {/* Settings accordion */}
                            <div className="border-b border-slate-700">
                              <button type="button" onClick={() => setSettingsOpen(!settingsOpen)}
                                className="w-full px-4 py-3 flex items-center justify-between text-slate-300 hover:text-white hover:bg-slate-700/40 transition-colors cursor-pointer">
                                <span className="text-[10px] font-black uppercase tracking-widest">Article Settings</span>
                                <ChevronDown size={13} className={`transition-transform ${settingsOpen ? "rotate-180" : ""}`} />
                              </button>
                              {settingsOpen && (
                                <div className="px-4 pb-4 flex flex-col gap-3">
                                  {/* Template */}
                                  <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Template</label>
                                    <div className="grid grid-cols-3 gap-1.5">
                                      {(["editorial", "magazine", "minimal"] as const).map((t) => (
                                        <button key={t} type="button" onClick={() => setBlogForm({ ...blogForm, template: t })}
                                          className={`py-2 rounded-lg text-[10px] font-bold capitalize transition-all cursor-pointer ${blogForm.template === t ? "bg-primary text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}>
                                          {t}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                  {/* Title */}
                                  <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Title *</label>
                                    <input required value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                                      placeholder="Article title"
                                      className="w-full bg-slate-800 border border-slate-600 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-primary placeholder:text-slate-500" />
                                  </div>
                                  {/* Excerpt */}
                                  <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Excerpt *</label>
                                    <textarea required rows={2} value={blogForm.excerpt} onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                                      placeholder="Short description..."
                                      className="w-full bg-slate-800 border border-slate-600 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-primary placeholder:text-slate-500 resize-none" />
                                  </div>
                                  {/* Hero Image */}
                                  <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Hero Image *</label>
                                    <div className="flex gap-2 mb-1.5">
                                      <input required value={blogForm.image} onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                                        placeholder="/assets/images/..."
                                        className="flex-grow bg-slate-800 border border-slate-600 rounded-lg py-2 px-3 text-[11px] text-white focus:outline-none focus:border-primary placeholder:text-slate-500 min-w-0" />
                                      <label className="bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white rounded-lg py-2 px-3 text-[10px] font-bold cursor-pointer transition-colors shrink-0 flex items-center justify-center">
                                        {uploadLoading ? "..." : "Upload"}
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) handleImageFileUpload(file, (url) => setBlogForm({ ...blogForm, image: url }));
                                        }} />
                                      </label>
                                    </div>
                                    {blogForm.image && (
                                      <div className="mt-2 rounded-lg overflow-hidden aspect-video border border-slate-600 bg-slate-900">
                                        <img src={blogForm.image.startsWith("/uploads") ? `${API_URL}${blogForm.image}` : blogForm.image} alt="hero" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = "none"; }} />
                                      </div>
                                    )}
                                  </div>
                                  {/* Author */}
                                  <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Author</label>
                                    <input value={blogForm.author} onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                                      placeholder={`Default: ${userName}`}
                                      className="w-full bg-slate-800 border border-slate-600 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-primary placeholder:text-slate-500" />
                                  </div>
                                  {/* Categories */}
                                  <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Categories</label>
                                    <div className="flex flex-wrap gap-1 mb-2">
                                      {blogCategories.map((cat) => (
                                        <span key={cat} className="inline-flex items-center gap-1 text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 pl-2 pr-1 py-0.5 rounded-full">
                                          {cat}
                                          <button type="button" onClick={() => setBlogCategories(blogCategories.filter((c) => c !== cat))} className="cursor-pointer"><XCircle size={9} /></button>
                                        </span>
                                      ))}
                                    </div>
                                    <div className="flex flex-wrap gap-1 mb-2 max-h-24 overflow-y-auto border border-slate-700/60 p-1.5 rounded bg-slate-800/50">
                                      {categories.filter((c) => !blogCategories.includes(c.name)).length === 0 ? (
                                        <span className="text-[9px] text-slate-500">No other categories available.</span>
                                      ) : (
                                        categories.filter((c) => !blogCategories.includes(c.name)).map((cat) => (
                                          <button key={cat._id} type="button" onClick={() => setBlogCategories([...blogCategories, cat.name])}
                                            className="text-[9px] font-bold text-slate-400 border border-slate-600 px-2 py-1 rounded-full hover:border-primary hover:text-primary transition-all cursor-pointer bg-slate-800">{cat.name}</button>
                                        ))
                                      )}
                                    </div>
                                  </div>
                                  {/* Tags */}
                                  <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Tags</label>
                                    <div className="flex flex-wrap gap-1 mb-2">
                                      {blogTags.map((tag) => (
                                        <span key={tag} className="inline-flex items-center gap-1 text-[10px] font-bold bg-slate-700 text-slate-200 border border-slate-600 pl-2 pr-1 py-0.5 rounded-full">
                                          #{tag}
                                          <button type="button" onClick={() => setBlogTags(blogTags.filter((t) => t !== tag))} className="cursor-pointer"><XCircle size={9} /></button>
                                        </span>
                                      ))}
                                    </div>
                                    <div className="flex flex-wrap gap-1 mb-2 max-h-24 overflow-y-auto border border-slate-700/60 p-1.5 rounded bg-slate-800/50">
                                      {tags.filter((t) => !blogTags.includes(t.name)).length === 0 ? (
                                        <span className="text-[9px] text-slate-500">No other tags available.</span>
                                      ) : (
                                        tags.filter((t) => !blogTags.includes(t.name)).map((tag) => (
                                          <button key={tag._id} type="button" onClick={() => setBlogTags([...blogTags, tag.name])}
                                            className="text-[9px] font-bold text-slate-300 border border-slate-600 px-2 py-1 rounded-full hover:border-primary hover:text-primary transition-all cursor-pointer bg-slate-800">#{tag.name}</button>
                                        ))
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Elements palette */}
                            <div className="px-4 py-4">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Elements — Drag to Canvas</p>
                              <div className="grid grid-cols-2 gap-2">
                                {([
                                  { blockType: "heading" as const, label: "Heading", icon: Heading, color: "from-violet-500 to-purple-600", desc: "H2 / H3" },
                                  { blockType: "paragraph" as const, label: "Paragraph", icon: AlignLeft, color: "from-blue-500 to-sky-600", desc: "Body text" },
                                  { blockType: "image" as const, label: "Image", icon: ImageIcon, color: "from-emerald-500 to-teal-600", desc: "Single image" },
                                  { blockType: "two_column" as const, label: "2 Columns", icon: Columns, color: "from-orange-500 to-amber-600", desc: "Side by side" },
                                  { blockType: "list" as const, label: "List", icon: List, color: "from-rose-500 to-pink-600", desc: "Bullet / ordered" },
                                  { blockType: "grid" as const, label: "Image Grid", icon: LayoutGrid, color: "from-cyan-500 to-blue-600", desc: "2 or 3 col" },
                                ]).map((el) => (
                                  <div key={el.blockType} draggable
                                    onDragStart={() => setDragFrom({ source: "palette", blockType: el.blockType })}
                                    onDragEnd={() => setDragFrom(null)}
                                    onClick={() => insertBlockAt(el.blockType, blogBlocks.length)}
                                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-800 border border-slate-700 hover:border-primary/60 hover:bg-slate-700/60 cursor-grab active:cursor-grabbing transition-all select-none">
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${el.color} flex items-center justify-center shadow-md`}>
                                      <el.icon size={14} className="text-white" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-200 text-center leading-tight">{el.label}</span>
                                    <span className="text-[9px] text-slate-500 text-center">{el.desc}</span>
                                  </div>
                                ))}
                              </div>
                              <p className="text-center text-[10px] text-slate-600 mt-3">Click or drag to add</p>
                            </div>
                          </div>

                          {/* Publish button */}
                          <div className="p-4 border-t border-slate-700 shrink-0 flex gap-2">
                            <button type="submit" disabled={actionLoading}
                              className="flex-1 bg-primary hover:bg-primary/90 text-white font-extrabold py-3 rounded-xl shadow-lg transition-all text-xs cursor-pointer">
                              {actionLoading ? "Saving..." : editingBlogId ? "Update Article" : "Publish Article"}
                            </button>
                            {editingBlogId && (
                              <button type="button" onClick={resetBlogForm}
                                className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-3 px-3 rounded-xl transition-all cursor-pointer text-xs">
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>

                        {/* CENTER CANVAS & EDITOR HEADERS */}
                        <div className="flex-1 bg-slate-100 flex flex-col overflow-hidden">

                          {/* Canvas toolbar */}
                          <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between shrink-0 gap-3">
                            <div className="flex bg-slate-200/70 p-0.5 rounded-lg border border-slate-300/40">
                              <button
                                type="button"
                                onClick={() => {
                                  if (editorMode === "markdown") {
                                    const parsed = parseMarkdownToBlocks(markdownContent);
                                    setBlogBlocks(parsed);
                                  }
                                  setEditorMode("blocks");
                                }}
                                className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${editorMode === "blocks" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                              >
                                Visual Canvas
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (editorMode === "blocks") {
                                    const md = parseBlocksToMarkdown(blogBlocks);
                                    setMarkdownContent(md);
                                  }
                                  setEditorMode("markdown");
                                }}
                                className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${editorMode === "markdown" ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
                              >
                                Markdown Editor
                              </button>
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Start Layout:</span>
                              <select
                                onChange={(e) => {
                                  if (e.target.value) {
                                    applyLayoutTemplate(e.target.value as any);
                                    e.target.value = "";
                                  }
                                }}
                                className="bg-white border border-slate-200 rounded px-2.5 py-1 text-xs font-bold text-slate-700 focus:outline-none focus:border-primary"
                              >
                                <option value="">-- Choose Template --</option>
                                <option value="standard">Standard Article</option>
                                <option value="listicle">Listicle Post</option>
                                <option value="guide">Technical Guide</option>
                              </select>
                            </div>
                          </div>

                          {/* Editor space */}
                          <div className="flex-1 overflow-y-auto"
                            onDragOver={(e) => { e.preventDefault(); if (dragFrom?.source === "palette") setDragOverIdx(blogBlocks.length); }}
                            onDrop={(e) => {
                              e.preventDefault();
                              if (dragFrom?.source === "palette") insertBlockAt(dragFrom.blockType, blogBlocks.length);
                              setDragFrom(null); setDragOverIdx(null);
                            }}>

                            {editorMode === "markdown" ? (
                              <div className="max-w-3xl mx-auto my-6 px-4 flex flex-col h-[calc(100%-3rem)] min-h-[480px]">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Standard Markdown</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const parsed = parseMarkdownToBlocks(markdownContent);
                                      setBlogBlocks(parsed);
                                      alert("Visual canvas blocks synchronized from Markdown!");
                                    }}
                                    className="text-[9px] font-bold bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                                  >
                                    Sync to Blocks
                                  </button>
                                </div>
                                <textarea
                                  value={markdownContent}
                                  onChange={(e) => setMarkdownContent(e.target.value)}
                                  placeholder="# Article Heading&#10;&#10;Write standard Markdown here. Example:&#10;## Subheading&#10;This is a paragraph.&#10;&#10;- Bullet point 1&#10;- Bullet point 2&#10;&#10;![Alt Text](/assets/images/...)"
                                  className="flex-grow w-full bg-slate-900 border border-slate-700 rounded-xl p-5 text-sm font-mono text-slate-200 focus:outline-none focus:border-primary resize-none leading-relaxed shadow-inner"
                                />
                              </div>
                            ) : (
                              <div className="max-w-2xl mx-auto my-6 bg-white rounded-2xl shadow-xl overflow-hidden">
                                {/* Hero preview */}
                                <div className="relative aspect-[16/9] bg-slate-200 overflow-hidden">
                                  {blogForm.image
                                    ? <img src={blogForm.image.startsWith("/uploads") ? `${API_URL}${blogForm.image}` : blogForm.image} alt="hero" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = "none"; }} />
                                    : <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-bold">Add hero image URL in settings →</div>
                                  }
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-6">
                                    <div className="flex gap-1 mb-2">
                                      {blogCategories.slice(0, 2).map((c) => <span key={c} className="text-[9px] bg-primary text-white px-2 py-0.5 rounded font-bold">{c}</span>)}
                                      {blogForm.template && <span className="text-[9px] bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full font-bold ml-auto border border-white/30">{blogForm.template}</span>}
                                    </div>
                                    <h1 className="text-white font-black text-lg leading-tight line-clamp-2">
                                      {blogForm.title || <span className="text-white/40">Article Title</span>}
                                    </h1>
                                    {blogForm.excerpt && <p className="text-white/70 text-xs mt-1 line-clamp-2">{blogForm.excerpt}</p>}
                                  </div>
                                </div>

                                {/* Blocks area */}
                                <div className="p-6 flex flex-col gap-1 min-h-48">
                                  {blogBlocks.length === 0 && (
                                    <div className={`flex flex-col items-center justify-center min-h-48 border-2 border-dashed rounded-xl transition-all ${dragFrom?.source === "palette" ? "border-primary bg-primary/5 scale-[1.01]" : "border-slate-200"}`}>
                                      <LayoutGrid size={28} className="text-slate-300 mb-2" />
                                      <p className="text-slate-400 text-sm font-semibold">Drag elements from the left panel</p>
                                      <p className="text-slate-300 text-xs mt-1">or click any element to add it</p>
                                    </div>
                                  )}

                                  {blogBlocks.map((block, idx) => (
                                    <div key={idx}>
                                      {/* Inline Insertion Divider above block */}
                                      <div className="relative group/insert h-4 my-0.5 flex items-center justify-center"
                                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragOverIdx(idx); }}
                                        onDrop={(e) => {
                                          e.preventDefault(); e.stopPropagation();
                                          if (dragFrom?.source === "palette") insertBlockAt(dragFrom.blockType, idx);
                                          else if (dragFrom?.source === "canvas" && dragFrom.index !== idx) {
                                            setBlogBlocks((prev) => {
                                              const arr = [...prev];
                                              const [moved] = arr.splice(dragFrom.index, 1);
                                              arr.splice(idx, 0, moved);
                                              return arr;
                                            });
                                          }
                                          setDragFrom(null); setDragOverIdx(null);
                                        }}
                                      >
                                        <div className={`absolute left-0 right-0 h-[2px] transition-colors duration-200 ${dragOverIdx === idx ? "bg-primary" : "bg-transparent group-hover/insert:bg-slate-200"}`} />
                                        <div className="z-10 opacity-0 group-hover/insert:opacity-100 transition-opacity duration-200 flex gap-1.5 bg-white border border-slate-200 rounded-full px-2.5 py-1 shadow-sm text-[9px] font-bold text-slate-500 hover:text-slate-800">
                                          <button type="button" onClick={(e) => { e.stopPropagation(); insertBlockAt("heading", idx); }} className="hover:text-primary transition-colors cursor-pointer">+ Heading</button>
                                          <span className="text-slate-300">|</span>
                                          <button type="button" onClick={(e) => { e.stopPropagation(); insertBlockAt("paragraph", idx); }} className="hover:text-primary transition-colors cursor-pointer">+ Paragraph</button>
                                          <span className="text-slate-300">|</span>
                                          <button type="button" onClick={(e) => { e.stopPropagation(); insertBlockAt("image", idx); }} className="hover:text-primary transition-colors cursor-pointer">+ Image</button>
                                          <span className="text-slate-300">|</span>
                                          <button type="button" onClick={(e) => { e.stopPropagation(); insertBlockAt("list", idx); }} className="hover:text-primary transition-colors cursor-pointer">+ List</button>
                                        </div>
                                      </div>

                                      {/* Block Wrapper */}
                                      <div draggable
                                        onDragStart={() => setDragFrom({ source: "canvas", index: idx })}
                                        onDragEnd={() => setDragFrom(null)}
                                        onClick={() => setSelectedBlockIdx(idx)}
                                        className={`group relative p-4 rounded-xl border-2 transition-all duration-200 hover:bg-slate-50/50 ${selectedBlockIdx === idx ? "border-primary bg-slate-50/40 shadow-sm" : "border-transparent"}`}
                                      >
                                        {/* Block Action Controls */}
                                        <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 bg-white border border-slate-200 shadow-sm p-1 rounded-lg z-10">
                                          <button type="button" onClick={(e) => { e.stopPropagation(); moveBlock(idx, -1); }} className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"><ChevronUp size={12} /></button>
                                          <button type="button" onClick={(e) => { e.stopPropagation(); moveBlock(idx, 1); }} className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"><ChevronDown size={12} /></button>
                                          <button type="button" onClick={(e) => { e.stopPropagation(); removeBlock(idx); if (selectedBlockIdx === idx) setSelectedBlockIdx(null); }} className="p-1 rounded text-slate-400 hover:text-red-650 hover:bg-red-50 cursor-pointer"><Trash2 size={12} /></button>
                                        </div>

                                        {/* Block Renderer */}
                                        <div className="relative text-left">
                                          {block.type === "heading" && (
                                            selectedBlockIdx === idx ? (
                                              <input
                                                type="text"
                                                value={(block as HeadingBlock).text}
                                                onChange={(e) => updateBlock(idx, { text: e.target.value })}
                                                placeholder="Heading text..."
                                                className="w-full bg-slate-550 border border-slate-200 rounded-xl py-2.5 px-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary"
                                              />
                                            ) : (
                                              React.createElement(
                                                `h${(block as HeadingBlock).level || 2}`,
                                                { className: `font-black text-slate-900 leading-tight ${(block as HeadingBlock).level === 3 ? "text-base mt-4" : "text-lg mt-6"}` },
                                                (block as HeadingBlock).text || <span className="text-slate-350">Heading text...</span>
                                              )
                                            )
                                          )}
                                          {block.type === "paragraph" && (
                                            selectedBlockIdx === idx ? (
                                              <textarea
                                                rows={4}
                                                value={(block as ParagraphBlock).text}
                                                onChange={(e) => updateBlock(idx, { text: e.target.value })}
                                                placeholder="Write your paragraph..."
                                                className="w-full bg-slate-550 border border-slate-200 rounded-xl py-2.5 px-3 text-sm text-slate-700 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary resize-y leading-relaxed"
                                              />
                                            ) : (
                                              <p className="text-sm text-slate-650 leading-relaxed line-clamp-3">{(block as ParagraphBlock).text || <span className="text-slate-300">Paragraph text...</span>}</p>
                                            )
                                          )}
                                          {block.type === "image" && (
                                            <div className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden">
                                              {(block as ImageBlock).src
                                                ? <img src={(block as ImageBlock).src.startsWith("/uploads") ? `${API_URL}${(block as ImageBlock).src}` : (block as ImageBlock).src} alt={(block as ImageBlock).alt} className="w-full h-full object-cover" />
                                                : <div className="w-full h-full flex items-center justify-center"><ImageIcon size={24} className="text-slate-300" /></div>}
                                            </div>
                                          )}
                                          {block.type === "two_column" && (
                                            <div className="grid grid-cols-2 gap-3 bg-slate-50 rounded-lg p-3">
                                              <div className="flex flex-col gap-1">{(block as TwoColumnBlock).left.map((b, i) => <div key={i} className="text-xs text-slate-550 line-clamp-2">{b.type === "paragraph" ? (b as ParagraphBlock).text : (b as HeadingBlock).text}</div>)}</div>
                                              <div className="border-l border-slate-200 pl-3 flex flex-col gap-1">{(block as TwoColumnBlock).right.map((b, i) => <div key={i} className="text-xs text-slate-550 line-clamp-2">{b.type === "paragraph" ? (b as ParagraphBlock).text : (b as HeadingBlock).text}</div>)}</div>
                                            </div>
                                          )}
                                          {block.type === "list" && (
                                            <ul className="flex flex-col gap-1">{(block as ListBlock).items.slice(0, 3).map((item, i) => <li key={i} className="flex items-center gap-2 text-sm text-slate-650"><span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />{item}</li>)}</ul>
                                          )}
                                          {block.type === "grid" && (
                                            <div className={`grid gap-2 ${(block as GridBlock).columns === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                                              {(block as GridBlock).items.map((item, i) => (
                                                <div key={i} className="aspect-[4/3] rounded-lg bg-slate-100 overflow-hidden">
                                                  {item.image ? <img src={item.image.startsWith("/uploads") ? `${API_URL}${item.image}` : item.image} alt={item.caption} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon size={16} className="text-slate-300" /></div>}
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}

                                  {/* Final Drop / Insertion zone */}
                                  {blogBlocks.length > 0 && (
                                    <div className="relative group/insert h-6 my-1 flex items-center justify-center"
                                      onDragOver={(e) => { e.preventDefault(); setDragOverIdx(blogBlocks.length); }}
                                      onDrop={(e) => {
                                        e.preventDefault();
                                        if (dragFrom?.source === "palette") insertBlockAt(dragFrom.blockType, blogBlocks.length);
                                        else if (dragFrom?.source === "canvas") {
                                          setBlogBlocks((prev) => { const arr = [...prev]; const [moved] = arr.splice(dragFrom.index, 1); arr.push(moved); return arr; });
                                        }
                                        setDragFrom(null); setDragOverIdx(null);
                                      }}
                                    >
                                      <div className={`absolute left-0 right-0 h-[2px] transition-colors duration-200 ${dragOverIdx === blogBlocks.length ? "bg-primary" : "bg-transparent group-hover/insert:bg-slate-200"}`} />
                                      <div className="z-10 opacity-0 group-hover/insert:opacity-100 transition-opacity duration-200 flex gap-1.5 bg-white border border-slate-200 rounded-full px-2.5 py-1 shadow-sm text-[9px] font-bold text-slate-500 hover:text-slate-800">
                                        <button type="button" onClick={(e) => { e.stopPropagation(); insertBlockAt("heading", blogBlocks.length); }} className="hover:text-primary transition-colors cursor-pointer">+ Heading</button>
                                        <span className="text-slate-300">|</span>
                                        <button type="button" onClick={(e) => { e.stopPropagation(); insertBlockAt("paragraph", blogBlocks.length); }} className="hover:text-primary transition-colors cursor-pointer">+ Paragraph</button>
                                        <span className="text-slate-300">|</span>
                                        <button type="button" onClick={(e) => { e.stopPropagation(); insertBlockAt("image", blogBlocks.length); }} className="hover:text-primary transition-colors cursor-pointer">+ Image</button>
                                        <span className="text-slate-300">|</span>
                                        <button type="button" onClick={(e) => { e.stopPropagation(); insertBlockAt("list", blogBlocks.length); }} className="hover:text-primary transition-colors cursor-pointer">+ List</button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* RIGHT PANEL: Block Inspector */}
                        {selectedBlockIdx !== null && blogBlocks[selectedBlockIdx] && (
                          <div className="w-72 shrink-0 bg-white border-l border-slate-100 overflow-y-auto flex flex-col">
                            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between shrink-0">
                              <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                                {blogBlocks[selectedBlockIdx].type.replace("_", " ")} Settings
                              </span>
                              <button type="button" onClick={() => setSelectedBlockIdx(null)} className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"><XCircle size={16} /></button>
                            </div>
                            <div className="p-4 flex flex-col gap-4 flex-1">

                              {blogBlocks[selectedBlockIdx].type === "heading" && (<>
                                <div>
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Level</label>
                                  <div className="flex gap-2">
                                    {([2, 3] as const).map((lvl) => (
                                      <button key={lvl} type="button" onClick={() => updateBlock(selectedBlockIdx, { level: lvl })}
                                        className={`flex-1 py-2 rounded-lg text-sm font-bold border-2 transition-all cursor-pointer ${(blogBlocks[selectedBlockIdx] as HeadingBlock).level === lvl ? "border-primary bg-primary/5 text-primary" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}>
                                        H{lvl}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Text</label>
                                  <input type="text" value={(blogBlocks[selectedBlockIdx] as HeadingBlock).text}
                                    onChange={(e) => updateBlock(selectedBlockIdx, { text: e.target.value })}
                                    placeholder="Heading text"
                                    className="w-full border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-primary" />
                                </div>
                              </>)}

                              {blogBlocks[selectedBlockIdx].type === "paragraph" && (
                                <div>
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Content</label>
                                  <textarea rows={8} value={(blogBlocks[selectedBlockIdx] as ParagraphBlock).text}
                                    onChange={(e) => updateBlock(selectedBlockIdx, { text: e.target.value })}
                                    placeholder="Write your paragraph..."
                                    className="w-full border border-slate-200 rounded-xl py-2.5 px-3 text-sm text-slate-700 focus:outline-none focus:border-primary resize-none leading-relaxed" />
                                </div>
                              )}

                              {blogBlocks[selectedBlockIdx].type === "image" && (<>
                                <div>
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Image URL</label>
                                  <div className="flex gap-2 mb-1.5">
                                    <input type="text" value={(blogBlocks[selectedBlockIdx] as ImageBlock).src}
                                      onChange={(e) => updateBlock(selectedBlockIdx, { src: e.target.value })}
                                      placeholder="/assets/images/..."
                                      className="flex-grow border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-705 focus:outline-none focus:border-primary min-w-0" />
                                    <label className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-xl py-2.5 px-3.5 text-[10px] font-bold cursor-pointer transition-colors shrink-0 flex items-center justify-center">
                                      {uploadLoading ? "..." : "Upload"}
                                      <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleImageFileUpload(file, (url) => updateBlock(selectedBlockIdx!, { src: url }));
                                      }} />
                                    </label>
                                  </div>
                                  {(blogBlocks[selectedBlockIdx] as ImageBlock).src && (
                                    <div className="mt-2 rounded-lg overflow-hidden aspect-video border border-slate-100 bg-slate-50">
                                      <img src={(blogBlocks[selectedBlockIdx] as ImageBlock).src.startsWith("/uploads") ? `${API_URL}${(blogBlocks[selectedBlockIdx] as ImageBlock).src}` : (blogBlocks[selectedBlockIdx] as ImageBlock).src} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLElement).style.display = "none"; }} />
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Alt Text</label>
                                  <input type="text" value={(blogBlocks[selectedBlockIdx] as ImageBlock).alt}
                                    onChange={(e) => updateBlock(selectedBlockIdx, { alt: e.target.value })}
                                    placeholder="Describe the image"
                                    className="w-full border border-slate-200 rounded-xl py-2.5 px-3 text-sm text-slate-705 focus:outline-none focus:border-primary" />
                                </div>
                                <div>
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Caption</label>
                                  <input type="text" value={(blogBlocks[selectedBlockIdx] as ImageBlock).caption}
                                    onChange={(e) => updateBlock(selectedBlockIdx, { caption: e.target.value })}
                                    placeholder="Optional caption"
                                    className="w-full border border-slate-200 rounded-xl py-2.5 px-3 text-sm text-slate-705 focus:outline-none focus:border-primary" />
                                </div>
                              </>)}

                              {blogBlocks[selectedBlockIdx].type === "two_column" && (<>
                                <div>
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Left Column</label>
                                  {(blogBlocks[selectedBlockIdx] as TwoColumnBlock).left.map((sub, si) => (
                                    <div key={si} className="mb-2">
                                      {sub.type === "heading" && <input type="text" value={(sub as HeadingBlock).text} onChange={(e) => { const u = [...(blogBlocks[selectedBlockIdx] as TwoColumnBlock).left]; (u[si] as HeadingBlock).text = e.target.value; updateBlock(selectedBlockIdx, { left: u }); }} placeholder="Left heading" className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm font-bold focus:outline-none focus:border-primary mb-1" />}
                                      {sub.type === "paragraph" && <textarea rows={3} value={(sub as ParagraphBlock).text} onChange={(e) => { const u = [...(blogBlocks[selectedBlockIdx] as TwoColumnBlock).left]; (u[si] as ParagraphBlock).text = e.target.value; updateBlock(selectedBlockIdx, { left: u }); }} placeholder="Left text" className="w-full border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-705 focus:outline-none focus:border-primary resize-none" />}
                                    </div>
                                  ))}
                                  <div className="flex gap-1">
                                    <button type="button" onClick={() => updateBlock(selectedBlockIdx, { left: [...(blogBlocks[selectedBlockIdx] as TwoColumnBlock).left, { type: "heading", level: 3, text: "" } as HeadingBlock] })} className="text-[10px] border border-dashed border-slate-200 rounded-lg px-2 py-1 hover:border-primary hover:text-primary transition-colors cursor-pointer">+ Heading</button>
                                    <button type="button" onClick={() => updateBlock(selectedBlockIdx, { left: [...(blogBlocks[selectedBlockIdx] as TwoColumnBlock).left, { type: "paragraph", text: "" } as ParagraphBlock] })} className="text-[10px] border border-dashed border-slate-200 rounded-lg px-2 py-1 hover:border-primary hover:text-primary transition-colors cursor-pointer">+ Text</button>
                                  </div>
                                </div>
                                <div className="border-t border-slate-100 pt-3">
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Right Column</label>
                                  {(blogBlocks[selectedBlockIdx] as TwoColumnBlock).right.map((sub, si) => (
                                    <div key={si} className="mb-2">
                                      {sub.type === "heading" && <input type="text" value={(sub as HeadingBlock).text} onChange={(e) => { const u = [...(blogBlocks[selectedBlockIdx] as TwoColumnBlock).right]; (u[si] as HeadingBlock).text = e.target.value; updateBlock(selectedBlockIdx, { right: u }); }} placeholder="Right heading" className="w-full border border-slate-200 rounded-lg py-2 px-3 text-sm font-bold focus:outline-none focus:border-primary mb-1" />}
                                      {sub.type === "paragraph" && <textarea rows={3} value={(sub as ParagraphBlock).text} onChange={(e) => { const u = [...(blogBlocks[selectedBlockIdx] as TwoColumnBlock).right]; (u[si] as ParagraphBlock).text = e.target.value; updateBlock(selectedBlockIdx, { right: u }); }} placeholder="Right text" className="w-full border border-slate-200 rounded-lg py-2 px-3 text-xs text-slate-705 focus:outline-none focus:border-primary resize-none" />}
                                    </div>
                                  ))}
                                  <div className="flex gap-1">
                                    <button type="button" onClick={() => updateBlock(selectedBlockIdx, { right: [...(blogBlocks[selectedBlockIdx] as TwoColumnBlock).right, { type: "heading", level: 3, text: "" } as HeadingBlock] })} className="text-[10px] border border-dashed border-slate-200 rounded-lg px-2 py-1 hover:border-primary hover:text-primary transition-colors cursor-pointer">+ Heading</button>
                                    <button type="button" onClick={() => updateBlock(selectedBlockIdx, { right: [...(blogBlocks[selectedBlockIdx] as TwoColumnBlock).right, { type: "paragraph", text: "" } as ParagraphBlock] })} className="text-[10px] border border-dashed border-slate-200 rounded-lg px-2 py-1 hover:border-primary hover:text-primary transition-colors cursor-pointer">+ Text</button>
                                  </div>
                                </div>
                              </>)}

                              {blogBlocks[selectedBlockIdx].type === "list" && (<>
                                <div>
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">List Style</label>
                                  <div className="flex gap-2">
                                    {(["bullet", "ordered"] as const).map((s) => (
                                      <button key={s} type="button" onClick={() => updateBlock(selectedBlockIdx, { style: s })}
                                        className={`flex-1 py-2 rounded-lg text-xs font-bold border-2 transition-all cursor-pointer capitalize ${(blogBlocks[selectedBlockIdx] as ListBlock).style === s ? "border-primary bg-primary/5 text-primary" : "border-slate-200 text-slate-500"}`}>{s}</button>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Items</label>
                                  <div className="flex flex-col gap-2">
                                    {(blogBlocks[selectedBlockIdx] as ListBlock).items.map((item, li) => (
                                      <div key={li} className="flex gap-2">
                                        <input type="text" value={item}
                                          onChange={(e) => { const u = [...(blogBlocks[selectedBlockIdx] as ListBlock).items]; u[li] = e.target.value; updateBlock(selectedBlockIdx, { items: u }); }}
                                          className="flex-1 border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-700 focus:outline-none focus:border-primary" />
                                        <button type="button" onClick={() => { const u = (blogBlocks[selectedBlockIdx] as ListBlock).items.filter((_, i) => i !== li); updateBlock(selectedBlockIdx, { items: u }); }} className="text-red-400 hover:text-red-650 p-1.5 rounded hover:bg-red-50 cursor-pointer"><Trash2 size={12} /></button>
                                      </div>
                                    ))}
                                    <button type="button" onClick={() => updateBlock(selectedBlockIdx, { items: [...(blogBlocks[selectedBlockIdx] as ListBlock).items, ""] })} className="text-xs text-slate-500 border border-dashed border-slate-200 rounded-lg py-2 hover:border-primary hover:text-primary transition-colors cursor-pointer">+ Add item</button>
                                  </div>
                                </div>
                              </>)}

                              {blogBlocks[selectedBlockIdx].type === "grid" && (<>
                                <div>
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Columns</label>
                                  <div className="flex gap-2">
                                    {([2, 3] as const).map((c) => (
                                      <button key={c} type="button" onClick={() => updateBlock(selectedBlockIdx, { columns: c })}
                                        className={`flex-1 py-2 rounded-lg text-sm font-bold border-2 transition-all cursor-pointer ${(blogBlocks[selectedBlockIdx] as GridBlock).columns === c ? "border-primary bg-primary/5 text-primary" : "border-slate-200 text-slate-550"}`}>{c} Col</button>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Images</label>
                                  <div className="flex flex-col gap-3">
                                    {(blogBlocks[selectedBlockIdx] as GridBlock).items.map((item, gi) => (
                                      <div key={gi} className="flex flex-col gap-1.5 bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                                        <div className="flex gap-2">
                                          <input type="text" value={item.image}
                                            onChange={(e) => { const u = [...(blogBlocks[selectedBlockIdx] as GridBlock).items]; u[gi] = { ...u[gi], image: e.target.value }; updateBlock(selectedBlockIdx, { items: u }); }}
                                            placeholder="Image URL" className="flex-1 border border-slate-200 rounded-lg py-1.5 px-2 text-xs text-slate-700 focus:outline-none focus:border-primary" />
                                          <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-1.5 rounded hover:bg-slate-200 cursor-pointer flex items-center justify-center shrink-0 border border-slate-200">
                                            <Plus size={12} />
                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                              const file = e.target.files?.[0];
                                              if (file) {
                                                handleImageFileUpload(file, (url) => {
                                                  const u = [...(blogBlocks[selectedBlockIdx!] as GridBlock).items];
                                                  u[gi] = { ...u[gi], image: url };
                                                  updateBlock(selectedBlockIdx!, { items: u });
                                                });
                                              }
                                            }} />
                                          </label>
                                          <button type="button" onClick={() => { const u = (blogBlocks[selectedBlockIdx] as GridBlock).items.filter((_, i) => i !== gi); updateBlock(selectedBlockIdx, { items: u }); }} className="text-red-400 p-1.5 rounded hover:bg-red-50 cursor-pointer"><Trash2 size={11} /></button>
                                        </div>
                                        {item.image && <img src={item.image.startsWith("/uploads") ? `${API_URL}${item.image}` : item.image} alt={item.caption} className="w-full aspect-video object-cover rounded" onError={(e) => { (e.target as HTMLElement).style.display = "none"; }} />}
                                        <input type="text" value={item.caption}
                                          onChange={(e) => { const u = [...(blogBlocks[selectedBlockIdx] as GridBlock).items]; u[gi] = { ...u[gi], caption: e.target.value }; updateBlock(selectedBlockIdx, { items: u }); }}
                                          placeholder="Caption" className="border border-slate-200 rounded-lg py-1.5 px-2 text-xs text-slate-705 focus:outline-none focus:border-primary" />
                                      </div>
                                    ))}
                                    <button type="button" onClick={() => updateBlock(selectedBlockIdx, { items: [...(blogBlocks[selectedBlockIdx] as GridBlock).items, { image: "", caption: "" }] })} className="text-xs text-slate-550 border border-dashed border-slate-200 rounded-lg py-2 hover:border-primary hover:text-primary transition-colors cursor-pointer">+ Add image</button>
                                  </div>
                                </div>
                              </>)}

                            </div>
                          </div>
                        )}
                      </div>
                    </form>
                  )}

                  {/* SUB-TAB: Categories */}
                  {blogsSubTab === "categories" && (
                    <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left w-full">
                      {/* Create Category */}
                      <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-base font-bold text-slate-900 mb-4">Create Blog Category</h3>
                        <form onSubmit={handleCreateCategory} className="flex flex-col gap-4 text-xs">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Category Name</label>
                            <input
                              type="text"
                              required
                              value={newCategoryName}
                              onChange={(e) => setNewCategoryName(e.target.value)}
                              placeholder="e.g. Solar Engineering"
                              className="bg-white border border-slate-200 rounded-xl py-3 px-4 text-slate-800 focus:outline-none focus:border-primary"
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={actionLoading || !newCategoryName.trim()}
                            className="bg-primary hover:bg-primary/90 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg transition-all text-center mt-2 cursor-pointer disabled:opacity-50"
                          >
                            Create Category
                          </button>
                        </form>
                      </div>

                      {/* Categories List */}
                      <div className="lg:col-span-8 flex flex-col gap-4 w-full">
                        <div>
                          <h2 className="text-lg font-bold text-slate-900">All Categories</h2>
                          <p className="text-xs text-slate-500">Categories available for tag-linking and blog classification</p>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left">
                              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                                <tr>
                                  <th className="py-4 px-5">Name</th>
                                  <th className="py-4 px-4">Slug</th>
                                  <th className="py-4 px-5 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {categories.length === 0 ? (
                                  <tr>
                                    <td colSpan={3} className="py-8 text-center text-slate-400 font-semibold">
                                      No categories found.
                                    </td>
                                  </tr>
                                ) : (
                                  categories.map((cat) => (
                                    <tr key={cat._id} className="hover:bg-slate-50/50 transition-colors">
                                      <td className="py-4 px-5 font-bold text-slate-900">{cat.name}</td>
                                      <td className="py-4 px-4 font-mono text-slate-500">{cat.slug}</td>
                                      <td className="py-4 px-5 text-right">
                                        {role === "superadmin" ? (
                                          <button
                                            onClick={() => handleDeleteCategory(cat._id)}
                                            className="text-red-600 p-1.5 rounded hover:bg-red-50 transition-all cursor-pointer"
                                          >
                                            <Trash2 size={14} />
                                          </button>
                                        ) : (
                                          <span className="text-[10px] text-slate-400 italic">No access to delete</span>
                                        )}
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUB-TAB: Tags */}
                  {blogsSubTab === "tags" && (
                    <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left w-full">
                      {/* Create Tag */}
                      <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-base font-bold text-slate-900 mb-4">Create Blog Tag</h3>
                        <form onSubmit={handleCreateTag} className="flex flex-col gap-4 text-xs">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Tag Name</label>
                            <input
                              type="text"
                              required
                              value={newTagName}
                              onChange={(e) => setNewTagName(e.target.value)}
                              placeholder="e.g. offgrid-inverters"
                              className="bg-white border border-slate-200 rounded-xl py-3 px-4 text-slate-800 focus:outline-none focus:border-primary"
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={actionLoading || !newTagName.trim()}
                            className="bg-primary hover:bg-primary/90 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg transition-all text-center mt-2 cursor-pointer disabled:opacity-50"
                          >
                            Create Tag
                          </button>
                        </form>
                      </div>

                      {/* Tags List */}
                      <div className="lg:col-span-8 flex flex-col gap-4 w-full">
                        <div>
                          <h2 className="text-lg font-bold text-slate-900">All Tags</h2>
                          <p className="text-xs text-slate-500">Keywords and tag links used for SEO indexing</p>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left">
                              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                                <tr>
                                  <th className="py-4 px-5">Name</th>
                                  <th className="py-4 px-4">Slug</th>
                                  <th className="py-4 px-5 text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {tags.length === 0 ? (
                                  <tr>
                                    <td colSpan={3} className="py-8 text-center text-slate-400 font-semibold">
                                      No tags found.
                                    </td>
                                  </tr>
                                ) : (
                                  tags.map((tag) => (
                                    <tr key={tag._id} className="hover:bg-slate-50/50 transition-colors">
                                      <td className="py-4 px-5 font-bold text-slate-900">#{tag.name}</td>
                                      <td className="py-4 px-4 font-mono text-slate-500">{tag.slug}</td>
                                      <td className="py-4 px-5 text-right">
                                        {role === "superadmin" ? (
                                          <button
                                            onClick={() => handleDeleteTag(tag._id)}
                                            className="text-red-650 hover:text-red-750 p-1.5 rounded hover:bg-red-50 transition-all cursor-pointer"
                                          >
                                            <Trash2 size={14} />
                                          </button>
                                        ) : (
                                          <span className="text-[10px] text-slate-400 italic">No access to delete</span>
                                        )}
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* ══════════════════ WARRANTY TAB ══════════════════ */}
              {activeTab === "warranty" && (role === "superadmin" || role === "co_admin") && (
                <div className="flex-1 flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 text-left">Warranty Claims</h2>
                      <p className="text-xs text-slate-500 text-left">Customer-submitted warranty requests from the website</p>
                    </div>
                    <select value={warrantyStatusFilter} onChange={(e) => setWarrantyStatusFilter(e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-bold text-slate-700 focus:outline-none focus:border-primary">
                      <option value="all">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                          <tr>
                            <th className="py-4 px-5">Customer</th>
                            <th className="py-4 px-4">Product / Serial</th>
                            <th className="py-4 px-4">Purchase Date</th>
                            <th className="py-4 px-4">Status</th>
                            <th className="py-4 px-5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {warranties.filter(w => warrantyStatusFilter === "all" || w.status === warrantyStatusFilter).length === 0 ? (
                            <tr><td colSpan={5} className="py-10 text-center text-slate-400 font-medium">No warranty claims found.</td></tr>
                          ) : (
                            warranties
                              .filter(w => warrantyStatusFilter === "all" || w.status === warrantyStatusFilter)
                              .map((w) => (
                                <tr key={w._id} className="hover:bg-slate-50/50 transition-colors">
                                  <td className="py-4 px-5 text-left">
                                    <span className="font-bold text-slate-900 block">{w.name}</span>
                                    <span className="text-[10px] text-slate-400">{w.email}</span>
                                    <span className="text-[10px] text-slate-400 block">{w.phone}</span>
                                  </td>
                                  <td className="py-4 px-4 text-left">
                                    <span className="font-semibold text-slate-700 block">{w.productSerial}</span>
                                    <span className="text-[10px] text-slate-400 line-clamp-2 max-w-[180px]">{w.issueDescription}</span>
                                  </td>
                                  <td className="py-4 px-4 text-slate-600">{w.purchaseDate}</td>
                                  <td className="py-4 px-4">
                                    <select
                                      value={w.status}
                                      onChange={(e) => updateWarrantyStatus(w._id, e.target.value)}
                                      disabled={actionLoading}
                                      className={`text-[10px] font-bold rounded-full py-1 px-2 border cursor-pointer focus:outline-none ${w.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                        w.status === "Under Review" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                          w.status === "Resolved" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                            "bg-rose-50 text-rose-700 border-rose-200"
                                        }`}
                                    >
                                      <option value="Pending">Pending</option>
                                      <option value="Under Review">Under Review</option>
                                      <option value="Resolved">Resolved</option>
                                      <option value="Rejected">Rejected</option>
                                    </select>
                                  </td>
                                  <td className="py-4 px-5 text-right">
                                    {role === "superadmin" && (
                                      <button onClick={() => deleteWarranty(w._id)} disabled={actionLoading}
                                        className="text-red-600 p-1.5 rounded hover:bg-red-50 transition-all cursor-pointer disabled:opacity-50">
                                        <Trash2 size={14} />
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ══════════════════ CAREERS TAB ══════════════════ */}
              {activeTab === "careers" && (role === "superadmin" || role === "co_admin") && (
                <div className="flex-1 flex flex-col gap-6">
                  {/* Sub-tab switcher */}
                  <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1 w-fit">
                    <button onClick={() => setCareersSubTab("jobs")}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${careersSubTab === "jobs" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                        }`}>
                      Job Postings ({jobs.length})
                    </button>
                    <button onClick={() => setCareersSubTab("applications")}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${careersSubTab === "applications" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                        }`}>
                      Applications {selectedJobForApps ? `— ${selectedJobForApps.title}` : ""}
                    </button>
                  </div>

                  {careersSubTab === "jobs" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Job Form */}
                      <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-left">
                        <h3 className="text-base font-bold text-slate-900 mb-4">
                          {editingJobId ? "Edit Job Posting" : "Create Job Posting"}
                        </h3>
                        <form onSubmit={handleJobSubmit} className="flex flex-col gap-3 text-xs">
                          {[
                            { label: "Job Title *", key: "title", placeholder: "e.g. Solar Design Engineer" },
                            { label: "Department *", key: "department", placeholder: "e.g. Engineering & Design" },
                            { label: "Location *", key: "location", placeholder: "e.g. Lucknow, UP" },
                          ].map(({ label, key, placeholder }) => (
                            <div key={key} className="flex flex-col gap-1.5">
                              <label className="text-slate-505 font-bold uppercase tracking-wider text-[10px]">{label}</label>
                              <input type="text" required value={jobForm[key as keyof typeof jobForm]}
                                onChange={(e) => setJobForm({ ...jobForm, [key]: e.target.value })}
                                placeholder={placeholder}
                                className="bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-slate-800 focus:outline-none focus:border-primary text-xs" />
                            </div>
                          ))}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-slate-505 font-bold uppercase tracking-wider text-[10px]">Employment Type</label>
                            <select value={jobForm.type} onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                              className="bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-slate-800 focus:outline-none focus:border-primary text-xs">
                              <option>Full-Time</option>
                              <option>Part-Time</option>
                              <option>Contract</option>
                              <option>Internship</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-slate-550 text-slate-500 font-bold uppercase tracking-wider text-[10px]">Description *</label>
                            <textarea required rows={3} value={jobForm.description}
                              onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                              placeholder="Describe the role and responsibilities..."
                              className="bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-slate-800 focus:outline-none focus:border-primary text-xs resize-none" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-slate-505 font-bold uppercase tracking-wider text-[10px]">Requirements</label>
                            <div className="flex flex-col gap-1.5">
                              {jobRequirements.map((req, i) => (
                                <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2.5">
                                  <span className="flex-1 text-slate-755 text-slate-700">{req}</span>
                                  <button type="button" onClick={() => setJobRequirements(jobRequirements.filter((_, idx) => idx !== i))}
                                    className="text-slate-400 hover:text-red-500 cursor-pointer"><XCircle size={13} /></button>
                                </div>
                              ))}
                              <div className="flex gap-2">
                                <input type="text" placeholder="Add requirement..." value={newRequirement}
                                  onChange={(e) => setNewRequirement(e.target.value)}
                                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (newRequirement.trim()) { setJobRequirements([...jobRequirements, newRequirement.trim()]); setNewRequirement(""); } } }}
                                  className="flex-1 bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-primary text-slate-800" />
                                <button type="button" onClick={() => { if (newRequirement.trim()) { setJobRequirements([...jobRequirements, newRequirement.trim()]); setNewRequirement(""); } }}
                                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-lg transition-colors cursor-pointer">
                                  <Plus size={13} />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-1">
                            <button type="submit" disabled={jobFormLoading}
                              className="flex-1 bg-primary hover:bg-primary/90 text-white font-extrabold py-2.5 px-4 rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-60 text-xs">
                              {jobFormLoading ? "Saving..." : editingJobId ? "Update Job" : "Post Job"}
                            </button>
                            {editingJobId && (
                              <button type="button" onClick={() => { setEditingJobId(null); setJobForm({ title: "", department: "", location: "", type: "Full-Time", description: "" }); setJobRequirements([]); }}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-3 rounded-xl text-xs cursor-pointer">
                                Cancel
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      {/* Job List */}
                      <div className="lg:col-span-8 flex flex-col gap-4 w-full">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 text-left">All Job Postings</h2>
                          <p className="text-xs text-slate-500 text-left">{jobs.filter(j => j.isActive).length} active, {jobs.filter(j => !j.isActive).length} inactive</p>
                        </div>
                        {jobs.length === 0 ? (
                          <div className="bg-white border border-slate-200 rounded-2xl py-12 text-center text-slate-400 font-medium shadow-sm">
                            No job postings yet. Create one using the form.
                          </div>
                        ) : (
                          <div className="flex flex-col gap-3 w-full">
                            {jobs.map((job) => (
                              <div key={job._id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row justify-between gap-4 hover:shadow-md transition-shadow">
                                <div className="flex-1 text-left">
                                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border ${job.isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-505 text-slate-500 border-slate-200"
                                      }`}>{job.isActive ? "Live" : "Inactive"}</span>
                                    <span className="text-[10px] text-slate-500 font-medium">{job.department}</span>
                                    <span className="text-[10px] text-slate-450 text-slate-400">· {job.location} · {job.type}</span>
                                  </div>
                                  <h4 className="font-bold text-slate-900 text-sm">{job.title}</h4>
                                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{job.description}</p>
                                </div>
                                <div className="flex sm:flex-col gap-2 items-start sm:items-end shrink-0">
                                  <button onClick={() => handleToggleJob(job._id)} disabled={actionLoading}
                                    className="flex items-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer">
                                    {job.isActive ? <ToggleRight size={13} className="text-emerald-600" /> : <ToggleLeft size={13} />}
                                    {job.isActive ? "Deactivate" : "Activate"}
                                  </button>
                                  <button onClick={() => fetchApplicationsForJob(job)}
                                    className="flex items-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors cursor-pointer">
                                    <Users size={12} /> Applications
                                  </button>
                                  <button onClick={() => { setEditingJobId(job._id); setJobForm({ title: job.title, department: job.department, location: job.location, type: job.type, description: job.description }); setJobRequirements(job.requirements); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                                    className="flex items-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer">
                                    <Edit3 size={12} /> Edit
                                  </button>
                                  {role === "superadmin" && (
                                    <button onClick={() => handleDeleteJob(job._id)} disabled={actionLoading}
                                      className="flex items-center gap-1.5 text-xs font-bold py-1.5 px-3 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer">
                                      <Trash2 size={12} /> Delete
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {careersSubTab === "applications" && (
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div className="text-left">
                          <h2 className="text-xl font-bold text-slate-900">
                            {selectedJobForApps ? `Applications: ${selectedJobForApps.title}` : "All Applications"}
                          </h2>
                          <p className="text-xs text-slate-500">{applications.length} total submissions</p>
                        </div>
                        <div className="flex gap-2">
                          <select value={appStatusFilter} onChange={(e) => setAppStatusFilter(e.target.value)}
                            className="bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-bold text-slate-700 focus:outline-none focus:border-primary">
                            <option value="all">All Statuses</option>
                            <option value="New">New</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                          <button onClick={() => { setCareersSubTab("jobs"); setSelectedJobForApps(null); }}
                            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-1.5 px-3 rounded-lg text-xs cursor-pointer">
                            ← Back to Jobs
                          </button>
                        </div>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs text-left">
                            <thead className="bg-slate-50 text-slate-505 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                              <tr>
                                <th className="py-4 px-5">Applicant</th>
                                <th className="py-4 px-4">Contact</th>
                                <th className="py-4 px-4">Resume</th>
                                <th className="py-4 px-4">Status</th>
                                <th className="py-4 px-5 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {applications.filter(a => appStatusFilter === "all" || a.status === appStatusFilter).length === 0 ? (
                                <tr><td colSpan={5} className="py-10 text-center text-slate-400 font-medium">No applications found.</td></tr>
                              ) : (
                                applications
                                  .filter(a => appStatusFilter === "all" || a.status === appStatusFilter)
                                  .map((app) => (
                                    <tr key={app._id} className="hover:bg-slate-50/50 transition-colors">
                                      <td className="py-4 px-5 text-left">
                                        <span className="font-bold text-slate-900 block">{app.name}</span>
                                        <span className="text-[10px] text-slate-400">{new Date(app.createdAt).toLocaleDateString()}</span>
                                      </td>
                                      <td className="py-4 px-4 text-left">
                                        <span className="text-slate-705 text-slate-700 block">{app.email}</span>
                                        <span className="text-slate-500">{app.phone}</span>
                                      </td>
                                      <td className="py-4 px-4">
                                        {app.resumeLink ? (
                                          <a href={app.resumeLink.startsWith("/uploads") ? `${API_URL}${app.resumeLink}` : app.resumeLink} target="_blank" rel="noreferrer"
                                            className="flex items-center gap-1 text-primary font-bold hover:underline">
                                            <ExternalLink size={11} /> View Resume
                                          </a>
                                        ) : <span className="text-slate-300">—</span>}
                                      </td>
                                      <td className="py-4 px-4">
                                        <select value={app.status}
                                          onChange={(e) => updateApplicationStatus(app._id, e.target.value)}
                                          disabled={actionLoading}
                                          className={`text-[10px] font-bold rounded-full py-1 px-2 border cursor-pointer focus:outline-none ${app.status === "New" ? "bg-sky-50 text-sky-700 border-sky-200" :
                                            app.status === "Reviewed" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                              app.status === "Shortlisted" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                                "bg-rose-50 text-rose-700 border-rose-200"
                                            }`}>
                                          <option value="New">New</option>
                                          <option value="Reviewed">Reviewed</option>
                                          <option value="Shortlisted">Shortlisted</option>
                                          <option value="Rejected">Rejected</option>
                                        </select>
                                      </td>
                                      <td className="py-4 px-5 text-right">
                                        {role === "superadmin" && (
                                          <button onClick={() => deleteApplication(app._id)} disabled={actionLoading}
                                            className="text-red-600 p-1.5 rounded hover:bg-red-50 transition-all cursor-pointer disabled:opacity-50">
                                            <Trash2 size={14} />
                                          </button>
                                        )}
                                      </td>
                                    </tr>
                                  ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ═══════════════ STAFF TAB ═══════════════ */}
              {activeTab === "users" && (role === "superadmin" || role === "co_admin") && (
                <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left w-full">

                  {/* Create Staff Form */}
                  <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Create Staff Account</h3>
                    <form onSubmit={handleCreateUser} className="flex flex-col gap-4 text-xs">
                      {[
                        { label: "Staff Name", key: "name", type: "text", placeholder: "Enter full name" },
                        { label: "Email Address", key: "email", type: "email", placeholder: "e.g. bde@sunlynk.com" },
                        { label: "Secure Password", key: "password", type: "password", placeholder: "Enter password" },
                      ].map(({ label, key, type, placeholder }) => (
                        <div key={key} className="flex flex-col gap-1.5">
                          <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">{label}</label>
                          <input type={type} required value={newUser[key as keyof typeof newUser]}
                            onChange={(e) => setNewUser({ ...newUser, [key]: e.target.value })}
                            placeholder={placeholder}
                            className="bg-white border border-slate-200 rounded-xl py-3 px-4 text-slate-805 focus:outline-none focus:border-primary" />
                        </div>
                      ))}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Console Role</label>
                        <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value as "superadmin" | "co_admin" | "bde" | "content_editor" })}
                          className="bg-white border border-slate-200 rounded-xl py-3 px-3 text-slate-805 focus:outline-none focus:border-primary">
                          <option value="bde">BDE (Leads only)</option>
                          <option value="content_editor">Content Editor (Blogs only)</option>
                          <option value="co_admin">Co-Admin (No Delete)</option>
                          {role === "superadmin" && (
                            <option value="superadmin">Super Admin (Full Access)</option>
                          )}
                        </select>
                      </div>
                      <button type="submit" disabled={actionLoading}
                        className="bg-primary hover:bg-primary/90 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg transition-all text-center mt-2 cursor-pointer">
                        Create Account
                      </button>
                    </form>
                  </div>

                  {/* Staff List */}
                  <div className="lg:col-span-8 w-full flex flex-col gap-5">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Staff User Accounts</h2>
                      <p className="text-xs text-slate-500">Verify user credentials and roles. Only Super Admin can delete accounts.</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm w-full">
                      <div className="overflow-x-auto w-full">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-slate-50 text-slate-505 text-slate-550 font-bold uppercase tracking-wider border-b border-slate-200">
                            <tr>
                              <th className="py-4 px-5">Staff Member</th>
                              <th className="py-4 px-4">Email</th>
                              <th className="py-4 px-4">Console Role</th>
                              <th className="py-4 px-5 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {users.length === 0 ? (
                              <tr><td colSpan={4} className="py-8 text-center text-slate-400 font-semibold">No accounts found.</td></tr>
                            ) : (
                              users.map((u) => (
                                <tr key={u._id} className="hover:bg-slate-50/50 transition-colors">
                                  <td className="py-4 px-5 font-bold text-slate-900 text-left">{u.name}</td>
                                  <td className="py-4 px-4 text-slate-705 text-left">{u.email}</td>
                                  <td className="py-4 px-4 text-left">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase ${u.role === "superadmin" ? "bg-amber-50 text-amber-705 border border-amber-200" :
                                      u.role === "co_admin" ? "bg-red-50 text-red-700 border border-red-200/50" :
                                        u.role === "bde" ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50" :
                                          "bg-blue-50 text-blue-700 border border-blue-200/50"
                                      }`}>
                                      {u.role === "content_editor" ? "editor" : u.role === "co_admin" ? "co-admin" : u.role}
                                    </span>
                                  </td>
                                  <td className="py-4 px-5 text-right">
                                    {role === "superadmin" && (
                                      <button onClick={() => handleDeleteUser(u._id)}
                                        disabled={u.email === "admin@sunlynk.com" || u.email === userName}
                                        className="text-red-650 hover:text-red-705 p-1.5 rounded hover:bg-red-50 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* ═══════════════ ANALYTICS TAB ═══════════════ */}
              {activeTab === "analytics" && (role === "superadmin" || role === "co_admin") && (
                <div className="flex-1 flex flex-col gap-6 text-left w-full">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Website Traffic & Analytics</h2>
                      <p className="text-xs text-slate-500">Real-time visitor logs, WhatsApp clicks, pageviews, and geographic metrics</p>
                    </div>

                    {/* Period Switcher */}
                    <div className="bg-white border border-slate-200 rounded-xl p-1 shadow-sm flex gap-1 shrink-0">
                      {(["daily", "monthly", "yearly"] as const).map((period) => (
                        <button
                          key={period}
                          type="button"
                          onClick={() => setAnalyticsPeriod(period)}
                          className={`py-1.5 px-3 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${analyticsPeriod === period
                              ? "bg-primary text-white shadow-sm"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                        >
                          {period === "daily" ? "Daily (30d)" : period === "monthly" ? "Monthly (12m)" : "Yearly"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {analyticsLoading && !analyticsData ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-3 py-16">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                      <span className="text-sm text-slate-500 font-semibold">Aggregating analytics data...</span>
                    </div>
                  ) : !analyticsData ? (
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-405 font-semibold shadow-sm">
                      Failed to load analytics data.
                    </div>
                  ) : (
                    <>
                      {/* Key Metrics Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                        {/* 1. Pageviews Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Total Pageviews</span>
                              <span className="text-2xl font-black text-slate-900 block mt-1">
                                {analyticsData.summary.totalPageviews.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-700">
                              <Eye size={16} />
                            </div>
                          </div>
                          <div className="border-t border-slate-100 pt-3.5 mt-3.5 flex justify-between text-[10px] font-bold text-slate-500">
                            <span>Today: {analyticsData.charts.daily[analyticsData.charts.daily.length - 1]?.pageviews || 0}</span>
                            <span>Month: {analyticsData.summary.whatsappClicks.monthly}</span>
                          </div>
                        </div>

                        {/* 2. Unique Visitors Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Unique Visitors</span>
                              <span className="text-2xl font-black text-slate-900 block mt-1">
                                {analyticsData.summary.totalUniqueVisitors.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-700">
                              <Users size={16} />
                            </div>
                          </div>
                          <div className="border-t border-slate-100 pt-3.5 mt-3.5 flex justify-between text-[10px] font-bold text-slate-500">
                            <span>Today: {analyticsData.charts.daily[analyticsData.charts.daily.length - 1]?.uniqueVisitors || 0}</span>
                          </div>
                        </div>

                        {/* 3. WhatsApp Clicks Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">WhatsApp Clicks</span>
                              <span className="text-2xl font-black text-slate-900 block mt-1">
                                {analyticsData.summary.whatsappClicks.total.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-700">
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.758.459 3.474 1.33 4.984L2 22l5.195-1.363c1.458.796 3.09 1.217 4.757 1.217h.005c5.501 0 9.983-4.481 9.983-9.988 0-2.67-1.039-5.18-2.926-7.067C17.147 2.92 14.654 2 12.012 2zm6.012 14.36c-.263.743-1.289 1.352-1.776 1.41-.487.058-1.096.096-1.782-.125-.41-.132-.933-.298-1.587-.58-2.783-1.201-4.577-4.043-4.717-4.229-.139-.185-1.127-1.498-1.127-2.859 0-1.36.709-2.029.96-2.3.251-.27.553-.339.739-.339h.525c.168 0 .385-.064.602.457.222.533.76 1.848.827 1.983.067.135.112.293.023.473-.09.18-.135.293-.27.451-.135.158-.283.353-.404.473-.135.135-.277.283-.12.553.158.27.702 1.157 1.503 1.872.8 1.157 1.474 1.517 1.777 1.677.303.16.482.135.663-.073.18-.208.777-.905.986-1.214.208-.309.416-.259.699-.153.283.107 1.796.848 2.106 1.004.31.156.517.234.593.364.077.13.077.754-.186 1.497z" />
                              </svg>
                            </div>
                          </div>
                          <div className="border-t border-slate-100 pt-3.5 mt-3.5 flex justify-between text-[10px] font-bold text-slate-500">
                            <span>Today: {analyticsData.summary.whatsappClicks.daily}</span>
                            <span>Month: {analyticsData.summary.whatsappClicks.monthly}</span>
                            <span>Year: {analyticsData.summary.whatsappClicks.yearly}</span>
                          </div>
                        </div>

                        {/* 4. Form Submissions Card */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Form Submissions</span>
                              <span className="text-2xl font-black text-slate-900 block mt-1">
                                {analyticsData.summary.totalForms.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center text-purple-700">
                              <FileSpreadsheet size={16} />
                            </div>
                          </div>
                          <div className="border-t border-slate-100 pt-3.5 mt-3.5 flex justify-between text-[10px] font-bold text-slate-500">
                            <span>Leads: {analyticsData.summary.forms.total.lead}</span>
                            <span>Claims: {analyticsData.summary.forms.total.warranty}</span>
                            <span>Careers: {analyticsData.summary.forms.total.job_application}</span>
                          </div>
                        </div>

                      </div>

                      {/* Main Chart Section */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <h3 className="text-base font-bold text-slate-900">Traffic Trend ({analyticsPeriod})</h3>
                            <p className="text-xs text-slate-400">Comparing pageviews (solid green) and unique visitors (dashed blue)</p>
                          </div>
                          <div className="flex gap-4 text-[10px] font-bold">
                            <span className="flex items-center gap-1.5 text-teal-700">
                              <span className="w-2.5 h-2.5 bg-teal-700 rounded-full inline-block"></span> Pageviews
                            </span>
                            <span className="flex items-center gap-1.5 text-blue-600">
                              <span className="w-2.5 h-2.5 bg-blue-600 rounded-full inline-block"></span> Unique Visitors
                            </span>
                          </div>
                        </div>

                        {/* Interactive Render */}
                        <AnalyticsChart data={analyticsData.charts[analyticsPeriod]} period={analyticsPeriod} />
                      </div>

                      {/* Split Info Tables Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                        {/* Popular Pages */}
                        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
                          <div>
                            <h3 className="text-sm font-black uppercase text-slate-900 tracking-wider">Top Visited Pages</h3>
                            <p className="text-[11px] text-slate-400">Routes receiving the highest volume of traffic</p>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left">
                              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                                <tr>
                                  <th className="py-2.5 px-4">Page Path</th>
                                  <th className="py-2.5 px-4 text-right">Views</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {analyticsData.popularPages.length === 0 ? (
                                  <tr>
                                    <td colSpan={2} className="py-6 text-center text-slate-400">No page views recorded.</td>
                                  </tr>
                                ) : (
                                  analyticsData.popularPages.map((page: any, idx: number) => (
                                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                      <td className="py-3 px-4 font-mono font-bold text-slate-700">{page.path}</td>
                                      <td className="py-3 px-4 text-right font-black text-slate-950">{page.count.toLocaleString()}</td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Geo / Locations Breakdown */}
                        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
                          <div>
                            <h3 className="text-sm font-black uppercase text-slate-900 tracking-wider">Visitor Locations</h3>
                            <p className="text-[11px] text-slate-400">Geographic analysis of traffic sources by city and country</p>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left">
                              <thead className="bg-slate-50 text-slate-505 font-bold uppercase tracking-wider border-b border-slate-200">
                                <tr>
                                  <th className="py-2.5 px-4">Location</th>
                                  <th className="py-2.5 px-4 text-right">Visits</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {analyticsData.geoBreakdown.length === 0 ? (
                                  <tr>
                                    <td colSpan={2} className="py-6 text-center text-slate-400">No location data.</td>
                                  </tr>
                                ) : (
                                  analyticsData.geoBreakdown.map((geo: any, idx: number) => (
                                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                      <td className="py-3 px-4 font-semibold text-slate-700">
                                        {geo.city === "Unknown" ? "" : `${geo.city}, `}{geo.country}
                                      </td>
                                      <td className="py-3 px-4 text-right font-black text-slate-950">{geo.count.toLocaleString()}</td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>

                      </div>

                      {/* Detailed Form Submissions breakdown */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
                        <div>
                          <h3 className="text-sm font-black uppercase text-slate-900 tracking-wider">Form Submissions Breakdown</h3>
                          <p className="text-[11px] text-slate-400">Summary of submissions across different customer contact forms</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                          {/* Leads Form */}
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col gap-2">
                            <span className="text-[10px] text-primary font-black uppercase tracking-wider">Customer Leads Form</span>
                            <div className="flex justify-between items-center text-xs mt-1 border-b border-slate-200/50 pb-2">
                              <span className="text-slate-500 font-medium">Daily</span>
                              <span className="font-bold text-slate-800">{analyticsData.summary.forms.daily.lead}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs border-b border-slate-200/50 pb-2">
                              <span className="text-slate-500 font-medium">Monthly</span>
                              <span className="font-bold text-slate-800">{analyticsData.summary.forms.monthly.lead}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs border-b border-slate-200/50 pb-2">
                              <span className="text-slate-500 font-medium">Yearly</span>
                              <span className="font-bold text-slate-800">{analyticsData.summary.forms.yearly.lead}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-bold text-slate-900 pt-1">
                              <span>Total Submissions</span>
                              <span>{analyticsData.summary.forms.total.lead}</span>
                            </div>
                          </div>

                          {/* Warranty Claims Form */}
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col gap-2">
                            <span className="text-[10px] text-teal-700 font-black uppercase tracking-wider">Warranty Registration Form</span>
                            <div className="flex justify-between items-center text-xs mt-1 border-b border-slate-200/50 pb-2">
                              <span className="text-slate-500 font-medium">Daily</span>
                              <span className="font-bold text-slate-800">{analyticsData.summary.forms.daily.warranty}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs border-b border-slate-200/50 pb-2">
                              <span className="text-slate-500 font-medium">Monthly</span>
                              <span className="font-bold text-slate-800">{analyticsData.summary.forms.monthly.warranty}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs border-b border-slate-200/50 pb-2">
                              <span className="text-slate-500 font-medium">Yearly</span>
                              <span className="font-bold text-slate-800">{analyticsData.summary.forms.yearly.warranty}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-bold text-slate-900 pt-1">
                              <span>Total Claims</span>
                              <span>{analyticsData.summary.forms.total.warranty}</span>
                            </div>
                          </div>

                          {/* Careers Form */}
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col gap-2">
                            <span className="text-[10px] text-purple-700 font-black uppercase tracking-wider">Careers & Job Application</span>
                            <div className="flex justify-between items-center text-xs mt-1 border-b border-slate-200/50 pb-2">
                              <span className="text-slate-500 font-medium">Daily</span>
                              <span className="font-bold text-slate-800">{analyticsData.summary.forms.daily.job_application}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs border-b border-slate-200/50 pb-2">
                              <span className="text-slate-500 font-medium">Monthly</span>
                              <span className="font-bold text-slate-800">{analyticsData.summary.forms.monthly.job_application}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs border-b border-slate-200/50 pb-2">
                              <span className="text-slate-500 font-medium">Yearly</span>
                              <span className="font-bold text-slate-800">{analyticsData.summary.forms.yearly.job_application}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-bold text-slate-900 pt-1">
                              <span>Total Applications</span>
                              <span>{analyticsData.summary.forms.total.job_application}</span>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Detailed Visitor Logs Table */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-sm font-black uppercase text-slate-900 tracking-wider">Recent Activity Logs</h3>
                            <p className="text-[11px] text-slate-400">Detailed raw events captured from the active site</p>
                          </div>
                          <button
                            onClick={fetchAnalytics}
                            disabled={analyticsLoading}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-1.5 px-3 rounded-lg text-xs transition-colors cursor-pointer disabled:opacity-50"
                          >
                            Refresh Log
                          </button>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs text-left">
                            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                              <tr>
                                <th className="py-2.5 px-4">Event Type</th>
                                <th className="py-2.5 px-4">Target / Value</th>
                                <th className="py-2.5 px-4">IP Address</th>
                                <th className="py-2.5 px-4">Location</th>
                                <th className="py-2.5 px-4">User Agent</th>
                                <th className="py-2.5 px-4 text-right">Time</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {analyticsData.recentLogs.length === 0 ? (
                                <tr>
                                  <td colSpan={6} className="py-6 text-center text-slate-400">No activity logs recorded.</td>
                                </tr>
                              ) : (
                                analyticsData.recentLogs.map((log: any, idx: number) => (
                                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-3 px-4">
                                      <span
                                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase ${log.eventType === "pageview"
                                            ? "bg-blue-50 text-blue-700 border border-blue-200/50"
                                            : log.eventType === "click"
                                              ? "bg-green-50 text-green-700 border border-green-200/50"
                                              : "bg-purple-50 text-purple-700 border border-purple-200/50"
                                          }`}
                                      >
                                        {log.eventType}
                                      </span>
                                    </td>
                                    <td className="py-3 px-4 font-mono text-[11px] font-bold text-slate-700 max-w-[200px] truncate" title={log.eventName}>
                                      {log.eventName}
                                    </td>
                                    <td className="py-3 px-4 font-mono font-medium text-slate-650">{log.ip}</td>
                                    <td className="py-3 px-4 text-slate-700">
                                      {log.location ? `${log.location.city === "Unknown" ? "" : `${log.location.city}, `}${log.location.country}` : "Unknown"}
                                    </td>
                                    <td className="py-3 px-4 text-slate-400 text-[10px] max-w-[180px] truncate" title={log.userAgent}>
                                      {log.userAgent}
                                    </td>
                                    <td className="py-3 px-4 text-right font-medium text-slate-500">
                                      {new Date(log.createdAt).toLocaleString()}
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

            </>
          )}
        </main>
      </div>
    </div>
  );
}

// Visual SVG area/line chart component
function AnalyticsChart({ data, period }: { data: any[]; period: "daily" | "monthly" | "yearly" }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
        <span className="text-slate-400 font-semibold text-xs">No chart data available for this range</span>
      </div>
    );
  }

  const width = 800;
  const height = 220;
  const paddingLeft = 50;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const pageviewsList = data.map((d: any) => d.pageviews);
  const visitorsList = data.map((d: any) => d.uniqueVisitors);
  const maxVal = Math.max(...pageviewsList, ...visitorsList, 10);

  const getX = (index: number) => {
    if (data.length <= 1) return paddingLeft + chartWidth / 2;
    return paddingLeft + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    return paddingTop + chartHeight - (val / maxVal) * chartHeight;
  };

  const getLinePath = (list: number[]) => {
    return list.map((val, idx) => `${idx === 0 ? "M" : "L"} ${getX(idx)} ${getY(val)}`).join(" ");
  };

  const getAreaPath = (list: number[]) => {
    if (list.length === 0) return "";
    const linePath = getLinePath(list);
    return `${linePath} L ${getX(list.length - 1)} ${paddingTop + chartHeight} L ${getX(0)} ${paddingTop + chartHeight} Z`;
  };

  const getLabel = (d: any) => {
    if (period === "daily") {
      const parts = d.date.split("-");
      return parts.length === 3 ? `${parts[2]}/${parts[1]}` : d.date;
    }
    if (period === "monthly") {
      const parts = d.month.split("-");
      return parts.length === 2 ? `${parts[1]}/${parts[0].slice(2)}` : d.month;
    }
    return d.year;
  };

  const labelInterval = Math.max(1, Math.ceil(data.length / 8));
  const yGridVals = [0, maxVal * 0.33, maxVal * 0.66, maxVal];

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full min-w-[700px] h-auto">
        <defs>
          <linearGradient id="pvGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f766e" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0f766e" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="uvGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Y Axis Gridlines & Labels */}
        {yGridVals.map((val, idx) => {
          const y = getY(val);
          return (
            <g key={idx} className="opacity-40">
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#cbd5e1" strokeWidth={1} strokeDasharray="3 3" />
              <text x={paddingLeft - 10} y={y + 4} textAnchor="end" className="text-[10px] font-bold fill-slate-400">{Math.round(val)}</text>
            </g>
          );
        })}

        {/* Area paths */}
        <path d={getAreaPath(pageviewsList)} fill="url(#pvGrad)" />
        <path d={getAreaPath(visitorsList)} fill="url(#uvGrad)" />

        {/* Line paths */}
        <path d={getLinePath(pageviewsList)} fill="none" stroke="#0f766e" strokeWidth={2} strokeLinecap="round" />
        <path d={getLinePath(visitorsList)} fill="none" stroke="#3b82f6" strokeWidth={2} strokeLinecap="round" strokeDasharray="4 2" />

        {/* Data points (dots) */}
        {data.map((d: any, idx: number) => {
          const x = getX(idx);
          const yPv = getY(d.pageviews);
          const yUv = getY(d.uniqueVisitors);
          return (
            <g key={idx}>
              <circle cx={x} cy={yPv} r={3.5} fill="#0f766e" stroke="#fff" strokeWidth={1.5} />
              <circle cx={x} cy={yUv} r={3.5} fill="#3b82f6" stroke="#fff" strokeWidth={1.5} />
            </g>
          );
        })}

        {/* X Axis Labels */}
        {data.map((d: any, idx: number) => {
          if (idx % labelInterval !== 0 && idx !== data.length - 1) return null;
          const x = getX(idx);
          const y = paddingTop + chartHeight + 18;
          return (
            <text key={idx} x={x} y={y} textAnchor="middle" className="text-[10px] font-bold fill-slate-400">
              {getLabel(d)}
            </text>
          );
        })}
      </svg>
    </div>
  );
}