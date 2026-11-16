export interface GlossaryNote {
  tag: string;
  text: string;
}

export interface GlossaryTerm {
  _id?: string;
  originalId?: string;
  isNew?: boolean;
  id: string; // anchor slug (e.g. "on-grid-solar")
  tabId: string; // tab/section key (e.g. "systems")
  title: string;
  alias?: string;
  paragraphs: string[];
  linkUrl?: string; // block hyperlink
  linkText?: string; // block hyperlink button text
  isBlockLink?: boolean; // make whole card clickable
  note?: GlossaryNote | null;
  order?: number;
}

export interface GlossaryTab {
  _id?: string;
  originalId?: string;
  isNew?: boolean;
  id: string; // key (e.g. "systems")
  secId?: string; // (e.g. "sec-systems")
  order?: number;
  title: string;
  description: string;
  icon?: string;
}

export interface GlossaryData {
  tabs: GlossaryTab[];
  terms: GlossaryTerm[];
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Fetch glossary data strictly from database API endpoints.
 * Never returns hardcoded dummy data.
 */
export async function getGlossary(): Promise<GlossaryData> {
  // 1. Try Express backend database endpoint
  if (API_BASE && API_BASE.startsWith("http")) {
    try {
      const res = await fetch(`${API_BASE}/api/glossary`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.tabs) && Array.isArray(data.terms)) {
          return { tabs: data.tabs, terms: data.terms };
        }
      }
    } catch (err) {
      // Backend not reached, fall through to internal API
    }
  }

  // 2. Try Next.js internal API route
  try {
    const res = await fetch(`/api/glossary/`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.tabs) && Array.isArray(data.terms)) {
        return { tabs: data.tabs, terms: data.terms };
      }
    }
  } catch (err) {
    // API not reached
  }

  // Strict empty state - no dummy data
  return { tabs: [], terms: [] };
}

export async function createOrUpdateTab(
  tab: Partial<GlossaryTab> & { originalId?: string; isNew?: boolean },
  token?: string | null
): Promise<GlossaryTab> {
  const isUpdate = tab.isNew ? false : Boolean(tab.originalId || tab._id);
  const targetId = tab.originalId || tab.id;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  // Try Express backend
  if (API_BASE && API_BASE.startsWith("http")) {
    try {
      const url = isUpdate ? `${API_BASE}/api/glossary/tabs/${targetId}` : `${API_BASE}/api/glossary/tabs`;
      const res = await fetch(url, {
        method: isUpdate ? "PUT" : "POST",
        headers,
        body: JSON.stringify(tab),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // ignore
    }
  }

  // Try Next.js API route
  const res = await fetch(`/api/glossary/`, {
    method: isUpdate ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...tab, type: "tab" }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to save tab in database");
  }
  return await res.json();
}

export async function deleteTab(tabId: string, token?: string | null): Promise<void> {
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  if (API_BASE && API_BASE.startsWith("http")) {
    try {
      const res = await fetch(`${API_BASE}/api/glossary/tabs/${tabId}`, {
        method: "DELETE",
        headers,
      });
      if (res.ok) return;
    } catch (e) {
      // ignore
    }
  }

  const res = await fetch(`/api/glossary/?type=tab&id=${encodeURIComponent(tabId)}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to delete tab from database");
  }
}

export async function createOrUpdateTerm(
  term: Partial<GlossaryTerm> & { originalId?: string; isNew?: boolean },
  token?: string | null
): Promise<GlossaryTerm> {
  const isUpdate = term.isNew ? false : Boolean(term.originalId || term._id);
  const targetId = term.originalId || term.id;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  if (API_BASE && API_BASE.startsWith("http")) {
    try {
      const url = isUpdate ? `${API_BASE}/api/glossary/terms/${targetId}` : `${API_BASE}/api/glossary/terms`;
      const res = await fetch(url, {
        method: isUpdate ? "PUT" : "POST",
        headers,
        body: JSON.stringify(term),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      // ignore
    }
  }

  const res = await fetch(`/api/glossary/`, {
    method: isUpdate ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...term, type: "term" }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to save glossary term in database");
  }
  return await res.json();
}

export async function deleteTerm(termId: string, token?: string | null): Promise<void> {
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  if (API_BASE && API_BASE.startsWith("http")) {
    try {
      const res = await fetch(`${API_BASE}/api/glossary/terms/${termId}`, {
        method: "DELETE",
        headers,
      });
      if (res.ok) return;
    } catch (e) {
      // ignore
    }
  }

  const res = await fetch(`/api/glossary/?type=term&id=${encodeURIComponent(termId)}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to delete term from database");
  }
}
