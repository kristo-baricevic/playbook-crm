import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet } from "../api/client";

export type PlaybookStep = {
  id: number;
  order: number;
  day_offset: number;
  channel: string;
  prompt_version: number;
};

export type Playbook = {
  id: number;
  name: string;
  steps: PlaybookStep[];
};

type PlaybooksState = {
  playbooks: Playbook[];
};

const initialState: PlaybooksState = {
  playbooks: [],
};

export const fetchPlaybooks = createAsyncThunk("playbooks/fetch", async () => {
  return apiGet<Playbook[]>("/api/playbooks/");
});

const playbooksSlice = createSlice({
  name: "playbooks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlaybooks.fulfilled, (state, action) => {
      state.playbooks = action.payload;
    });
  },
});

export default playbooksSlice.reducer;
