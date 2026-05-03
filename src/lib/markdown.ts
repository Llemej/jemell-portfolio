/**
 * markdown.ts — Converts raw Markdown to HTML
 *
 * Minimal Markdown-to-HTML renderer that handles headings, bold, italic,
 * code blocks, inline code, links, blockquotes, tables, lists, and paragraphs.
 * Zero external dependencies.
 */

export function markdownToHtml(md: string): string {
  let html = md;

  // Fenced code blocks (```lang\n...\n```)
  html = html.replace(
    /```(\w+)?\r?\n([\s\S]*?)```/g,
    (_match, lang, code) => {
      const escaped = escapeHtml(code.trim());
      return `<pre class="code-block"><code class="language-${lang || "text"}">${escaped}</code></pre>`;
    }
  );

  // Tables
  html = html.replace(
    /(?:^|\n)((?:\|.+\|\r?\n)+)/g,
    (_match, tableBlock: string) => {
      const rows = tableBlock.trim().split("\n").filter(Boolean);
      if (rows.length < 2) return tableBlock;

      const parseRow = (row: string) =>
        row
          .split("|")
          .slice(1, -1)
          .map((c) => c.trim());

      const headerCells = parseRow(rows[0]);

      // Check if row[1] is a separator row (e.g. |---|---|)
      const isSeparator = /^\|[\s\-:|]+\|$/.test(rows[1].trim());
      const dataRows = isSeparator ? rows.slice(2) : rows.slice(1);

      let table = '<div class="table-wrapper"><table>';
      table += "<thead><tr>";
      for (const cell of headerCells) {
        table += `<th>${inlineMarkdown(cell)}</th>`;
      }
      table += "</tr></thead><tbody>";

      for (const row of dataRows) {
        const cells = parseRow(row);
        table += "<tr>";
        for (const cell of cells) {
          table += `<td>${inlineMarkdown(cell)}</td>`;
        }
        table += "</tr>";
      }
      table += "</tbody></table></div>";
      return `\n${table}\n`;
    }
  );

  // Split into lines for block-level processing
  const lines = html.split("\n");
  const result: string[] = [];
  let inList = false;
  let listType: "ul" | "ol" = "ul";
  let inBlockquote = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines but close open blocks
    if (!trimmed) {
      if (inList) {
        result.push(listType === "ul" ? "</ul>" : "</ol>");
        inList = false;
      }
      if (inBlockquote) {
        result.push("</blockquote>");
        inBlockquote = false;
      }
      result.push("");
      continue;
    }

    // Preserve pre blocks
    if (trimmed.startsWith("<pre") || trimmed.startsWith("<div class=\"table")) {
      if (inList) { result.push(listType === "ul" ? "</ul>" : "</ol>"); inList = false; }
      if (inBlockquote) { result.push("</blockquote>"); inBlockquote = false; }
      result.push(line);
      continue;
    }

    // Headings
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      if (inList) { result.push(listType === "ul" ? "</ul>" : "</ol>"); inList = false; }
      if (inBlockquote) { result.push("</blockquote>"); inBlockquote = false; }
      const level = headingMatch[1].length;
      result.push(`<h${level}>${inlineMarkdown(headingMatch[2])}</h${level}>`);
      continue;
    }

    // Blockquotes
    if (trimmed.startsWith(">")) {
      if (!inBlockquote) {
        result.push("<blockquote>");
        inBlockquote = true;
      }
      result.push(`<p>${inlineMarkdown(trimmed.slice(1).trim())}</p>`);
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(trimmed)) {
      if (!inList || listType !== "ul") {
        if (inList) result.push("</ol>");
        result.push("<ul>");
        inList = true;
        listType = "ul";
      }
      result.push(`<li>${inlineMarkdown(trimmed.replace(/^[-*]\s+/, ""))}</li>`);
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(trimmed)) {
      if (!inList || listType !== "ol") {
        if (inList) result.push("</ul>");
        result.push("<ol>");
        inList = true;
        listType = "ol";
      }
      result.push(`<li>${inlineMarkdown(trimmed.replace(/^\d+\.\s+/, ""))}</li>`);
      continue;
    }

    // Horizontal rule
    if (/^(---|\*\*\*|___)$/.test(trimmed)) {
      result.push("<hr />");
      continue;
    }

    // Paragraph
    if (inList) { result.push(listType === "ul" ? "</ul>" : "</ol>"); inList = false; }
    if (inBlockquote) { result.push("</blockquote>"); inBlockquote = false; }
    result.push(`<p>${inlineMarkdown(trimmed)}</p>`);
  }

  // Close any open blocks
  if (inList) result.push(listType === "ul" ? "</ul>" : "</ol>");
  if (inBlockquote) result.push("</blockquote>");

  return result.join("\n");
}

/** Inline Markdown: bold, italic, code, links, images */
function inlineMarkdown(text: string): string {
  let out = text;
  // Images: ![alt](src)
  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
  // Links: [text](url)
  out = out.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  // Bold + italic: ***text***
  out = out.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  // Bold: **text**
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic: *text*
  out = out.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Inline code: `code`
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  return out;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
