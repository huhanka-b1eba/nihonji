import type { RouteProps } from "react-router-dom";
import {HomePage} from "../../../pages/HomePage";
import {CatalogPage} from "../../../pages/CatalogPage";
import { AppRoutes, routePaths } from "./routes.ts";
import {NoveltyPage} from "../../../pages/NoveltyPage";


export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.HOME]: {
        path: routePaths[AppRoutes.HOME],
        element: <HomePage />
    },
    [AppRoutes.CATALOG]: {
        path: routePaths[AppRoutes.CATALOG],
        element: <CatalogPage />
    },
    [AppRoutes.NOVELTY]: {
        path: routePaths[AppRoutes.NOVELTY],
        element: <NoveltyPage />
    }
}