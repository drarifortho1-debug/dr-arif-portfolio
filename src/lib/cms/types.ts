export interface SectionInstance {
  id: string;
  type: string;
  enabled: boolean;
  data: Record<string, unknown>;
}

export interface PageDoc {
  slug: string;
  title: string;
  sections: SectionInstance[];
  updatedAt?: string | null;
  custom?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  noIndex?: boolean;
}

export interface NavChild {
  label: string;
  desc: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  enabled: boolean;
  children?: NavChild[];
  autoChildren?: boolean;
}

export interface HeaderSettings {
  logo: string;
  logoAlt: string;
  ctaLabel: string;
  ctaPhone: string;
  showCta: boolean;
  navItems: NavItem[];
}

export interface FooterChamber {
  name: string;
  location: string;
  schedule: string;
  phone: string;
  phone2?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSettings {
  logo: string;
  name: string;
  tagline: string;
  degrees: string;
  university: string;
  position: string;
  socialLinks: FooterLink[];
  quickLinksTitle: string;
  quickLinks: FooterLink[];
  legalTitle: string;
  legalLinks: FooterLink[];
  chambersTitle: string;
  chambers: FooterChamber[];
  copyright: string;
}

export interface MediaItem {
  id: string;
  url: string;
  name: string;
  path: string;
  size: number;
  contentType: string;
  createdAt: string;
}

export type FieldType =
  | "text"
  | "textarea"
  | "richtext"
  | "image"
  | "url"
  | "tel"
  | "number"
  | "boolean"
  | "select"
  | "list"
  | "lines"
  | "code";

export interface Field {
  key: string;
  label: string;
  type: FieldType;
  help?: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  itemLabel?: string;
  fields?: Field[];
  max?: number;
}

export interface BlockDefinition {
  type: string;
  label: string;
  description: string;
  group: "page" | "custom";
  icon: string;
  fields: Field[];
  defaults: Record<string, unknown>;
  fixed?: boolean;
}
