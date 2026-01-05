import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGet } from "../api/client";

export type Contact = {
  id: number;
  name: string;
  email: string;
  company_name: string;
  location: string;
  industry: string;
  last_contacted: string | null;
  next_contacted: string | null;
  emails_sent: number;
  emails_scheduled: number;
};

type CRMState = {
  contacts: Contact[];
  loading: boolean;
};

const initialState: CRMState = {
  contacts: [],
  loading: false,
};

export const fetchContacts = createAsyncThunk("crm/fetchContacts", async () => {
  const res = await apiGet<{ results: Contact[] }>("/api/contacts/");
  return res.results;
});

const crmSlice = createSlice({
  name: "crm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.loading = false;
      });
  },
});

export default crmSlice.reducer;
