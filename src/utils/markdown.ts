export type HeadingBlock = { type: "heading"; level: 2 | 3; text: string };
export type ParagraphBlock = { type: "paragraph"; text: string };
export type ImageBlock = { type: "image"; src: string; alt: string; caption: string };
export type TwoColumnBlock = { type: "two_column"; left: ContentBlock[]; right: ContentBlock[] };
export type ListBlock = { type: "list"; style: "bullet" | "ordered"; items: string[] };
export type GridBlock = { type: "grid"; columns: 2 | 3; items: { image: string; caption: string }[] };
export type ContentBlock = HeadingBlock | ParagraphBlock | ImageBlock | TwoColumnBlock | ListBlock | GridBlock;

/**
 * Converts standard Markdown text into structured editor blocks.
 */
export function parseMarkdownToBlocks(md: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const lines = md.split(/\r?\n/);
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }
    
    // Check for container directives
    if (line.startsWith(":::two_column")) {
      let leftContent = "";
      let rightContent = "";
      let activeCol: "left" | "right" | null = null;
      i++;
      let depth = 1;
      while (i < lines.length) {
        const l = lines[i].trim();
        if (l.startsWith(":::two_column")) depth++;
        if (l === ":::") {
          depth--;
          if (depth === 0) { i++; break; }
        }
        if (l === ":::left") {
          activeCol = "left";
          i++;
          continue;
        }
        if (l === ":::right") {
          activeCol = "right";
          i++;
          continue;
        }
        if (l === ":::" && activeCol) {
          activeCol = null;
          i++;
          continue;
        }
        
        if (activeCol === "left") leftContent += lines[i] + "\n";
        else if (activeCol === "right") rightContent += lines[i] + "\n";
        i++;
      }
      blocks.push({
        type: "two_column",
        left: parseMarkdownToBlocks(leftContent.trim()),
        right: parseMarkdownToBlocks(rightContent.trim())
      });
      continue;
    }
    
    if (line.startsWith(":::grid")) {
      const colsMatch = line.match(/columns=(\d+)/);
      const columns = colsMatch ? (parseInt(colsMatch[1]) === 3 ? 3 : 2) : 2;
      const gridItems: { image: string; caption: string }[] = [];
      i++;
      while (i < lines.length) {
        const l = lines[i].trim();
        if (l === ":::") { i++; break; }
        const imgMatch = l.match(/^!\[(.*?)\]\((.*?)\)$/);
        if (imgMatch) {
          gridItems.push({ image: imgMatch[2], caption: imgMatch[1] });
        }
        i++;
      }
      blocks.push({ type: "grid", columns, items: gridItems });
      continue;
    }
    
    // Headings
    if (line.startsWith("## ")) {
      blocks.push({ type: "heading", level: 2, text: line.substring(3).trim() });
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "heading", level: 3, text: line.substring(4).trim() });
      i++;
      continue;
    }
    
    // Image
    const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      let caption = "";
      if (i + 1 < lines.length && lines[i + 1].trim().startsWith("*") && lines[i + 1].trim().endsWith("*")) {
        caption = lines[i + 1].trim().slice(1, -1);
        i++;
      }
      blocks.push({ type: "image", src: imgMatch[2], alt: imgMatch[1], caption });
      i++;
      continue;
    }
    
    // Lists
    if (line.startsWith("- ") || line.startsWith("* ") || /^\d+\.\s/.test(line)) {
      const listItems: string[] = [];
      const isOrdered = /^\d+\.\s/.test(line);
      while (i < lines.length) {
        const l = lines[i].trim();
        if (!l) break;
        const bulletMatch = l.match(/^(?:-|\*|\d+\.)\s+(.*)$/);
        if (bulletMatch) {
          listItems.push(bulletMatch[1]);
          i++;
        } else {
          break;
        }
      }
      blocks.push({ type: "list", style: isOrdered ? "ordered" : "bullet", items: listItems });
      continue;
    }
    
    // Paragraph
    let paragraphText = "";
    while (i < lines.length) {
      const l = lines[i].trim();
      if (!l) break;
      if (l.startsWith("## ") || l.startsWith("### ") || l.startsWith("![") || l.startsWith("- ") || l.startsWith("* ") || /^\d+\.\s/.test(l) || l.startsWith(":::")) {
        break;
      }
      paragraphText += (paragraphText ? " " : "") + l;
      i++;
    }
    if (paragraphText) {
      blocks.push({ type: "paragraph", text: paragraphText });
    }
  }
  
  return blocks;
}

