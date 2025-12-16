import type { RouteObject } from "react-router";
import type { AppRoutes } from "shared/config/routeConfig/routes.ts";

export type RouteConfigItem = Omit<RouteObject, "children"> & {
  authOnly?: boolean;
  routeKey: AppRoutes;
};

export type RouteConfig = Record<AppRoutes, RouteConfigItem>;
