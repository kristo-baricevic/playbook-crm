module.exports = [
"[project]/app/components/MaterialsClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MaterialsClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const API_BASE = ("TURBOPACK compile-time value", "http://localhost:8000") || "";
function getCookie(name) {
    if (typeof document === "undefined") return "";
    const parts = document.cookie.split(";").map((v)=>v.trim());
    for (const p of parts){
        if (p.startsWith(`${name}=`)) return decodeURIComponent(p.slice(name.length + 1));
    }
    return "";
}
async function apiJson(path, init) {
    const res = await fetch(`${API_BASE}${path}`, {
        ...init,
        headers: {
            ...init?.headers || {}
        },
        credentials: "include"
    });
    if (!res.ok) {
        let detail = "";
        try {
            const data = await res.json();
            detail = data?.detail ? String(data.detail) : JSON.stringify(data);
        } catch  {
            detail = await res.text();
        }
        throw new Error(detail || `Request failed: ${res.status}`);
    }
    return res.json();
}
function MaterialsClient() {
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [materials, setMaterials] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [tagsText, setTagsText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    async function loadMaterials() {
        setError("");
        const data = await apiJson("/api/materials/");
        const sorted = [
            ...data
        ].sort((a, b)=>{
            const ad = new Date(a.created_at).getTime();
            const bd = new Date(b.created_at).getTime();
            return bd - ad;
        });
        setMaterials(sorted);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let mounted = true;
        async function load() {
            setLoading(true);
            setError("");
            try {
                await loadMaterials();
            } catch (e) {
                if (!mounted) return;
                setError(e?.message || "Failed to load materials");
            } finally{
                if (!mounted) return;
                setLoading(false);
            }
        }
        load();
        return ()=>{
            mounted = false;
        };
    }, []);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const q = query.trim().toLowerCase();
        if (!q) return materials;
        return materials.filter((m)=>{
            const t = (m.title || "").toLowerCase();
            const tags = Array.isArray(m.tags) ? m.tags.map((x)=>String(x).toLowerCase()).join(" ") : "";
            const mt = (m.mime_type || "").toLowerCase();
            return t.includes(q) || tags.includes(q) || mt.includes(q);
        });
    }, [
        materials,
        query
    ]);
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
            const tags = tagsText.split(",").map((s)=>s.trim()).filter(Boolean);
            const fd = new FormData();
            fd.append("title", t);
            fd.append("tags", JSON.stringify(tags));
            fd.append("file", file);
            const csrf = getCookie("csrftoken");
            const res = await fetch(`${API_BASE}/api/materials/`, {
                method: "POST",
                body: fd,
                credentials: "include",
                headers: csrf ? {
                    "X-CSRFToken": csrf
                } : undefined
            });
            if (!res.ok) {
                let detail = "";
                try {
                    const data = await res.json();
                    detail = data?.detail ? String(data.detail) : JSON.stringify(data);
                } catch  {
                    detail = await res.text();
                }
                throw new Error(detail || `Upload failed: ${res.status}`);
            }
            setTitle("");
            setTagsText("");
            setFile(null);
            await loadMaterials();
        } catch (e) {
            setError(e?.message || "Upload failed");
        } finally{
            setUploading(false);
        }
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "tw-p-6 tw-text-slate-200",
            children: "Loading…"
        }, void 0, false, {
            fileName: "[project]/app/components/MaterialsClient.tsx",
            lineNumber: 167,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "tw-flex tw-h-full tw-w-full tw-gap-4 tw-p-6 tw-text-slate-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tw-w-[420px] tw-shrink-0 tw-rounded-2xl tw-border tw-border-slate-700 tw-bg-slate-900 tw-p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-text-xl tw-font-semibold",
                        children: "Materials"
                    }, void 0, false, {
                        fileName: "[project]/app/components/MaterialsClient.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-mt-1 tw-text-sm tw-text-slate-400",
                        children: "Upload files you can attach to playbook steps."
                    }, void 0, false, {
                        fileName: "[project]/app/components/MaterialsClient.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-mt-4 tw-rounded-2xl tw-border tw-border-slate-800 tw-bg-slate-950 tw-p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "tw-text-sm tw-font-semibold tw-text-slate-300",
                                children: "Upload"
                            }, void 0, false, {
                                fileName: "[project]/app/components/MaterialsClient.tsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "tw-mt-3 tw-flex tw-flex-col tw-gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "tw-text-xs tw-text-slate-400",
                                        children: [
                                            "Title",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: title,
                                                onChange: (e)=>setTitle(e.target.value),
                                                className: "tw-mt-1 tw-w-full tw-rounded-xl tw-border tw-border-slate-700 tw-bg-slate-900 tw-px-3 tw-py-2 tw-text-slate-200"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MaterialsClient.tsx",
                                                lineNumber: 186,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/MaterialsClient.tsx",
                                        lineNumber: 184,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "tw-text-xs tw-text-slate-400",
                                        children: [
                                            "Tags (comma separated)",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: tagsText,
                                                onChange: (e)=>setTagsText(e.target.value),
                                                className: "tw-mt-1 tw-w-full tw-rounded-xl tw-border tw-border-slate-700 tw-bg-slate-900 tw-px-3 tw-py-2 tw-text-slate-200"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MaterialsClient.tsx",
                                                lineNumber: 195,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/MaterialsClient.tsx",
                                        lineNumber: 193,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "tw-text-xs tw-text-slate-400",
                                        children: [
                                            "File",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "file",
                                                onChange: (e)=>setFile(e.target.files?.[0] || null),
                                                className: "tw-mt-1 tw-w-full tw-rounded-xl tw-border tw-border-slate-700 tw-bg-slate-900 tw-px-3 tw-py-2 tw-text-slate-200"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MaterialsClient.tsx",
                                                lineNumber: 204,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/MaterialsClient.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: upload,
                                        disabled: uploading,
                                        className: "tw-rounded-xl tw-bg-gradient-to-r tw-from-[#3874CB] tw-to-[#A1FCDD] tw-px-3 tw-py-2 tw-font-semibold tw-text-slate-900 disabled:tw-opacity-60",
                                        children: uploading ? "Uploading…" : "Upload material"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/MaterialsClient.tsx",
                                        lineNumber: 211,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/MaterialsClient.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/MaterialsClient.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-mt-3 tw-text-sm tw-text-red-300",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/app/components/MaterialsClient.tsx",
                        lineNumber: 222,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/MaterialsClient.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tw-flex-1 tw-rounded-2xl tw-border tw-border-slate-700 tw-bg-slate-900 tw-p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-flex tw-items-center tw-justify-between tw-gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "tw-text-sm tw-font-semibold tw-text-slate-300",
                                children: [
                                    "Library (",
                                    filtered.length,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/MaterialsClient.tsx",
                                lineNumber: 228,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: query,
                                onChange: (e)=>setQuery(e.target.value),
                                placeholder: "Search title, tags, type…",
                                className: "tw-w-[320px] tw-rounded-xl tw-border tw-border-slate-700 tw-bg-slate-950 tw-px-3 tw-py-2 tw-text-slate-200"
                            }, void 0, false, {
                                fileName: "[project]/app/components/MaterialsClient.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/MaterialsClient.tsx",
                        lineNumber: 227,
                        columnNumber: 9
                    }, this),
                    filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-mt-4 tw-text-sm tw-text-slate-400",
                        children: "No materials yet."
                    }, void 0, false, {
                        fileName: "[project]/app/components/MaterialsClient.tsx",
                        lineNumber: 241,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-mt-4 tw-grid tw-grid-cols-2 tw-gap-3",
                        children: filtered.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "tw-rounded-2xl tw-border tw-border-slate-800 tw-bg-slate-950 tw-p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "tw-flex tw-items-start tw-justify-between tw-gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "tw-text-sm tw-font-semibold tw-text-slate-200",
                                                children: m.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MaterialsClient.tsx",
                                                lineNumber: 252,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "tw-text-xs tw-text-slate-500",
                                                children: [
                                                    "#",
                                                    m.id
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/MaterialsClient.tsx",
                                                lineNumber: 255,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/MaterialsClient.tsx",
                                        lineNumber: 251,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "tw-mt-1 tw-text-xs tw-text-slate-500",
                                        children: m.mime_type || "file"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/MaterialsClient.tsx",
                                        lineNumber: 258,
                                        columnNumber: 17
                                    }, this),
                                    Array.isArray(m.tags) && m.tags.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-1",
                                        children: m.tags.slice(0, 8).map((t, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "tw-rounded-lg tw-border tw-border-slate-800 tw-bg-slate-900 tw-px-2 tw-py-1 tw-text-[11px] tw-text-slate-300",
                                                children: String(t)
                                            }, `${m.id}-tag-${idx}`, false, {
                                                fileName: "[project]/app/components/MaterialsClient.tsx",
                                                lineNumber: 265,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/MaterialsClient.tsx",
                                        lineNumber: 263,
                                        columnNumber: 19
                                    }, this) : null,
                                    m.file ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: m.file,
                                        target: "_blank",
                                        rel: "noreferrer",
                                        className: "tw-mt-3 tw-inline-block tw-text-xs tw-text-slate-300 tw-underline",
                                        children: "Open file"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/MaterialsClient.tsx",
                                        lineNumber: 276,
                                        columnNumber: 19
                                    }, this) : null,
                                    m.extracted_text ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "tw-mt-3 tw-text-xs tw-text-slate-400 tw-line-clamp-4",
                                        children: m.extracted_text
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/MaterialsClient.tsx",
                                        lineNumber: 287,
                                        columnNumber: 19
                                    }, this) : null
                                ]
                            }, m.id, true, {
                                fileName: "[project]/app/components/MaterialsClient.tsx",
                                lineNumber: 247,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/MaterialsClient.tsx",
                        lineNumber: 245,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/MaterialsClient.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/MaterialsClient.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=app_components_MaterialsClient_tsx_a4a4b061._.js.map