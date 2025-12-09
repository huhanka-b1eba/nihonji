import {type TypedUseSelectorHook, useSelector} from "react-redux";
import type {RootState} from "../config/rootReducer.ts";

export const useAppSelector: TypedUseSelectorHook<RootState>  = useSelector;