/**
 * Converts structured editor blocks into standard Markdown text.
 */
export function parseBlocksToMarkdown(blocks: ContentBlock[]): string {
  return blocks.map(block => {
    switch (block.type) {
      case "heading":
        return `${block.level === 2 ? "##" : "###"} ${block.text}`;
      case "paragraph":
        return block.text;
      case "image":
        return `![${block.alt}](${block.src})${block.caption ? `\n*${block.caption}*` : ""}`;
      case "list":
        return block.items.map((item, i) => `${block.style === "ordered" ? `${i + 1}.` : "-"} ${item}`).join("\n");
      case "two_column":
        const leftMd = parseBlocksToMarkdown(block.left);
        const rightMd = parseBlocksToMarkdown(block.right);
        return `:::two_column\n:::left\n${leftMd}\n:::\n:::right\n${rightMd}\n:::\n:::`;
      case "grid":
        const itemsMd = block.items.map(item => `![${item.caption}](${item.image})`).join("\n");
        return `:::grid columns=${block.columns}\n${itemsMd}\n:::`;
      default:
        return "";
    }
  }).join("\n\n");
}

/**
 * Compiles structured editor blocks into basic HTML.
 */
export function compileBlocksToHTML(blocks: ContentBlock[]): string {
  return blocks.map(block => {
    switch (block.type) {
      case "heading":
        return `<h${block.level} class="blog-heading-h${block.level}">${block.text}</h${block.level}>`;
      case "paragraph":
        return `<p class="blog-paragraph">${block.text}</p>`;
      case "image":
        return `<figure class="blog-figure"><img src="${block.src}" alt="${block.alt}" class="blog-img" />${block.caption ? `<figcaption class="blog-caption">${block.caption}</figcaption>` : ""}</figure>`;
      case "list":
        const tag = block.style === "ordered" ? "ol" : "ul";
        const cls = block.style === "ordered" ? "blog-list-ordered" : "blog-list-unordered";
        return `<${tag} class="${cls}">${block.items.map(item => `<li>${item}</li>`).join("")}</${tag}>`;
      case "two_column":
        const leftHTML = compileBlocksToHTML(block.left);
        const rightHTML = compileBlocksToHTML(block.right);
        return `<div class="blog-two-column"><div class="blog-column-left">${leftHTML}</div><div class="blog-column-right">${rightHTML}</div></div>`;
      case "grid":
        const gridCols = block.columns;
        const itemsHTML = block.items.map(item => `<figure class="blog-grid-item"><img src="${item.image}" class="blog-grid-img" />${item.caption ? `<figcaption class="blog-grid-caption">${item.caption}</figcaption>` : ""}</figure>`).join("");
        return `<div class="blog-image-grid cols-${gridCols}">${itemsHTML}</div>`;
      default:
        return "";
    }
  }).join("\n");
}

/**
 * Parses a basic HTML content string into visual editor blocks.
 */
export function parseHTMLToBlocks(html: string): ContentBlock[] {
  if (typeof window === "undefined") return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const blocks: ContentBlock[] = [];

  doc.body.childNodes.forEach((node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();

    if (tag === "h2") {
      blocks.push({ type: "heading", level: 2, text: el.innerText.trim() });
    } else if (tag === "h3") {
      blocks.push({ type: "heading", level: 3, text: el.innerText.trim() });
    } else if (tag === "p") {
      blocks.push({ type: "paragraph", text: el.innerText.trim() });
    } else if (tag === "figure") {
      const img = el.querySelector("img");
      const figcaption = el.querySelector("figcaption");
      if (img) {
        blocks.push({
          type: "image",
          src: img.getAttribute("src") || "",
          alt: img.getAttribute("alt") || "",
          caption: figcaption ? figcaption.innerText.trim() : "",
        });
      }
    } else if (tag === "img") {
      blocks.push({
        type: "image",
        src: el.getAttribute("src") || "",
        alt: el.getAttribute("alt") || "",
        caption: "",
      });
    } else if (tag === "ul" || tag === "ol") {
      const items: string[] = [];
      el.querySelectorAll("li").forEach((li) => {
        items.push(li.innerText.trim());
      });
      blocks.push({
        type: "list",
        style: tag === "ol" ? "ordered" : "bullet",
        items,
      });
    }
  });

  if (blocks.length === 0 && html.trim()) {
    blocks.push({ type: "paragraph", text: html.replace(/<[^>]*>/g, "").trim() });
  }

  return blocks;
}
