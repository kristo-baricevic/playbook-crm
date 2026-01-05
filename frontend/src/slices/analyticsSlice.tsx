import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet } from "../api/client";

type ChartState = {
  charts: Record<string, unknown>;
  loading: boolean;
};

const initialState: ChartState = {
  charts: {},
  loading: false,
};

export const fetchChart = createAsyncThunk(
  "analytics/fetchChart",
  async (params: { type: string; days: number }) => {
    const data = await apiGet(
      `/api/analytics/charts/?type=${params.type}&days=${params.days}`
    );
    return { type: params.type, data };
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChart.fulfilled, (state, action) => {
        state.charts[action.payload.type] = action.payload.data;
        state.loading = false;
      });
  },
});

export default analyticsSlice.reducer;
