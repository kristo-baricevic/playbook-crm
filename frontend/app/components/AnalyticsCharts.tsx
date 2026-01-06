import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ChartGrid } from "./ChartGrid";

export function AnalyticsCharts() {
  const dashboard = useSelector((s: RootState) =>
    s.analytics.activeDashboardId
      ? s.analytics.dashboards[s.analytics.activeDashboardId]
      : null
  );

  if (!dashboard) {
    return <div className="mt-4 text-sm text-slate-400">No charts yet.</div>;
  }

  return (
    <div className="mt-4">
      <ChartGrid dashboard={dashboard} />
    </div>
  );
}
