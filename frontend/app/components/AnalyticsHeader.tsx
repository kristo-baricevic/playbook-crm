import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
  createChart,
  createDashboard,
  fetchChart,
} from "../slices/analyticsSlice";
import { NewChartModal } from "./NewChartModal";

export function AnalyticsHeader() {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex flex-row gap-2">
      <div className="flex">
        <NewChartModal
          onCreate={(chartType: any, metric: any) => {
            const action = createChart(chartType, metric);
            dispatch(action);
            console.log("action.payload.id");
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
      <div className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800">
        <button onClick={() => dispatch(createDashboard("My Dashboard"))}>
          Save View
        </button>
      </div>
    </div>
  );
}
