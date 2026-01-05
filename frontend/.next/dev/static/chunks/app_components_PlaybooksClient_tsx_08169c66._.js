(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/PlaybooksClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlaybooksClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const API_BASE = ("TURBOPACK compile-time value", "http://localhost:8000") || "";
async function apiJson(path, init) {
    const res = await fetch(`${API_BASE}${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
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
function PlaybooksClient() {
    _s();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [playbooks, setPlaybooks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedPlaybookId, setSelectedPlaybookId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [materials, setMaterials] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [steps, setSteps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedStepId, setSelectedStepId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [creatingPlaybook, setCreatingPlaybook] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newPlaybookName, setNewPlaybookName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [savingStepId, setSavingStepId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [creatingStep, setCreatingStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const selectedPlaybook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlaybooksClient.useMemo[selectedPlaybook]": ()=>playbooks.find({
                "PlaybooksClient.useMemo[selectedPlaybook]": (p)=>p.id === selectedPlaybookId
            }["PlaybooksClient.useMemo[selectedPlaybook]"]) || null
    }["PlaybooksClient.useMemo[selectedPlaybook]"], [
        playbooks,
        selectedPlaybookId
    ]);
    const selectedStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlaybooksClient.useMemo[selectedStep]": ()=>steps.find({
                "PlaybooksClient.useMemo[selectedStep]": (s)=>s.id === selectedStepId
            }["PlaybooksClient.useMemo[selectedStep]"]) || null
    }["PlaybooksClient.useMemo[selectedStep]"], [
        steps,
        selectedStepId
    ]);
    const [newStep, setNewStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        step_index: 0,
        day_offset: 0,
        action_type: "EMAIL_SEND",
        instructions: "",
        enabled: true,
        from_email: "",
        reply_to: "",
        material_ids: []
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlaybooksClient.useEffect": ()=>{
            let mounted = true;
            async function loadInitial() {
                setLoading(true);
                setError("");
                try {
                    const [pbs, mats] = await Promise.all([
                        apiJson("/api/playbooks/"),
                        apiJson("/api/materials/")
                    ]);
                    if (!mounted) return;
                    setPlaybooks(pbs);
                    setMaterials(mats);
                    const firstId = pbs[0]?.id ?? null;
                    setSelectedPlaybookId(firstId);
                } catch (e) {
                    if (!mounted) return;
                    setError(e?.message || "Failed to load");
                } finally{
                    if (!mounted) return;
                    setLoading(false);
                }
            }
            loadInitial();
            return ({
                "PlaybooksClient.useEffect": ()=>{
                    mounted = false;
                }
            })["PlaybooksClient.useEffect"];
        }
    }["PlaybooksClient.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlaybooksClient.useEffect": ()=>{
            let mounted = true;
            async function loadSteps() {
                setError("");
                setSteps([]);
                setSelectedStepId(null);
                if (!selectedPlaybookId) return;
                try {
                    const st = await apiJson(`/api/playbooks/${selectedPlaybookId}/steps/`);
                    if (!mounted) return;
                    const sorted = [
                        ...st
                    ].sort({
                        "PlaybooksClient.useEffect.loadSteps.sorted": (a, b)=>{
                            if (a.day_offset !== b.day_offset) return a.day_offset - b.day_offset;
                            if (a.step_index !== b.step_index) return a.step_index - b.step_index;
                            return a.id - b.id;
                        }
                    }["PlaybooksClient.useEffect.loadSteps.sorted"]);
                    setSteps(sorted);
                    if (sorted.length) setSelectedStepId(sorted[0].id);
                    const nextIndex = sorted.length ? Math.max(...sorted.map({
                        "PlaybooksClient.useEffect.loadSteps": (s)=>s.step_index
                    }["PlaybooksClient.useEffect.loadSteps"])) + 1 : 0;
                    setNewStep({
                        "PlaybooksClient.useEffect.loadSteps": (prev)=>({
                                ...prev,
                                step_index: nextIndex
                            })
                    }["PlaybooksClient.useEffect.loadSteps"]);
                } catch (e) {
                    if (!mounted) return;
                    setError(e?.message || "Failed to load steps");
                }
            }
            loadSteps();
            return ({
                "PlaybooksClient.useEffect": ()=>{
                    mounted = false;
                }
            })["PlaybooksClient.useEffect"];
        }
    }["PlaybooksClient.useEffect"], [
        selectedPlaybookId
    ]);
    const stepsByDay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PlaybooksClient.useMemo[stepsByDay]": ()=>{
            const map = new Map();
            for (const s of steps){
                const arr = map.get(s.day_offset) || [];
                arr.push(s);
                map.set(s.day_offset, arr);
            }
            const days = Array.from(map.keys()).sort({
                "PlaybooksClient.useMemo[stepsByDay].days": (a, b)=>a - b
            }["PlaybooksClient.useMemo[stepsByDay].days"]);
            return days.map({
                "PlaybooksClient.useMemo[stepsByDay]": (d)=>({
                        day: d,
                        steps: (map.get(d) || []).sort({
                            "PlaybooksClient.useMemo[stepsByDay]": (a, b)=>{
                                if (a.step_index !== b.step_index) return a.step_index - b.step_index;
                                return a.id - b.id;
                            }
                        }["PlaybooksClient.useMemo[stepsByDay]"])
                    })
            }["PlaybooksClient.useMemo[stepsByDay]"]);
        }
    }["PlaybooksClient.useMemo[stepsByDay]"], [
        steps
    ]);
    function updateStepLocal(stepId, patch) {
        setSteps((prev)=>prev.map((s)=>s.id === stepId ? {
                    ...s,
                    ...patch
                } : s));
    }
    function toggleMaterial(stepId, materialId) {
        const step = steps.find((s)=>s.id === stepId);
        if (!step) return;
        const set = new Set(step.material_ids);
        if (set.has(materialId)) set.delete(materialId);
        else set.add(materialId);
        updateStepLocal(stepId, {
            material_ids: Array.from(set)
        });
    }
    async function createPlaybook() {
        const name = newPlaybookName.trim();
        if (!name) return;
        setCreatingPlaybook(true);
        setError("");
        try {
            const created = await apiJson("/api/playbooks/", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    description: "",
                    is_active: true
                })
            });
            setPlaybooks((prev)=>[
                    created,
                    ...prev
                ]);
            setSelectedPlaybookId(created.id);
            setNewPlaybookName("");
        } catch (e) {
            setError(e?.message || "Failed to create playbook");
        } finally{
            setCreatingPlaybook(false);
        }
    }
    async function createStep() {
        if (!selectedPlaybookId) return;
        setCreatingStep(true);
        setError("");
        try {
            const created = await apiJson(`/api/playbooks/${selectedPlaybookId}/steps/`, {
                method: "POST",
                body: JSON.stringify({
                    step_index: newStep.step_index,
                    day_offset: newStep.day_offset,
                    action_type: newStep.action_type,
                    instructions: newStep.instructions,
                    enabled: newStep.enabled,
                    from_email: newStep.from_email,
                    reply_to: newStep.reply_to,
                    material_ids: newStep.material_ids
                })
            });
            setSteps((prev)=>[
                    ...prev,
                    created
                ].sort((a, b)=>{
                    if (a.day_offset !== b.day_offset) return a.day_offset - b.day_offset;
                    if (a.step_index !== b.step_index) return a.step_index - b.step_index;
                    return a.id - b.id;
                }));
            setSelectedStepId(created.id);
            const nextIndex = (steps.length ? Math.max(...steps.map((s)=>s.step_index)) : -1) + 1;
            setNewStep((prev)=>({
                    ...prev,
                    step_index: Math.max(prev.step_index + 1, nextIndex),
                    instructions: "",
                    material_ids: []
                }));
        } catch (e) {
            setError(e?.message || "Failed to create step");
        } finally{
            setCreatingStep(false);
        }
    }
    async function saveStep(stepId) {
        const step = steps.find((s)=>s.id === stepId);
        if (!step) return;
        setSavingStepId(stepId);
        setError("");
        try {
            const updated = await apiJson(`/api/playbook-steps/${stepId}/`, {
                method: "PATCH",
                body: JSON.stringify({
                    step_index: step.step_index,
                    day_offset: step.day_offset,
                    action_type: step.action_type,
                    instructions: step.instructions,
                    enabled: step.enabled,
                    from_email: step.from_email,
                    reply_to: step.reply_to,
                    material_ids: step.material_ids
                })
            });
            setSteps((prev)=>prev.map((s)=>s.id === stepId ? updated : s).sort((a, b)=>{
                    if (a.day_offset !== b.day_offset) return a.day_offset - b.day_offset;
                    if (a.step_index !== b.step_index) return a.step_index - b.step_index;
                    return a.id - b.id;
                }));
        } catch (e) {
            setError(e?.message || "Failed to save step");
        } finally{
            setSavingStepId(null);
        }
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "tw-p-6 tw-text-slate-200",
            children: "Loading…"
        }, void 0, false, {
            fileName: "[project]/app/components/PlaybooksClient.tsx",
            lineNumber: 325,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "tw-flex tw-h-full tw-w-full tw-gap-4 tw-p-6 tw-text-slate-200",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tw-w-[360px] tw-shrink-0 tw-rounded-2xl tw-border tw-border-slate-700 tw-bg-slate-900 tw-p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-text-sm tw-font-semibold tw-text-slate-300",
                        children: "Playbooks"
                    }, void 0, false, {
                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                        lineNumber: 331,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-mt-3 tw-flex tw-gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: newPlaybookName,
                                onChange: (e)=>setNewPlaybookName(e.target.value),
                                placeholder: "New playbook name",
                                className: "tw-w-full tw-rounded-xl tw-border tw-border-slate-700 tw-bg-slate-950 tw-px-3 tw-py-2 tw-text-slate-200"
                            }, void 0, false, {
                                fileName: "[project]/app/components/PlaybooksClient.tsx",
                                lineNumber: 336,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: createPlaybook,
                                disabled: creatingPlaybook || !newPlaybookName.trim(),
                                className: "tw-rounded-xl tw-bg-gradient-to-r tw-from-[#3874CB] tw-to-[#A1FCDD] tw-px-4 tw-py-2 tw-text-slate-900 tw-font-semibold disabled:tw-opacity-60",
                                children: "Add"
                            }, void 0, false, {
                                fileName: "[project]/app/components/PlaybooksClient.tsx",
                                lineNumber: 342,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                        lineNumber: 335,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-mt-3 tw-flex tw-flex-col tw-gap-2",
                        children: playbooks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "tw-text-sm tw-text-slate-400",
                            children: "No playbooks yet."
                        }, void 0, false, {
                            fileName: "[project]/app/components/PlaybooksClient.tsx",
                            lineNumber: 353,
                            columnNumber: 13
                        }, this) : playbooks.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedPlaybookId(p.id),
                                className: [
                                    "tw-text-left tw-rounded-xl tw-border tw-p-3 tw-transition",
                                    selectedPlaybookId === p.id ? "tw-border-[#A1FCDD] tw-bg-slate-800" : "tw-border-slate-800 tw-bg-slate-950 tw-hover:bg-slate-900"
                                ].join(" "),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "tw-flex tw-items-center tw-justify-between tw-gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "tw-text-sm tw-font-semibold tw-text-slate-200",
                                                children: p.name
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                lineNumber: 369,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "tw-text-xs tw-text-slate-400",
                                                children: p.is_active ? "Active" : "Off"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                lineNumber: 372,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                                        lineNumber: 368,
                                        columnNumber: 17
                                    }, this),
                                    p.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "tw-mt-1 tw-line-clamp-2 tw-text-xs tw-text-slate-400",
                                        children: p.description
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                                        lineNumber: 377,
                                        columnNumber: 19
                                    }, this) : null
                                ]
                            }, p.id, true, {
                                fileName: "[project]/app/components/PlaybooksClient.tsx",
                                lineNumber: 358,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                        lineNumber: 351,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-mt-6 tw-text-sm tw-font-semibold tw-text-slate-300",
                        children: "Steps"
                    }, void 0, false, {
                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                        lineNumber: 386,
                        columnNumber: 9
                    }, this),
                    !selectedPlaybook ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-mt-2 tw-text-sm tw-text-slate-400",
                        children: "Select a playbook."
                    }, void 0, false, {
                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                        lineNumber: 391,
                        columnNumber: 11
                    }, this) : stepsByDay.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-mt-2 tw-text-sm tw-text-slate-400",
                        children: "No steps yet."
                    }, void 0, false, {
                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                        lineNumber: 395,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-mt-2 tw-flex tw-flex-col tw-gap-3",
                        children: stepsByDay.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "tw-rounded-xl tw-border tw-border-slate-800 tw-bg-slate-950 tw-p-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-slate-400",
                                        children: [
                                            "Day ",
                                            group.day
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                                        lineNumber: 405,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "tw-flex tw-flex-col",
                                        children: group.steps.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setSelectedStepId(s.id),
                                                className: [
                                                    "tw-text-left tw-rounded-lg tw-px-2 tw-py-2 tw-transition",
                                                    selectedStepId === s.id ? "tw-bg-slate-800 tw-text-white" : "tw-hover:bg-slate-900 tw-text-slate-200"
                                                ].join(" "),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "tw-flex tw-items-center tw-justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "tw-text-sm tw-font-medium",
                                                                children: [
                                                                    "#",
                                                                    s.step_index,
                                                                    " ",
                                                                    s.action_type.replace(/_/g, " ")
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                                lineNumber: 421,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "tw-text-xs tw-text-slate-400",
                                                                children: s.enabled ? "On" : "Off"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                                lineNumber: 424,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                        lineNumber: 420,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "tw-mt-1 tw-line-clamp-2 tw-text-xs tw-text-slate-400",
                                                        children: s.instructions || "No instructions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                        lineNumber: 428,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, s.id, true, {
                                                fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                lineNumber: 410,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                                        lineNumber: 408,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, group.day, true, {
                                fileName: "[project]/app/components/PlaybooksClient.tsx",
                                lineNumber: 401,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                        lineNumber: 399,
                        columnNumber: 11
                    }, this),
                    selectedPlaybook ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-mt-4 tw-rounded-2xl tw-border tw-border-slate-800 tw-bg-slate-950 tw-p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "tw-text-sm tw-font-semibold tw-text-slate-300",
                                children: "Add step"
                            }, void 0, false, {
                                fileName: "[project]/app/components/PlaybooksClient.tsx",
                                lineNumber: 441,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "tw-mt-2 tw-grid tw-grid-cols-2 tw-gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "tw-text-xs tw-text-slate-400",
                                        children: [
                                            "Day",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: newStep.day_offset,
                                                onChange: (e)=>setNewStep((p)=>({
                                                            ...p,
                                                            day_offset: Number(e.target.value || 0)
                                                        })),
                                                className: "tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-900 tw-px-2 tw-py-1 tw-text-slate-200"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                lineNumber: 448,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                                        lineNumber: 446,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "tw-text-xs tw-text-slate-400",
                                        children: [
                                            "Index",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: newStep.step_index,
                                                onChange: (e)=>setNewStep((p)=>({
                                                            ...p,
                                                            step_index: Number(e.target.value || 0)
                                                        })),
                                                className: "tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-900 tw-px-2 tw-py-1 tw-text-slate-200"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                lineNumber: 463,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                                        lineNumber: 461,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "tw-col-span-2 tw-text-xs tw-text-slate-400",
                                        children: [
                                            "Action",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: newStep.action_type,
                                                onChange: (e)=>setNewStep((p)=>({
                                                            ...p,
                                                            action_type: e.target.value
                                                        })),
                                                className: "tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-900 tw-px-2 tw-py-2 tw-text-slate-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "EMAIL_SEND",
                                                        children: "Email Send"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                        lineNumber: 488,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "LINKEDIN_CONNECT",
                                                        children: "LinkedIn Connect"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                        lineNumber: 489,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "LINKEDIN_MESSAGE",
                                                        children: "LinkedIn Message"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                        lineNumber: 490,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                lineNumber: 478,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                                        lineNumber: 476,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "tw-col-span-2 tw-text-xs tw-text-slate-400",
                                        children: [
                                            "Instructions",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: newStep.instructions,
                                                onChange: (e)=>setNewStep((p)=>({
                                                            ...p,
                                                            instructions: e.target.value
                                                        })),
                                                rows: 4,
                                                className: "tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-900 tw-px-2 tw-py-2 tw-text-slate-200"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                lineNumber: 496,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                                        lineNumber: 494,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: createStep,
                                        disabled: creatingStep,
                                        className: "tw-col-span-2 tw-rounded-xl tw-bg-gradient-to-r tw-from-[#3874CB] tw-to-[#A1FCDD] tw-px-3 tw-py-2 tw-text-slate-900 tw-font-semibold disabled:tw-opacity-60",
                                        children: creatingStep ? "Creating…" : "Create step"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                                        lineNumber: 506,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/PlaybooksClient.tsx",
                                lineNumber: 445,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                        lineNumber: 440,
                        columnNumber: 11
                    }, this) : null,
                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tw-mt-3 tw-text-sm tw-text-red-300",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/app/components/PlaybooksClient.tsx",
                        lineNumber: 518,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/PlaybooksClient.tsx",
                lineNumber: 330,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tw-flex-1 tw-rounded-2xl tw-border tw-border-slate-700 tw-bg-slate-900 tw-p-4",
                children: !selectedPlaybook ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "tw-text-slate-400",
                    children: "Select a playbook."
                }, void 0, false, {
                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                    lineNumber: 524,
                    columnNumber: 11
                }, this) : !selectedStep ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "tw-text-slate-400",
                    children: "Select a step."
                }, void 0, false, {
                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                    lineNumber: 526,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "tw-flex tw-flex-col tw-gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "tw-flex tw-items-center tw-justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "tw-flex tw-flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "tw-text-lg tw-font-semibold",
                                            children: selectedPlaybook.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/PlaybooksClient.tsx",
                                            lineNumber: 531,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "tw-text-xs tw-text-slate-400",
                                            children: [
                                                "Step #",
                                                selectedStep.step_index,
                                                " (Day ",
                                                selectedStep.day_offset,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/PlaybooksClient.tsx",
                                            lineNumber: 534,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                    lineNumber: 530,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>saveStep(selectedStep.id),
                                    disabled: savingStepId === selectedStep.id,
                                    className: "tw-rounded-xl tw-bg-gradient-to-r tw-from-[#3874CB] tw-to-[#A1FCDD] tw-px-3 tw-py-2 tw-text-slate-900 tw-font-semibold disabled:tw-opacity-60",
                                    children: savingStepId === selectedStep.id ? "Saving…" : "Save"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                    lineNumber: 540,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/PlaybooksClient.tsx",
                            lineNumber: 529,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "tw-grid tw-grid-cols-2 tw-gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "tw-text-xs tw-text-slate-400",
                                    children: [
                                        "Day offset",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: selectedStep.day_offset,
                                            onChange: (e)=>updateStepLocal(selectedStep.id, {
                                                    day_offset: Number(e.target.value || 0)
                                                }),
                                            className: "tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-950 tw-px-2 tw-py-2 tw-text-slate-200"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/PlaybooksClient.tsx",
                                            lineNumber: 552,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                    lineNumber: 550,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "tw-text-xs tw-text-slate-400",
                                    children: [
                                        "Step index",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: selectedStep.step_index,
                                            onChange: (e)=>updateStepLocal(selectedStep.id, {
                                                    step_index: Number(e.target.value || 0)
                                                }),
                                            className: "tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-950 tw-px-2 tw-py-2 tw-text-slate-200"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/PlaybooksClient.tsx",
                                            lineNumber: 566,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                    lineNumber: 564,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "tw-col-span-2 tw-text-xs tw-text-slate-400",
                                    children: [
                                        "Action type",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: selectedStep.action_type,
                                            onChange: (e)=>updateStepLocal(selectedStep.id, {
                                                    action_type: e.target.value
                                                }),
                                            className: "tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-950 tw-px-2 tw-py-2 tw-text-slate-200",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "EMAIL_SEND",
                                                    children: "Email Send"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                    lineNumber: 589,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "LINKEDIN_CONNECT",
                                                    children: "LinkedIn Connect"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                    lineNumber: 590,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "LINKEDIN_MESSAGE",
                                                    children: "LinkedIn Message"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                    lineNumber: 591,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/PlaybooksClient.tsx",
                                            lineNumber: 580,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                    lineNumber: 578,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "tw-col-span-2 tw-text-xs tw-text-slate-400",
                                    children: [
                                        "Instructions (LLM prompt)",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: selectedStep.instructions,
                                            onChange: (e)=>updateStepLocal(selectedStep.id, {
                                                    instructions: e.target.value
                                                }),
                                            rows: 10,
                                            className: "tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-950 tw-px-2 tw-py-2 tw-text-slate-200"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/PlaybooksClient.tsx",
                                            lineNumber: 597,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                    lineNumber: 595,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "tw-text-xs tw-text-slate-400",
                                    children: [
                                        "Enabled",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "tw-mt-1 tw-flex tw-items-center tw-gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: selectedStep.enabled,
                                                    onChange: (e)=>updateStepLocal(selectedStep.id, {
                                                            enabled: e.target.checked
                                                        }),
                                                    className: "tw-h-4 tw-w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                    lineNumber: 612,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "tw-text-sm tw-text-slate-300",
                                                    children: selectedStep.enabled ? "On" : "Off"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                    lineNumber: 622,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/PlaybooksClient.tsx",
                                            lineNumber: 611,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                    lineNumber: 609,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                    lineNumber: 628,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "tw-text-xs tw-text-slate-400",
                                    children: [
                                        "From email",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: selectedStep.from_email,
                                            onChange: (e)=>updateStepLocal(selectedStep.id, {
                                                    from_email: e.target.value
                                                }),
                                            className: "tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-950 tw-px-2 tw-py-2 tw-text-slate-200"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/PlaybooksClient.tsx",
                                            lineNumber: 632,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                    lineNumber: 630,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "tw-text-xs tw-text-slate-400",
                                    children: [
                                        "Reply-to",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: selectedStep.reply_to,
                                            onChange: (e)=>updateStepLocal(selectedStep.id, {
                                                    reply_to: e.target.value
                                                }),
                                            className: "tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-950 tw-px-2 tw-py-2 tw-text-slate-200"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/PlaybooksClient.tsx",
                                            lineNumber: 645,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                    lineNumber: 643,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/PlaybooksClient.tsx",
                            lineNumber: 549,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "tw-rounded-2xl tw-border tw-border-slate-800 tw-bg-slate-950 tw-p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "tw-flex tw-items-center tw-justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "tw-text-sm tw-font-semibold tw-text-slate-300",
                                            children: "Materials"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/PlaybooksClient.tsx",
                                            lineNumber: 659,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "tw-text-xs tw-text-slate-400",
                                            children: [
                                                "Selected: ",
                                                selectedStep.material_ids.length
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/PlaybooksClient.tsx",
                                            lineNumber: 662,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                    lineNumber: 658,
                                    columnNumber: 15
                                }, this),
                                materials.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "tw-mt-2 tw-text-sm tw-text-slate-400",
                                    children: "No materials uploaded."
                                }, void 0, false, {
                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                    lineNumber: 668,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "tw-mt-3 tw-grid tw-grid-cols-2 tw-gap-2",
                                    children: materials.map((m)=>{
                                        const checked = selectedStep.material_ids.includes(m.id);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>toggleMaterial(selectedStep.id, m.id),
                                            className: [
                                                "tw-rounded-xl tw-border tw-p-3 tw-text-left tw-transition",
                                                checked ? "tw-border-[#A1FCDD] tw-bg-slate-900" : "tw-border-slate-800 tw-bg-slate-950 tw-hover:bg-slate-900"
                                            ].join(" "),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "tw-flex tw-items-start tw-justify-between tw-gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "tw-text-sm tw-font-medium tw-text-slate-200",
                                                            children: m.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                            lineNumber: 687,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "tw-text-xs tw-text-slate-400",
                                                            children: checked ? "Selected" : ""
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                            lineNumber: 690,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                    lineNumber: 686,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "tw-mt-1 tw-text-xs tw-text-slate-500",
                                                    children: m.mime_type || "file"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                                    lineNumber: 694,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, m.id, true, {
                                            fileName: "[project]/app/components/PlaybooksClient.tsx",
                                            lineNumber: 676,
                                            columnNumber: 23
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                                    lineNumber: 672,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/PlaybooksClient.tsx",
                            lineNumber: 657,
                            columnNumber: 13
                        }, this),
                        error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "tw-text-sm tw-text-red-300",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/app/components/PlaybooksClient.tsx",
                            lineNumber: 705,
                            columnNumber: 15
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/PlaybooksClient.tsx",
                    lineNumber: 528,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/PlaybooksClient.tsx",
                lineNumber: 522,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/PlaybooksClient.tsx",
        lineNumber: 329,
        columnNumber: 5
    }, this);
}
_s(PlaybooksClient, "b5fEtxeY6+his6SlhqbfI7iAn38=");
_c = PlaybooksClient;
var _c;
__turbopack_context__.k.register(_c, "PlaybooksClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_components_PlaybooksClient_tsx_08169c66._.js.map