// NewChartModal.tsx
export function NewChartModal({ onCreate }: any) {
  return (
    <div>
      <button onClick={() => onCreate("pie", "emails_sent")}>Add Pie</button>
      <button onClick={() => onCreate("bar", "industry_breakdown")}>
        Add Bar
      </button>
      <button onClick={() => onCreate("line", "response_rate")}>
        Add Line
      </button>
      <button onClick={() => onCreate("combo", "emails_sent")}>
        Add Combo
      </button>
    </div>
  );
}
