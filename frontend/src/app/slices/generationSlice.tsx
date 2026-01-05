import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiPost } from "../api/client";

type GenerationState = {
  generating: boolean;
  lastRunAt: string | null;
};

const initialState: GenerationState = {
  generating: false,
  lastRunAt: null,
};

export const generateMessages = createAsyncThunk(
  "generation/run",
  async (payload: { playbook_id: number; contact_ids: number[] }) => {
    await apiPost("/api/generate/", payload);
    return new Date().toISOString();
  }
);

const generationSlice = createSlice({
  name: "generation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateMessages.pending, (state) => {
        state.generating = true;
      })
      .addCase(generateMessages.fulfilled, (state, action) => {
        state.generating = false;
        state.lastRunAt = action.payload;
      });
  },
});

export default generationSlice.reducer;
