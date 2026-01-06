"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ChartGrid } from "../components/ChartGrid";
import { AnalyticsHeader } from "../components/AnalyticsHeader";
import { AnalyticsCharts } from "../components/AnalyticsCharts";

export default function AnalyticsDashboardPage() {
  return (
    <div>
      <h1 className="uppercase text-slate-200">Analytics</h1>
      <div className="w-screen h-screen border border-1 border-slate-500 rounded-md p-4">
        <AnalyticsHeader />
        <AnalyticsCharts />
        {/* {dashboard && <ChartGrid dashboard={dashboard} />} */}
      </div>
    </div>
  );
}
