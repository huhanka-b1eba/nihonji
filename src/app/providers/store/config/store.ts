import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./rootReducer.ts";
import {jikanApi} from "../../../../shared/api/jikanApi.ts";

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(jikanApi.middleware)
    });
}


export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
