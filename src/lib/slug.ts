const BENGALI = "\\u0980-\\u09FF";
const ALLOWED = new RegExp(`[^a-z0-9${BENGALI}]+`, "g");
const VALID = new RegExp(`^[a-z0-9${BENGALI}]+(?:-[a-z0-9${BENGALI}]+)*$`);

export function slugify(input: string): string {
  if (!input) return "";
  return input
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[​-‍﻿]/g, "")
    .replace(/[‘’“”'"`]/g, "")
    .replace(ALLOWED, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90)
    .replace(/-+$/g, "");
}

export function isValidSlug(slug: string): boolean {
  return VALID.test(slug);
}

export function uniqueSlug(base: string, taken: string[]): string {
  const clean = slugify(base) || "post";
  if (!taken.includes(clean)) return clean;
  let counter = 2;
  while (taken.includes(`${clean}-${counter}`)) counter += 1;
  return `${clean}-${counter}`;
}
