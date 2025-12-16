import { useDispatch } from "react-redux";
import type { AppDispatch } from "../config/store.ts";

export const useAppDispatch = () => useDispatch<AppDispatch>;
