import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ChartRenderer } from "./ChartRenderer";

export function ChartGrid({ dashboard }: any) {
  const configs = useSelector((s: RootState) => s.analytics.chartConfigs);

  console.log("chart grid", configs);

  return (
    <div className="grid">
      {dashboard.chartIds.map((id: string) =>
        configs[id] ? <ChartRenderer key={id} config={configs[id]} /> : null
      )}
    </div>
  );
}
