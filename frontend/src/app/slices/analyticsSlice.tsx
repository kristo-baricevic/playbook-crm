// analyticsSlice.ts
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { apiGet, apiPost } from "../api/client";

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

type ChartState = {
  charts: Record<string, unknown>;
  chartConfigs: Record<string, ChartConfig>;
  dashboards: Record<string, Dashboard>;
  activeDashboardId: string | null;
  loading: boolean;
};

const initialState: ChartState = {
  charts: {},
  chartConfigs: {},
  dashboards: {},
  activeDashboardId: null,
  loading: false,
};

export const fetchChart = createAsyncThunk(
  "analytics/fetchChart",
  async (params: { chartId: string; metric: MetricType; days: number }) => {
    const data = await apiGet(
      `/api/analytics/charts/?type=${params.metric}&days=${params.days}`
    );
    return { chartId: params.chartId, data };
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
        const cfg = action.payload;
        state.chartConfigs[cfg.id] = cfg;

        const dash = state.dashboards[state.activeDashboardId!];
        dash.chartIds.push(cfg.id);
      },

      prepare(
        chartType: ChartType,
        metric: MetricType,
        days: number = 30
      ): { payload: ChartConfig } {
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

    createDashboard(state, action) {
      const id = nanoid();
      state.dashboards[id] = {
        id,
        name: action.payload,
        chartIds: [],
      };
      state.activeDashboardId = id;
    },

    setActiveDashboard(state, action) {
      state.activeDashboardId = action.payload;
    },

    updateChartConfig(state, action) {
      const { id, updates } = action.payload;
      Object.assign(state.chartConfigs[id], updates);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchChart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChart.fulfilled, (state, action) => {
        state.charts[action.payload.chartId] = action.payload.data;
        state.loading = false;
      });
  },
});

export const {
  createChart,
  createDashboard,
  setActiveDashboard,
  updateChartConfig,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
