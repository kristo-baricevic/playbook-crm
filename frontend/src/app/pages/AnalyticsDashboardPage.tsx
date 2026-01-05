// AnalyticsDashboardPage.tsx
import { useDispatch, useSelector } from "react-redux";
import {
  createChart,
  createDashboard,
  fetchChart,
} from "../slices/analyticsSlice";
import { AppDispatch, RootState } from "../../store";
import { ChartGrid } from "../components/ChartGrid";
import { NewChartModal } from "../components/NewChartModal";

export function AnalyticsDashboardPage() {
  const dispatch = useDispatch<AppDispatch>();

  const dashboard = useSelector((s: RootState) =>
    s.analytics.activeDashboardId
      ? s.analytics.dashboards[s.analytics.activeDashboardId]
      : null
  );

  return (
    <div>
      <h1>Analytics</h1>

      <button onClick={() => dispatch(createDashboard("My Dashboard"))}>
        New Dashboard
      </button>

      {dashboard && <ChartGrid dashboard={dashboard} />}

      <NewChartModal
        onCreate={(chartType: any, metric: any) => {
          const action = createChart(chartType, metric);
          dispatch(action);
          dispatch(
            fetchChart({
              chartId: action.payload.id,
              metric,
              days: 30,
            })
          );
        }}
      />
    </div>
  );
}
