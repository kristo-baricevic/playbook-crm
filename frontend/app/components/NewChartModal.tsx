// NewChartModal.tsx
import { useEffect, useMemo, useRef, useState } from "react";

export function NewChartModal({ onCreate }: any) {
  const [open, setOpen] = useState(false);
  const didCreateRef = useRef(false);

  const chartTypeOptions = useMemo(
    () => [
      { value: "pie", label: "Pie" },
      { value: "bar", label: "Bar" },
      { value: "line", label: "Line" },
      { value: "combo", label: "Combo" },
    ],
    []
  );

  const metricOptions = useMemo(
    () => [
      { value: "emails_sent", label: "Emails Sent" },
      { value: "industry_breakdown", label: "Industry Breakdown" },
      { value: "response_rate", label: "Response Rate" },
    ],
    []
  );

  const [chartType, setChartType] = useState<string>(chartTypeOptions[0].value);
  const [metric, setMetric] = useState<string>(metricOptions[0].value);

  useEffect(() => {
    if (open) didCreateRef.current = false;
  }, [open]);

  return (
    <div>
      <button
        type="button"
        className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
        onClick={() => setOpen(true)}
      >
        Add Chart
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-5 text-slate-200 shadow-xl"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="text-base font-semibold">Add chart</div>
              <button
                type="button"
                className="rounded-lg px-2 py-1 text-sm text-slate-300 hover:bg-slate-900"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate-400">Chart type</label>
                <select
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200 outline-none"
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                >
                  {chartTypeOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate-400">Metric</label>
                <select
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200 outline-none"
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                >
                  {metricOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-slate-700 bg-slate-100 px-3 py-2 text-sm text-slate-900 hover:bg-white"
                  onClick={() => {
                    if (didCreateRef.current) return;
                    didCreateRef.current = true;
                    onCreate(chartType, metric);
                    setOpen(false);
                  }}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
