import { apiGet } from "./client";
import { MetricType } from "../slices/analyticsSlice";

const BASE_URL = "http://localhost:8000";

export function fetchChartData(metric: MetricType, days: number) {
  return apiGet(
    `${BASE_URL}/api/analytics/charts/?type=${metric}&days=${days}`
  );
}
