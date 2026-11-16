import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/data/glossaryData.json");
const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function getGlossaryData() {
  if (!fs.existsSync(dataFilePath)) {
    return { tabs: [], terms: [] };
  }
  const content = fs.readFileSync(dataFilePath, "utf8");
  try {
    return JSON.parse(content);
  } catch (e) {
    return { tabs: [], terms: [] };
  }
}

function saveGlossaryData(data: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tabId = searchParams.get("tabId");

  // Try backend database API
  if (backendUrl && backendUrl.startsWith("http")) {
    try {
      const url = tabId
        ? `${backendUrl}/api/glossary?tabId=${encodeURIComponent(tabId)}`
        : `${backendUrl}/api/glossary`;
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.tabs) && Array.isArray(data.terms)) {
          return NextResponse.json(data);
        }
      }
    } catch (e) {
      // Backend unreachable
    }
  }

  const data = getGlossaryData();
  if (tabId) {
    const filteredTerms = data.terms.filter((t: any) => t.tabId === tabId);
    return NextResponse.json({ tabs: data.tabs, terms: filteredTerms });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Forward to backend database if reachable
    if (backendUrl && backendUrl.startsWith("http")) {
      try {
        const endpoint = body.type === "tab" || (body.title && !body.tabId) ? "/api/glossary/tabs" : "/api/glossary/terms";
        const auth = request.headers.get("authorization");
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (auth) headers["Authorization"] = auth;
        const res = await fetch(`${backendUrl}${endpoint}`, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        });
        if (res.ok) {
          const result = await res.json();
          return NextResponse.json(result, { status: 201 });
        }
      } catch (e) {
        // Backend unreachable
      }
    }

    const data = getGlossaryData();

    // Handle Tab creation
    if (body.type === "tab" || (body.title && !body.tabId)) {
      const tabSlug = (body.id || body.title)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const existing = data.tabs.find((t: any) => t.id === tabSlug);
      if (existing) {
        return NextResponse.json(existing, { status: 200 });
      }

      const newTab = {
        id: tabSlug,
        secId: `sec-${tabSlug}`,
        order: body.order !== undefined ? Number(body.order) : data.tabs.length + 1,
        title: body.title,
        description: body.description || "",
      };

      data.tabs.push(newTab);
      data.tabs.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
      saveGlossaryData(data);
      return NextResponse.json(newTab, { status: 201 });
    }

    // Handle Term creation
    if (!body.title) {
      return NextResponse.json({ error: "Term title is required" }, { status: 400 });
    }

    const termSlug = (body.id || body.title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const existingIdx = data.terms.findIndex((t: any) => t.id === termSlug);
    if (existingIdx !== -1) {
      data.terms[existingIdx] = {
        ...data.terms[existingIdx],
        ...body,
        id: termSlug,
      };
      saveGlossaryData(data);
      return NextResponse.json(data.terms[existingIdx], { status: 200 });
    }

    const paras = Array.isArray(body.paragraphs)
      ? body.paragraphs
      : typeof body.paragraphs === "string"
      ? body.paragraphs.split("\n\n").filter(Boolean)
      : [body.title];

    const newTerm = {
      id: termSlug,
      tabId: body.tabId || data.tabs[0]?.id || "systems",
      title: body.title,
      alias: body.alias || "",
      paragraphs: paras,
      note: body.note && body.note.text ? body.note : null,
      linkUrl: body.linkUrl || "",
      linkText: body.linkText || "",
      isBlockLink: Boolean(body.isBlockLink),
      order: body.order !== undefined ? Number(body.order) : 0,
    };

    data.terms.push(newTerm);
    saveGlossaryData(data);
    return NextResponse.json(newTerm, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Forward to backend database if reachable
    if (backendUrl && backendUrl.startsWith("http")) {
      try {
        const isTab = body.type === "tab";
        const targetId = body.originalId || body.id;
        const endpoint = isTab ? `/api/glossary/tabs/${targetId}` : `/api/glossary/terms/${targetId}`;
        const auth = request.headers.get("authorization");
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (auth) headers["Authorization"] = auth;
        const res = await fetch(`${backendUrl}${endpoint}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(body),
        });
        if (res.ok) {
          const result = await res.json();
          return NextResponse.json(result);
        }
      } catch (e) {
        // Backend unreachable
      }
    }

    const data = getGlossaryData();

    if (body.type === "tab") {
      const targetId = body.originalId || body.id;
      let idx = data.tabs.findIndex((t: any) => t.id === targetId || (body.id && t.id === body.id));

      if (idx === -1) {
        const tabSlug = (body.id || body.title)
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        const newTab = {
          id: tabSlug,
          secId: `sec-${tabSlug}`,
          order: body.order !== undefined ? Number(body.order) : data.tabs.length + 1,
          title: body.title || "New Tab",
          description: body.description || "",
        };
        data.tabs.push(newTab);
        data.tabs.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
        saveGlossaryData(data);
        return NextResponse.json(newTab);
      }

      if (body.id) data.tabs[idx].id = body.id;
      if (body.title !== undefined) data.tabs[idx].title = body.title;
      if (body.description !== undefined) data.tabs[idx].description = body.description;
      if (body.order !== undefined) data.tabs[idx].order = Number(body.order);
      data.tabs.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
      saveGlossaryData(data);
      return NextResponse.json(data.tabs[idx]);
    }

    // Term update or upsert
    const targetId = body.originalId || body.id;
    let idx = data.terms.findIndex((t: any) => t.id === targetId || (body.id && t.id === body.id));

    if (idx === -1) {
      const termSlug = (body.id || body.title)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const paras = Array.isArray(body.paragraphs)
        ? body.paragraphs
        : typeof body.paragraphs === "string"
        ? body.paragraphs.split("\n\n").filter(Boolean)
        : [body.title];

      const newTerm = {
        id: termSlug,
        tabId: body.tabId || data.tabs[0]?.id || "systems",
        title: body.title || "New Term",
        alias: body.alias || "",
        paragraphs: paras,
        note: body.note && body.note.text ? body.note : null,
        linkUrl: body.linkUrl || "",
        linkText: body.linkText || "",
        isBlockLink: Boolean(body.isBlockLink),
        order: body.order !== undefined ? Number(body.order) : 0,
      };
      data.terms.push(newTerm);
      saveGlossaryData(data);
      return NextResponse.json(newTerm);
    }

    if (body.id) data.terms[idx].id = body.id;
    if (body.tabId !== undefined) data.terms[idx].tabId = body.tabId;
    if (body.title !== undefined) data.terms[idx].title = body.title;
    if (body.alias !== undefined) data.terms[idx].alias = body.alias;
    if (body.paragraphs !== undefined) {
      data.terms[idx].paragraphs = Array.isArray(body.paragraphs)
        ? body.paragraphs
        : typeof body.paragraphs === "string"
        ? body.paragraphs.split("\n\n").filter(Boolean)
        : [];
    }
    if (body.note !== undefined) {
      data.terms[idx].note = body.note && body.note.text ? body.note : null;
    }
    if (body.linkUrl !== undefined) data.terms[idx].linkUrl = body.linkUrl;
    if (body.linkText !== undefined) data.terms[idx].linkText = body.linkText;
    if (body.isBlockLink !== undefined) data.terms[idx].isBlockLink = Boolean(body.isBlockLink);
    if (body.order !== undefined) data.terms[idx].order = Number(body.order);

    saveGlossaryData(data);
    return NextResponse.json(data.terms[idx]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type"); // "tab" or "term"
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Forward to backend database if reachable
    if (backendUrl && backendUrl.startsWith("http")) {
      try {
        const endpoint = type === "tab" ? `/api/glossary/tabs/${id}` : `/api/glossary/terms/${id}`;
        const auth = request.headers.get("authorization");
        const headers: Record<string, string> = {};
        if (auth) headers["Authorization"] = auth;
        const res = await fetch(`${backendUrl}${endpoint}`, {
          method: "DELETE",
          headers,
        });
        if (res.ok) {
          return NextResponse.json({ success: true, deletedId: id });
        }
      } catch (e) {
        // Backend unreachable
      }
    }

    const data = getGlossaryData();

    if (type === "tab") {
      data.tabs = data.tabs.filter((t: any) => t.id !== id);
      data.terms = data.terms.filter((t: any) => t.tabId !== id);
      saveGlossaryData(data);
      return NextResponse.json({ success: true, deletedTabId: id });
    }

    data.terms = data.terms.filter((t: any) => t.id !== id);
    saveGlossaryData(data);
    return NextResponse.json({ success: true, deletedTermId: id });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
