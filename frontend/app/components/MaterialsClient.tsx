"use client";

import React, { useEffect, useMemo, useState } from "react";

type Material = {
  id: number;
  title: string;
  mime_type: string;
  tags: any[];
  file: string | null;
  extracted_text: string;
  created_at: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

function getCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const parts = document.cookie.split(";").map((v) => v.trim());
  for (const p of parts) {
    if (p.startsWith(`${name}=`))
      return decodeURIComponent(p.slice(name.length + 1));
  }
  return "";
}

async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
    },
    credentials: "include",
  });

  if (!res.ok) {
    let detail = "";
    try {
      const data = await res.json();
      detail = data?.detail ? String(data.detail) : JSON.stringify(data);
    } catch {
      detail = await res.text();
    }
    throw new Error(detail || `Request failed: ${res.status}`);
  }

  return res.json();
}

export default function MaterialsClient() {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [materials, setMaterials] = useState<Material[]>([]);
  const [query, setQuery] = useState("");

  const [title, setTitle] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  async function loadMaterials() {
    setError("");
    const data = await apiJson<Material[]>("/api/materials/");
    const sorted = [...data].sort((a, b) => {
      const ad = new Date(a.created_at).getTime();
      const bd = new Date(b.created_at).getTime();
      return bd - ad;
    });
    setMaterials(sorted);
  }

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError("");
      try {
        await loadMaterials();
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || "Failed to load materials");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return materials;

    return materials.filter((m) => {
      const t = (m.title || "").toLowerCase();
      const tags = Array.isArray(m.tags)
        ? m.tags.map((x) => String(x).toLowerCase()).join(" ")
        : "";
      const mt = (m.mime_type || "").toLowerCase();
      return t.includes(q) || tags.includes(q) || mt.includes(q);
    });
  }, [materials, query]);

  async function upload() {
    const t = title.trim();
    if (!t) {
      setError("Title is required");
      return;
    }
    if (!file) {
      setError("File is required");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const tags = tagsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const fd = new FormData();
      fd.append("title", t);
      fd.append("tags", JSON.stringify(tags));
      fd.append("file", file);

      const csrf = getCookie("csrftoken");

      const res = await fetch(`${API_BASE}/api/materials/`, {
        method: "POST",
        body: fd,
        credentials: "include",
        headers: csrf ? { "X-CSRFToken": csrf } : undefined,
      });

      if (!res.ok) {
        let detail = "";
        try {
          const data = await res.json();
          detail = data?.detail ? String(data.detail) : JSON.stringify(data);
        } catch {
          detail = await res.text();
        }
        throw new Error(detail || `Upload failed: ${res.status}`);
      }

      setTitle("");
      setTagsText("");
      setFile(null);
      await loadMaterials();
    } catch (e: any) {
      setError(e?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return <div className="tw-p-6 tw-text-slate-200">Loading…</div>;
  }

  return (
    <div className="tw-flex tw-h-full tw-w-full tw-gap-4 tw-p-6 tw-text-slate-200">
      <div className="tw-w-[420px] tw-shrink-0 tw-rounded-2xl tw-border tw-border-slate-700 tw-bg-slate-900 tw-p-4">
        <div className="tw-text-xl tw-font-semibold">Materials</div>
        <div className="tw-mt-1 tw-text-sm tw-text-slate-400">
          Upload files you can attach to playbook steps.
        </div>

        <div className="tw-mt-4 tw-rounded-2xl tw-border tw-border-slate-800 tw-bg-slate-950 tw-p-4">
          <div className="tw-text-sm tw-font-semibold tw-text-slate-300">
            Upload
          </div>

          <div className="tw-mt-3 tw-flex tw-flex-col tw-gap-3">
            <label className="tw-text-xs tw-text-slate-400">
              Title
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="tw-mt-1 tw-w-full tw-rounded-xl tw-border tw-border-slate-700 tw-bg-slate-900 tw-px-3 tw-py-2 tw-text-slate-200"
              />
            </label>

            <label className="tw-text-xs tw-text-slate-400">
              Tags (comma separated)
              <input
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                className="tw-mt-1 tw-w-full tw-rounded-xl tw-border tw-border-slate-700 tw-bg-slate-900 tw-px-3 tw-py-2 tw-text-slate-200"
              />
            </label>

            <label className="tw-text-xs tw-text-slate-400">
              File
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="tw-mt-1 tw-w-full tw-rounded-xl tw-border tw-border-slate-700 tw-bg-slate-900 tw-px-3 tw-py-2 tw-text-slate-200"
              />
            </label>

            <button
              onClick={upload}
              disabled={uploading}
              className="tw-rounded-xl tw-bg-gradient-to-r tw-from-[#3874CB] tw-to-[#A1FCDD] tw-px-3 tw-py-2 tw-font-semibold tw-text-slate-900 disabled:tw-opacity-60"
            >
              {uploading ? "Uploading…" : "Upload material"}
            </button>
          </div>
        </div>

        {error ? (
          <div className="tw-mt-3 tw-text-sm tw-text-red-300">{error}</div>
        ) : null}
      </div>

      <div className="tw-flex-1 tw-rounded-2xl tw-border tw-border-slate-700 tw-bg-slate-900 tw-p-4">
        <div className="tw-flex tw-items-center tw-justify-between tw-gap-3">
          <div className="tw-text-sm tw-font-semibold tw-text-slate-300">
            Library ({filtered.length})
          </div>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, tags, type…"
            className="tw-w-[320px] tw-rounded-xl tw-border tw-border-slate-700 tw-bg-slate-950 tw-px-3 tw-py-2 tw-text-slate-200"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="tw-mt-4 tw-text-sm tw-text-slate-400">
            No materials yet.
          </div>
        ) : (
          <div className="tw-mt-4 tw-grid tw-grid-cols-2 tw-gap-3">
            {filtered.map((m) => (
              <div
                key={m.id}
                className="tw-rounded-2xl tw-border tw-border-slate-800 tw-bg-slate-950 tw-p-4"
              >
                <div className="tw-flex tw-items-start tw-justify-between tw-gap-2">
                  <div className="tw-text-sm tw-font-semibold tw-text-slate-200">
                    {m.title}
                  </div>
                  <div className="tw-text-xs tw-text-slate-500">#{m.id}</div>
                </div>

                <div className="tw-mt-1 tw-text-xs tw-text-slate-500">
                  {m.mime_type || "file"}
                </div>

                {Array.isArray(m.tags) && m.tags.length ? (
                  <div className="tw-mt-2 tw-flex tw-flex-wrap tw-gap-1">
                    {m.tags.slice(0, 8).map((t, idx) => (
                      <div
                        key={`${m.id}-tag-${idx}`}
                        className="tw-rounded-lg tw-border tw-border-slate-800 tw-bg-slate-900 tw-px-2 tw-py-1 tw-text-[11px] tw-text-slate-300"
                      >
                        {String(t)}
                      </div>
                    ))}
                  </div>
                ) : null}

                {m.file ? (
                  <a
                    href={m.file}
                    target="_blank"
                    rel="noreferrer"
                    className="tw-mt-3 tw-inline-block tw-text-xs tw-text-slate-300 tw-underline"
                  >
                    Open file
                  </a>
                ) : null}

                {m.extracted_text ? (
                  <div className="tw-mt-3 tw-text-xs tw-text-slate-400 tw-line-clamp-4">
                    {m.extracted_text}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
