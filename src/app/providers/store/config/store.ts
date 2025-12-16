import { configureStore } from "@reduxjs/toolkit";
import { jikanApi } from "shared/api/jikanApi.ts";
import { rootReducer } from "./rootReducer.ts";

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jikanApi.middleware),
  });

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
