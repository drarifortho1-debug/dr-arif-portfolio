import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

export const TREATMENT_SLUG_MAP: Record<string, string> = {
  "knee-pain": "knee-pain.md",
  "back-and-spine-pain": "komor-pain.md",
  "shoulder-and-joint-pain": "kadh-join-pain.md",
  "rheumatism-and-arthritis": "bat-betha-athraitis.md",
  "fracture-and-emergency": "fracture-and-emergency.md",
  "hand-nerve-and-tendon": "hater-snayu.md",
  "neck-pain": "ghar-betha.md",
  "sports-injury": "sports-enjurey.md",
  "spine-trauma": "merudanda.md",
  "wrist-and-foot": "hater-kobji.md",
};

export function getAllTreatmentSlugs(): string[] {
  return Object.keys(TREATMENT_SLUG_MAP);
}

export function getFileForSlug(slug: string): string | null {
  return TREATMENT_SLUG_MAP[slug] ?? null;
}

export function readContentFile(filename: string): string {
  return fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
}

export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "paired-list"; items: { title: string; description: string }[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export interface ParsedContent {
  metaTitle: string;
  metaDescription: string;
  blocks: ContentBlock[];
}

function parseLines(lines: string[]): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    if (line.includes("|") && line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 2) {
        const parseRow = (row: string) =>
          row
            .split("|")
            .slice(1, -1)
            .map((c) => c.trim());
        const headers = parseRow(tableLines[0]);
        const separatorIdx = tableLines.findIndex((l) =>
          /^[\s|:-]+$/.test(l.replace(/[^\s|:-]/g, ""))
        );
        const dataLines =
          separatorIdx >= 0 ? tableLines.slice(separatorIdx + 1) : tableLines.slice(1);
        const rows = dataLines.map(parseRow);
        blocks.push({ type: "table", headers, rows });
      }
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2).trim());
        i++;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    const textLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("- ") &&
      !(lines[i].includes("|") && lines[i].trim().startsWith("|"))
    ) {
      textLines.push(lines[i].trim());
      i++;
    }

    if (textLines.length === 1 && textLines[0].length <= 80) {
      blocks.push({ type: "heading", text: textLines[0] });
    } else {
      blocks.push({ type: "paragraph", text: textLines.join(" ") });
    }
  }

  return blocks;
}

function pairLists(blocks: ContentBlock[]): ContentBlock[] {
  const result: ContentBlock[] = [];
  let i = 0;

  while (i < blocks.length) {
    const curr = blocks[i];
    const next = blocks[i + 1];

    if (
      curr.type === "list" &&
      next?.type === "list" &&
      curr.items.length === next.items.length &&
      curr.items.every((item) => item.length <= 60) &&
      next.items.every((item) => item.length > 10)
    ) {
      result.push({
        type: "paired-list",
        items: curr.items.map((title, idx) => ({
          title,
          description: next.items[idx],
        })),
      });
      i += 2;
    } else {
      result.push(curr);
      i++;
    }
  }

  return result;
}

function pairParagraphs(blocks: ContentBlock[]): ContentBlock[] {
  const result: ContentBlock[] = [];
  let i = 0;

  while (i < blocks.length) {
    const curr = blocks[i];
    const next = blocks[i + 1];

    if (
      curr.type === "paragraph" &&
      next?.type === "paragraph" &&
      curr.text.length <= 80 &&
      next.text.length > 40
    ) {
      result.push({ type: "heading", text: curr.text });
      result.push(next);
      i += 2;
    } else {
      result.push(curr);
      i++;
    }
  }

  return result;
}

export function parseContent(raw: string): ParsedContent {
  const lines = raw.split("\n");
  let metaTitle = "";
  let metaDescription = "";
  let contentStart = 0;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("Meta Title:") || lines[i].startsWith("meta Title:")) {
      metaTitle = lines[i].replace(/^meta\s*title:\s*/i, "").trim();
      if (!metaTitle && i + 1 < lines.length) {
        metaTitle = lines[i + 1].trim();
        contentStart = i + 2;
      } else {
        contentStart = i + 1;
      }
    } else if (lines[i].startsWith("Meta Description:")) {
      metaDescription = lines[i].replace(/^meta\s*description:\s*/i, "").trim();
      if (!metaDescription && i + 1 < lines.length) {
        metaDescription = lines[i + 1].trim();
        contentStart = i + 2;
      } else {
        contentStart = i + 1;
      }
    }
  }

  const contentLines = lines.slice(contentStart);
  let blocks = parseLines(contentLines);
  blocks = pairLists(blocks);
  blocks = pairParagraphs(blocks);

  return { metaTitle, metaDescription, blocks };
}

export function readTreatmentContent(slug: string): ParsedContent | null {
  const filename = getFileForSlug(slug);
  if (!filename) return null;
  const raw = readContentFile(filename);
  return parseContent(raw);
}

export function readLegalContent(filename: string): ParsedContent {
  const raw = readContentFile(filename);
  return parseContent(raw);
}
