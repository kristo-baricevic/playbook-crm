import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ThreePie } from "./charts/ThreePie";
import { ThreeLine } from "./charts/ThreeLine";
import { ThreeCombo } from "./charts/ThreeCombo";
import { ThreeBar } from "./charts/ThreeBar";

export function ChartRenderer({ config }: any) {
  const data = useSelector((s: RootState) => s.analytics.charts[config.id]);

  const loadingById = useSelector(
    (s: RootState) => s.analytics.chartLoadingById
  );
  const isLoading = !!loadingById[config.id];

  if (!data) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-400">
        {isLoading ? "Loading chart..." : "No data yet."}
      </div>
    );
  }

  console.log("chart renderer ", data);

  switch (config.chartType) {
    case "pie":
      return <ThreePie data={data} />;
    case "bar":
      return <ThreeBar data={data} />;
    case "line":
      return <ThreeLine data={data} />;
    case "combo":
      return <ThreeCombo data={data} />;
    default:
      return null;
  }
}
