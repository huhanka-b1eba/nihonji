import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./rootReducer.ts";

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
}


export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
