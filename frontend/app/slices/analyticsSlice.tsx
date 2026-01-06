// analyticsSlice.ts
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { apiGet, apiPost } from "../api/client";
import { fetchChartData } from "../api/analytics";
import type { RootState } from "../store";

export type ChartType = "pie" | "bar" | "line" | "combo";
export type MetricType = "emails_sent" | "industry_breakdown" | "response_rate";

export type ChartConfig = {
  id: string;
  chartType: ChartType;
  metric: MetricType;
  days: number;
};

export type Dashboard = {
  id: string;
  name: string;
  chartIds: string[];
};

type AnalyticsState = {
  charts: Record<string, unknown>;
  chartConfigs: Record<string, ChartConfig>;
  dashboards: Record<string, Dashboard>;
  activeDashboardId: string | null;
  loading: boolean;
  chartLoadingById: Record<string, boolean>;
  createInFlightByKey: Record<string, boolean>;
};

const initialState: AnalyticsState = {
  charts: {},
  chartConfigs: {},
  dashboards: {},
  activeDashboardId: null,
  loading: false,
  chartLoadingById: {},
  createInFlightByKey: {},
};

const chartKey = (p: {
  chartType: ChartType;
  metric: MetricType;
  days: number;
}) => `${p.chartType}:${p.metric}:${p.days}`;

export const fetchChart = createAsyncThunk(
  "analytics/fetchChart",
  async (params: { chartId: string; metric: MetricType; days: number }) => {
    const { metric, days } = params;
    const data = await fetchChartData(metric, days);
    return { chartId: params.chartId, data };
  }
);

export const addChart = createAsyncThunk(
  "analytics/addChart",
  async (
    params: { chartType: ChartType; metric: MetricType; days: number },
    { dispatch }
  ) => {
    const created = dispatch(
      createChart(params.chartType, params.metric, params.days)
    );
    const chartId = (created as any).payload.id as string;

    await dispatch(
      fetchChart({ chartId, metric: params.metric, days: params.days })
    );

    return { chartId };
  },
  {
    condition: (params, { getState }) => {
      const s = getState() as RootState;
      const key = chartKey(params);
      return !s.analytics.createInFlightByKey[key];
    },
  }
);

export const saveDashboard = createAsyncThunk(
  "analytics/saveDashboard",
  async (dashboard: Dashboard) => {
    await apiPost("/api/analytics/dashboards/", dashboard);
    return dashboard;
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    createChart: {
      reducer(state, action: PayloadAction<ChartConfig>) {
        const chartConfig = action.payload;
        console.log("chart in create ", chartConfig);

        // Prevent duplicate insertions
        if (state.chartConfigs[chartConfig.id]) return;

        state.chartConfigs[chartConfig.id] = chartConfig;

        let dashId = state.activeDashboardId;
        if (!dashId) {
          dashId = nanoid();
          state.dashboards[dashId] = {
            id: dashId,
            name: "My Dashboard",
            chartIds: [],
          };
          state.activeDashboardId = dashId;
        }

        const dash = state.dashboards[dashId];
        if (!dash.chartIds.includes(chartConfig.id))
          dash.chartIds.push(chartConfig.id);
      },
      prepare(chartType: ChartType, metric: MetricType, days = 30) {
        return {
          payload: {
            id: nanoid(),
            chartType,
            metric,
            days,
          },
        };
      },
    },
    removeChart(state, action: PayloadAction<{ chartId: string }>) {
      const { chartId } = action.payload;

      delete state.chartConfigs[chartId];
      delete state.charts[chartId];
      delete state.chartLoadingById[chartId];

      Object.values(state.dashboards).forEach((d) => {
        d.chartIds = d.chartIds.filter((id) => id !== chartId);
      });
    },
    createDashboard(state, action: PayloadAction<string>) {
      const id = nanoid();
      state.dashboards[id] = { id, name: action.payload, chartIds: [] };
      state.activeDashboardId = id;
    },
    setActiveDashboard(state, action: PayloadAction<string>) {
      state.activeDashboardId = action.payload;
    },
    updateChartConfig(
      state,
      action: PayloadAction<{ id: string; updates: Partial<ChartConfig> }>
    ) {
      Object.assign(
        state.chartConfigs[action.payload.id],
        action.payload.updates
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChart.pending, (state, action) => {
        state.loading = true;
        state.chartLoadingById[action.meta.arg.chartId] = true;
      })
      .addCase(fetchChart.fulfilled, (state, action) => {
        state.charts[action.payload.chartId] = action.payload.data;
        state.loading = false;
        state.chartLoadingById[action.payload.chartId] = false;
      })
      .addCase(fetchChart.rejected, (state, action) => {
        state.loading = false;
        state.chartLoadingById[action.meta.arg.chartId] = false;
      })
      .addCase(addChart.pending, (state, action) => {
        state.createInFlightByKey[chartKey(action.meta.arg)] = true;
      })
      .addCase(addChart.fulfilled, (state, action) => {
        state.createInFlightByKey[chartKey(action.meta.arg)] = false;
      })
      .addCase(addChart.rejected, (state, action) => {
        state.createInFlightByKey[chartKey(action.meta.arg)] = false;
      });
  },
});

export const {
  createChart,
  removeChart,
  createDashboard,
  setActiveDashboard,
  updateChartConfig,
} = analyticsSlice.actions;

export const selectChartDataById = (s: RootState) => s.analytics.charts;
export const selectChartLoadingById = (s: RootState) =>
  s.analytics.chartLoadingById;

export const selectCharts = (s: RootState) => {
  const { activeDashboardId, dashboards, chartConfigs } = s.analytics;
  if (activeDashboardId && dashboards[activeDashboardId]) {
    return dashboards[activeDashboardId].chartIds
      .map((id) => chartConfigs[id])
      .filter(Boolean);
  }
  return Object.values(chartConfigs);
};

export default analyticsSlice.reducer;
