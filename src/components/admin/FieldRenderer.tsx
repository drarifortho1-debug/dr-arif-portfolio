"use client";

import type { Field } from "@/lib/cms/types";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { ImagePicker } from "./MediaLibrary";
import { Button, Input, Label, Select, Textarea, Toggle } from "./ui";

const QuillEditor = dynamic(() => import("./QuillEditor"), { ssr: false });

type Data = Record<string, unknown>;

function emptyItem(fields: Field[]): Data {
  const out: Data = {};
  for (const f of fields) {
    if (f.type === "boolean") out[f.key] = false;
    else if (f.type === "number") out[f.key] = 0;
    else if (f.type === "list" || f.type === "lines") out[f.key] = [];
    else if (f.type === "select") out[f.key] = f.options?.[0]?.value ?? "";
    else out[f.key] = "";
  }
  return out;
}

function itemTitle(item: Data, fields: Field[], fallback: string): string {
  for (const f of fields) {
    if (["text", "textarea"].includes(f.type)) {
      const v = item[f.key];
      if (typeof v === "string" && v.trim()) return v.length > 50 ? v.slice(0, 50) + "…" : v;
    }
  }
  return fallback;
}

function ListField({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: Data[];
  onChange: (v: Data[]) => void;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const sub = field.fields ?? [];
  const list = Array.isArray(value) ? value : [];

  const update = (i: number, next: Data) =>
    onChange(list.map((it, j) => (j === i ? next : it)));
  const remove = (i: number) => {
    onChange(list.filter((_, j) => j !== i));
    setOpenIdx(null);
  };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const copy = [...list];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
    setOpenIdx(j);
  };
  const add = () => {
    onChange([...list, emptyItem(sub)]);
    setOpenIdx(list.length);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 space-y-2">
      {list.length === 0 && (
        <p className="text-xs text-slate-400 text-center py-2">কোনো {field.itemLabel ?? "আইটেম"} নেই</p>
      )}
      {list.map((item, i) => {
        const open = openIdx === i;
        return (
          <div key={i} className="rounded-lg border border-slate-200 bg-white">
            <div className="flex items-center gap-2 px-3 py-2">
              <button
                type="button"
                onClick={() => setOpenIdx(open ? null : i)}
                className="flex-1 text-left flex items-center gap-2 min-w-0 cursor-pointer"
              >
                <span className="w-5 h-5 rounded-md bg-slate-100 text-[10px] font-bold text-slate-500 flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-slate-700 truncate">
                  {itemTitle(item, sub, `${field.itemLabel ?? "আইটেম"} ${i + 1}`)}
                </span>
              </button>
              <div className="flex items-center gap-0.5 shrink-0">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                  title="উপরে"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === list.length - 1}
                  className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                  title="নিচে"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"
                  title="মুছুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            {open && (
              <div className="px-3 pb-3 pt-1 border-t border-slate-100">
                <FieldRenderer
                  fields={sub}
                  value={item}
                  onChange={(next) => update(i, next)}
                  compact
                />
              </div>
            )}
          </div>
        );
      })}
      <Button variant="secondary" size="sm" onClick={add} className="w-full">
        <Plus className="w-3.5 h-3.5" />
        {field.itemLabel ?? "আইটেম"} যুক্ত করুন
      </Button>
    </div>
  );
}

export default function FieldRenderer({
  fields,
  value,
  onChange,
  compact,
}: {
  fields: Field[];
  value: Data;
  onChange: (v: Data) => void;
  compact?: boolean;
}) {
  const set = (key: string, v: unknown) => onChange({ ...value, [key]: v });

  return (
    <div className={compact ? "space-y-3 pt-2" : "space-y-5"}>
      {fields.map((f) => {
        const v = value[f.key];
        switch (f.type) {
          case "text":
          case "url":
          case "tel":
            return (
              <div key={f.key}>
                <Label help={f.help}>{f.label}</Label>
                <Input
                  type={f.type === "url" ? "url" : f.type === "tel" ? "tel" : "text"}
                  value={typeof v === "string" ? v : ""}
                  placeholder={f.placeholder}
                  onChange={(e) => set(f.key, e.target.value)}
                />
              </div>
            );
          case "number":
            return (
              <div key={f.key}>
                <Label help={f.help}>{f.label}</Label>
                <Input
                  type="number"
                  value={typeof v === "number" ? v : Number(v) || 0}
                  onChange={(e) => set(f.key, Number(e.target.value))}
                />
              </div>
            );
          case "textarea":
            return (
              <div key={f.key}>
                <Label help={f.help}>{f.label}</Label>
                <Textarea
                  value={typeof v === "string" ? v : ""}
                  placeholder={f.placeholder}
                  onChange={(e) => set(f.key, e.target.value)}
                />
              </div>
            );
          case "code":
            return (
              <div key={f.key}>
                <Label help={f.help}>{f.label}</Label>
                <Textarea
                  rows={12}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                  value={typeof v === "string" ? v : ""}
                  placeholder={f.placeholder}
                  onChange={(e) => set(f.key, e.target.value)}
                  className="font-mono text-[13px] leading-relaxed min-h-56 whitespace-pre"
                />
              </div>
            );
          case "lines":
            return (
              <div key={f.key}>
                <Label help={f.help}>{f.label}</Label>
                <Textarea
                  value={Array.isArray(v) ? (v as string[]).join("\n") : ""}
                  placeholder={f.placeholder}
                  rows={4}
                  onChange={(e) => set(f.key, e.target.value.split("\n"))}
                />
              </div>
            );
          case "richtext":
            return (
              <div key={f.key}>
                <Label help={f.help}>{f.label}</Label>
                <QuillEditor
                  value={typeof v === "string" ? v : ""}
                  onChange={(html) => set(f.key, html)}
                />
              </div>
            );
          case "image":
            return (
              <div key={f.key}>
                <Label help={f.help}>{f.label}</Label>
                <ImagePicker
                  value={typeof v === "string" ? v : ""}
                  onChange={(url) => set(f.key, url)}
                />
              </div>
            );
          case "boolean":
            return (
              <div key={f.key} className="pt-1">
                <Toggle checked={Boolean(v)} onChange={(b) => set(f.key, b)} label={f.label} />
                {f.help && <p className="text-[11px] text-slate-400 mt-1 ml-14">{f.help}</p>}
              </div>
            );
          case "select":
            return (
              <div key={f.key}>
                <Label help={f.help}>{f.label}</Label>
                <Select
                  value={typeof v === "string" ? v : (f.options?.[0]?.value ?? "")}
                  onChange={(e) => set(f.key, e.target.value)}
                >
                  {(f.options ?? []).map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </div>
            );
          case "list":
            return (
              <div key={f.key}>
                <Label help={f.help}>{f.label}</Label>
                <ListField
                  field={f}
                  value={Array.isArray(v) ? (v as Data[]) : []}
                  onChange={(list) => set(f.key, list)}
                />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
