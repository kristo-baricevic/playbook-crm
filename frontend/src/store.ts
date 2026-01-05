import { configureStore } from "@reduxjs/toolkit"
import crmReducer from "./slices/crmSlice"
import playbooksReducer from "./slices/playbooksSlice"
import generationReducer from "./slices/generationSlice"
import analyticsReducer from "./slices/analyticsSlice"

export const store = configureStore({
  reducer: {
    crm: crmReducer,
    playbooks: playbooksReducer,
    generation: generationReducer,
    analytics: analyticsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
