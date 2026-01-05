// ChartGrid.tsx
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ChartRenderer } from "./ChartRenderer";

export function ChartGrid({ dashboard }: any) {
  const configs = useSelector((s: RootState) => s.analytics.chartConfigs);

  return (
    <div className="grid">
      {dashboard.chartIds.map((id: string | number) => (
        <ChartRenderer key={id} config={configs[id]} />
      ))}
    </div>
  );
}
