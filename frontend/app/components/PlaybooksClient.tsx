"use client";

import React, { useEffect, useMemo, useState } from "react";

type Playbook = {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
};

type Material = {
  id: number;
  title: string;
  mime_type: string;
  tags: any[];
};

type PlaybookStep = {
  id: number;
  playbook: number;
  step_index: number;
  day_offset: number;
  action_type: "EMAIL_SEND" | "LINKEDIN_CONNECT" | "LINKEDIN_MESSAGE";
  instructions: string;
  enabled: boolean;
  from_email: string;
  reply_to: string;
  material_ids: number[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
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

export default function PlaybooksClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [selectedPlaybookId, setSelectedPlaybookId] = useState<number | null>(
    null
  );

  const [materials, setMaterials] = useState<Material[]>([]);
  const [steps, setSteps] = useState<PlaybookStep[]>([]);
  const [selectedStepId, setSelectedStepId] = useState<number | null>(null);

  const [creatingPlaybook, setCreatingPlaybook] = useState(false);
  const [newPlaybookName, setNewPlaybookName] = useState("");

  const [savingStepId, setSavingStepId] = useState<number | null>(null);
  const [creatingStep, setCreatingStep] = useState(false);

  const selectedPlaybook = useMemo(
    () => playbooks.find((p) => p.id === selectedPlaybookId) || null,
    [playbooks, selectedPlaybookId]
  );

  const selectedStep = useMemo(
    () => steps.find((s) => s.id === selectedStepId) || null,
    [steps, selectedStepId]
  );

  const [newStep, setNewStep] = useState<Omit<PlaybookStep, "id" | "playbook">>(
    {
      step_index: 0,
      day_offset: 0,
      action_type: "EMAIL_SEND",
      instructions: "",
      enabled: true,
      from_email: "",
      reply_to: "",
      material_ids: [],
    }
  );

  useEffect(() => {
    let mounted = true;

    async function loadInitial() {
      setLoading(true);
      setError("");
      try {
        const [pbs, mats] = await Promise.all([
          apiJson<Playbook[]>("/api/playbooks/"),
          apiJson<Material[]>("/api/materials/"),
        ]);

        if (!mounted) return;

        setPlaybooks(pbs);
        setMaterials(mats);

        const firstId = pbs[0]?.id ?? null;
        setSelectedPlaybookId(firstId);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || "Failed to load");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    loadInitial();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadSteps() {
      setError("");
      setSteps([]);
      setSelectedStepId(null);

      if (!selectedPlaybookId) return;

      try {
        const st = await apiJson<PlaybookStep[]>(
          `/api/playbooks/${selectedPlaybookId}/steps/`
        );
        if (!mounted) return;

        const sorted = [...st].sort((a, b) => {
          if (a.day_offset !== b.day_offset) return a.day_offset - b.day_offset;
          if (a.step_index !== b.step_index) return a.step_index - b.step_index;
          return a.id - b.id;
        });

        setSteps(sorted);
        if (sorted.length) setSelectedStepId(sorted[0].id);

        const nextIndex = sorted.length
          ? Math.max(...sorted.map((s) => s.step_index)) + 1
          : 0;
        setNewStep((prev) => ({ ...prev, step_index: nextIndex }));
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || "Failed to load steps");
      }
    }

    loadSteps();
    return () => {
      mounted = false;
    };
  }, [selectedPlaybookId]);

  const stepsByDay = useMemo(() => {
    const map = new Map<number, PlaybookStep[]>();
    for (const s of steps) {
      const arr = map.get(s.day_offset) || [];
      arr.push(s);
      map.set(s.day_offset, arr);
    }
    const days = Array.from(map.keys()).sort((a, b) => a - b);
    return days.map((d) => ({
      day: d,
      steps: (map.get(d) || []).sort((a, b) => {
        if (a.step_index !== b.step_index) return a.step_index - b.step_index;
        return a.id - b.id;
      }),
    }));
  }, [steps]);

  function updateStepLocal(stepId: number, patch: Partial<PlaybookStep>) {
    setSteps((prev) =>
      prev.map((s) => (s.id === stepId ? { ...s, ...patch } : s))
    );
  }

  function toggleMaterial(stepId: number, materialId: number) {
    const step = steps.find((s) => s.id === stepId);
    if (!step) return;

    const set = new Set(step.material_ids);
    if (set.has(materialId)) set.delete(materialId);
    else set.add(materialId);

    updateStepLocal(stepId, { material_ids: Array.from(set) });
  }

  async function createPlaybook() {
    const name = newPlaybookName.trim();
    if (!name) return;

    setCreatingPlaybook(true);
    setError("");
    try {
      const created = await apiJson<Playbook>("/api/playbooks/", {
        method: "POST",
        body: JSON.stringify({
          name,
          description: "",
          is_active: true,
        }),
      });

      setPlaybooks((prev) => [created, ...prev]);
      setSelectedPlaybookId(created.id);
      setNewPlaybookName("");
    } catch (e: any) {
      setError(e?.message || "Failed to create playbook");
    } finally {
      setCreatingPlaybook(false);
    }
  }

  async function createStep() {
    if (!selectedPlaybookId) return;

    setCreatingStep(true);
    setError("");
    try {
      const created = await apiJson<PlaybookStep>(
        `/api/playbooks/${selectedPlaybookId}/steps/`,
        {
          method: "POST",
          body: JSON.stringify({
            step_index: newStep.step_index,
            day_offset: newStep.day_offset,
            action_type: newStep.action_type,
            instructions: newStep.instructions,
            enabled: newStep.enabled,
            from_email: newStep.from_email,
            reply_to: newStep.reply_to,
            material_ids: newStep.material_ids,
          }),
        }
      );

      setSteps((prev) =>
        [...prev, created].sort((a, b) => {
          if (a.day_offset !== b.day_offset) return a.day_offset - b.day_offset;
          if (a.step_index !== b.step_index) return a.step_index - b.step_index;
          return a.id - b.id;
        })
      );
      setSelectedStepId(created.id);

      const nextIndex =
        (steps.length ? Math.max(...steps.map((s) => s.step_index)) : -1) + 1;
      setNewStep((prev) => ({
        ...prev,
        step_index: Math.max(prev.step_index + 1, nextIndex),
        instructions: "",
        material_ids: [],
      }));
    } catch (e: any) {
      setError(e?.message || "Failed to create step");
    } finally {
      setCreatingStep(false);
    }
  }

  async function saveStep(stepId: number) {
    const step = steps.find((s) => s.id === stepId);
    if (!step) return;

    setSavingStepId(stepId);
    setError("");
    try {
      const updated = await apiJson<PlaybookStep>(
        `/api/playbook-steps/${stepId}/`,
        {
          method: "PATCH",
          body: JSON.stringify({
            step_index: step.step_index,
            day_offset: step.day_offset,
            action_type: step.action_type,
            instructions: step.instructions,
            enabled: step.enabled,
            from_email: step.from_email,
            reply_to: step.reply_to,
            material_ids: step.material_ids,
          }),
        }
      );

      setSteps((prev) =>
        prev
          .map((s) => (s.id === stepId ? updated : s))
          .sort((a, b) => {
            if (a.day_offset !== b.day_offset)
              return a.day_offset - b.day_offset;
            if (a.step_index !== b.step_index)
              return a.step_index - b.step_index;
            return a.id - b.id;
          })
      );
    } catch (e: any) {
      setError(e?.message || "Failed to save step");
    } finally {
      setSavingStepId(null);
    }
  }

  if (loading) {
    return <div className="tw-p-6 tw-text-slate-200">Loading…</div>;
  }

  return (
    <div className="tw-flex tw-h-full tw-w-full tw-gap-4 tw-p-6 tw-text-slate-200">
      <div className="tw-w-[360px] tw-shrink-0 tw-rounded-2xl tw-border tw-border-slate-700 tw-bg-slate-900 tw-p-4">
        <div className="tw-text-sm tw-font-semibold tw-text-slate-300">
          Playbooks
        </div>

        <div className="tw-mt-3 tw-flex tw-gap-2">
          <input
            value={newPlaybookName}
            onChange={(e) => setNewPlaybookName(e.target.value)}
            placeholder="New playbook name"
            className="tw-w-full tw-rounded-xl tw-border tw-border-slate-700 tw-bg-slate-950 tw-px-3 tw-py-2 tw-text-slate-200"
          />
          <button
            onClick={createPlaybook}
            disabled={creatingPlaybook || !newPlaybookName.trim()}
            className="tw-rounded-xl tw-bg-gradient-to-r tw-from-[#3874CB] tw-to-[#A1FCDD] tw-px-4 tw-py-2 tw-text-slate-900 tw-font-semibold disabled:tw-opacity-60"
          >
            Add
          </button>
        </div>

        <div className="tw-mt-3 tw-flex tw-flex-col tw-gap-2">
          {playbooks.length === 0 ? (
            <div className="tw-text-sm tw-text-slate-400">
              No playbooks yet.
            </div>
          ) : (
            playbooks.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPlaybookId(p.id)}
                className={[
                  "tw-text-left tw-rounded-xl tw-border tw-p-3 tw-transition",
                  selectedPlaybookId === p.id
                    ? "tw-border-[#A1FCDD] tw-bg-slate-800"
                    : "tw-border-slate-800 tw-bg-slate-950 tw-hover:bg-slate-900",
                ].join(" ")}
              >
                <div className="tw-flex tw-items-center tw-justify-between tw-gap-2">
                  <div className="tw-text-sm tw-font-semibold tw-text-slate-200">
                    {p.name}
                  </div>
                  <div className="tw-text-xs tw-text-slate-400">
                    {p.is_active ? "Active" : "Off"}
                  </div>
                </div>
                {p.description ? (
                  <div className="tw-mt-1 tw-line-clamp-2 tw-text-xs tw-text-slate-400">
                    {p.description}
                  </div>
                ) : null}
              </button>
            ))
          )}
        </div>

        <div className="tw-mt-6 tw-text-sm tw-font-semibold tw-text-slate-300">
          Steps
        </div>

        {!selectedPlaybook ? (
          <div className="tw-mt-2 tw-text-sm tw-text-slate-400">
            Select a playbook.
          </div>
        ) : stepsByDay.length === 0 ? (
          <div className="tw-mt-2 tw-text-sm tw-text-slate-400">
            No steps yet.
          </div>
        ) : (
          <div className="tw-mt-2 tw-flex tw-flex-col tw-gap-3">
            {stepsByDay.map((group) => (
              <div
                key={group.day}
                className="tw-rounded-xl tw-border tw-border-slate-800 tw-bg-slate-950 tw-p-2"
              >
                <div className="tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-slate-400">
                  Day {group.day}
                </div>
                <div className="tw-flex tw-flex-col">
                  {group.steps.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStepId(s.id)}
                      className={[
                        "tw-text-left tw-rounded-lg tw-px-2 tw-py-2 tw-transition",
                        selectedStepId === s.id
                          ? "tw-bg-slate-800 tw-text-white"
                          : "tw-hover:bg-slate-900 tw-text-slate-200",
                      ].join(" ")}
                    >
                      <div className="tw-flex tw-items-center tw-justify-between">
                        <div className="tw-text-sm tw-font-medium">
                          #{s.step_index} {s.action_type.replace(/_/g, " ")}
                        </div>
                        <div className="tw-text-xs tw-text-slate-400">
                          {s.enabled ? "On" : "Off"}
                        </div>
                      </div>
                      <div className="tw-mt-1 tw-line-clamp-2 tw-text-xs tw-text-slate-400">
                        {s.instructions || "No instructions"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedPlaybook ? (
          <div className="tw-mt-4 tw-rounded-2xl tw-border tw-border-slate-800 tw-bg-slate-950 tw-p-3">
            <div className="tw-text-sm tw-font-semibold tw-text-slate-300">
              Add step
            </div>

            <div className="tw-mt-2 tw-grid tw-grid-cols-2 tw-gap-2">
              <label className="tw-text-xs tw-text-slate-400">
                Day
                <input
                  type="number"
                  value={newStep.day_offset}
                  onChange={(e) =>
                    setNewStep((p) => ({
                      ...p,
                      day_offset: Number(e.target.value || 0),
                    }))
                  }
                  className="tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-900 tw-px-2 tw-py-1 tw-text-slate-200"
                />
              </label>

              <label className="tw-text-xs tw-text-slate-400">
                Index
                <input
                  type="number"
                  value={newStep.step_index}
                  onChange={(e) =>
                    setNewStep((p) => ({
                      ...p,
                      step_index: Number(e.target.value || 0),
                    }))
                  }
                  className="tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-900 tw-px-2 tw-py-1 tw-text-slate-200"
                />
              </label>

              <label className="tw-col-span-2 tw-text-xs tw-text-slate-400">
                Action
                <select
                  value={newStep.action_type}
                  onChange={(e) =>
                    setNewStep((p) => ({
                      ...p,
                      action_type: e.target.value as any,
                    }))
                  }
                  className="tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-900 tw-px-2 tw-py-2 tw-text-slate-200"
                >
                  <option value="EMAIL_SEND">Email Send</option>
                  <option value="LINKEDIN_CONNECT">LinkedIn Connect</option>
                  <option value="LINKEDIN_MESSAGE">LinkedIn Message</option>
                </select>
              </label>

              <label className="tw-col-span-2 tw-text-xs tw-text-slate-400">
                Instructions
                <textarea
                  value={newStep.instructions}
                  onChange={(e) =>
                    setNewStep((p) => ({ ...p, instructions: e.target.value }))
                  }
                  rows={4}
                  className="tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-900 tw-px-2 tw-py-2 tw-text-slate-200"
                />
              </label>

              <button
                onClick={createStep}
                disabled={creatingStep}
                className="tw-col-span-2 tw-rounded-xl tw-bg-gradient-to-r tw-from-[#3874CB] tw-to-[#A1FCDD] tw-px-3 tw-py-2 tw-text-slate-900 tw-font-semibold disabled:tw-opacity-60"
              >
                {creatingStep ? "Creating…" : "Create step"}
              </button>
            </div>
          </div>
        ) : null}

        {error ? (
          <div className="tw-mt-3 tw-text-sm tw-text-red-300">{error}</div>
        ) : null}
      </div>

      <div className="tw-flex-1 tw-rounded-2xl tw-border tw-border-slate-700 tw-bg-slate-900 tw-p-4">
        {!selectedPlaybook ? (
          <div className="tw-text-slate-400">Select a playbook.</div>
        ) : !selectedStep ? (
          <div className="tw-text-slate-400">Select a step.</div>
        ) : (
          <div className="tw-flex tw-flex-col tw-gap-4">
            <div className="tw-flex tw-items-center tw-justify-between">
              <div className="tw-flex tw-flex-col">
                <div className="tw-text-lg tw-font-semibold">
                  {selectedPlaybook.name}
                </div>
                <div className="tw-text-xs tw-text-slate-400">
                  Step #{selectedStep.step_index} (Day {selectedStep.day_offset}
                  )
                </div>
              </div>

              <button
                onClick={() => saveStep(selectedStep.id)}
                disabled={savingStepId === selectedStep.id}
                className="tw-rounded-xl tw-bg-gradient-to-r tw-from-[#3874CB] tw-to-[#A1FCDD] tw-px-3 tw-py-2 tw-text-slate-900 tw-font-semibold disabled:tw-opacity-60"
              >
                {savingStepId === selectedStep.id ? "Saving…" : "Save"}
              </button>
            </div>

            <div className="tw-grid tw-grid-cols-2 tw-gap-3">
              <label className="tw-text-xs tw-text-slate-400">
                Day offset
                <input
                  type="number"
                  value={selectedStep.day_offset}
                  onChange={(e) =>
                    updateStepLocal(selectedStep.id, {
                      day_offset: Number(e.target.value || 0),
                    })
                  }
                  className="tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-950 tw-px-2 tw-py-2 tw-text-slate-200"
                />
              </label>

              <label className="tw-text-xs tw-text-slate-400">
                Step index
                <input
                  type="number"
                  value={selectedStep.step_index}
                  onChange={(e) =>
                    updateStepLocal(selectedStep.id, {
                      step_index: Number(e.target.value || 0),
                    })
                  }
                  className="tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-950 tw-px-2 tw-py-2 tw-text-slate-200"
                />
              </label>

              <label className="tw-col-span-2 tw-text-xs tw-text-slate-400">
                Action type
                <select
                  value={selectedStep.action_type}
                  onChange={(e) =>
                    updateStepLocal(selectedStep.id, {
                      action_type: e.target.value as any,
                    })
                  }
                  className="tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-950 tw-px-2 tw-py-2 tw-text-slate-200"
                >
                  <option value="EMAIL_SEND">Email Send</option>
                  <option value="LINKEDIN_CONNECT">LinkedIn Connect</option>
                  <option value="LINKEDIN_MESSAGE">LinkedIn Message</option>
                </select>
              </label>

              <label className="tw-col-span-2 tw-text-xs tw-text-slate-400">
                Instructions (LLM prompt)
                <textarea
                  value={selectedStep.instructions}
                  onChange={(e) =>
                    updateStepLocal(selectedStep.id, {
                      instructions: e.target.value,
                    })
                  }
                  rows={10}
                  className="tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-950 tw-px-2 tw-py-2 tw-text-slate-200"
                />
              </label>

              <label className="tw-text-xs tw-text-slate-400">
                Enabled
                <div className="tw-mt-1 tw-flex tw-items-center tw-gap-2">
                  <input
                    type="checkbox"
                    checked={selectedStep.enabled}
                    onChange={(e) =>
                      updateStepLocal(selectedStep.id, {
                        enabled: e.target.checked,
                      })
                    }
                    className="tw-h-4 tw-w-4"
                  />
                  <span className="tw-text-sm tw-text-slate-300">
                    {selectedStep.enabled ? "On" : "Off"}
                  </span>
                </div>
              </label>

              <div />

              <label className="tw-text-xs tw-text-slate-400">
                From email
                <input
                  value={selectedStep.from_email}
                  onChange={(e) =>
                    updateStepLocal(selectedStep.id, {
                      from_email: e.target.value,
                    })
                  }
                  className="tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-950 tw-px-2 tw-py-2 tw-text-slate-200"
                />
              </label>

              <label className="tw-text-xs tw-text-slate-400">
                Reply-to
                <input
                  value={selectedStep.reply_to}
                  onChange={(e) =>
                    updateStepLocal(selectedStep.id, {
                      reply_to: e.target.value,
                    })
                  }
                  className="tw-mt-1 tw-w-full tw-rounded-lg tw-border tw-border-slate-700 tw-bg-slate-950 tw-px-2 tw-py-2 tw-text-slate-200"
                />
              </label>
            </div>

            <div className="tw-rounded-2xl tw-border tw-border-slate-800 tw-bg-slate-950 tw-p-4">
              <div className="tw-flex tw-items-center tw-justify-between">
                <div className="tw-text-sm tw-font-semibold tw-text-slate-300">
                  Materials
                </div>
                <div className="tw-text-xs tw-text-slate-400">
                  Selected: {selectedStep.material_ids.length}
                </div>
              </div>

              {materials.length === 0 ? (
                <div className="tw-mt-2 tw-text-sm tw-text-slate-400">
                  No materials uploaded.
                </div>
              ) : (
                <div className="tw-mt-3 tw-grid tw-grid-cols-2 tw-gap-2">
                  {materials.map((m) => {
                    const checked = selectedStep.material_ids.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        onClick={() => toggleMaterial(selectedStep.id, m.id)}
                        className={[
                          "tw-rounded-xl tw-border tw-p-3 tw-text-left tw-transition",
                          checked
                            ? "tw-border-[#A1FCDD] tw-bg-slate-900"
                            : "tw-border-slate-800 tw-bg-slate-950 tw-hover:bg-slate-900",
                        ].join(" ")}
                      >
                        <div className="tw-flex tw-items-start tw-justify-between tw-gap-2">
                          <div className="tw-text-sm tw-font-medium tw-text-slate-200">
                            {m.title}
                          </div>
                          <div className="tw-text-xs tw-text-slate-400">
                            {checked ? "Selected" : ""}
                          </div>
                        </div>
                        <div className="tw-mt-1 tw-text-xs tw-text-slate-500">
                          {m.mime_type || "file"}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {error ? (
              <div className="tw-text-sm tw-text-red-300">{error}</div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
