import { combineReducers } from "@reduxjs/toolkit";
import { jikanApi } from "shared/api/jikanApi.ts";

export const rootReducer = combineReducers({
  [jikanApi.reducerPath]: jikanApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
