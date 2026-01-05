import { configureStore } from "@reduxjs/toolkit"
import crmReducer from "./app/slices/crmSlice"
import playbooksReducer from "./app/slices/playbooksSlice"
import generationReducer from "./app/slices/generationSlice"
import analyticsReducer from "./app/slices/analyticsSlice"

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
