import { HomePage } from "pages/HomePage";
import { CatalogPage } from "pages/CatalogPage";
import { NoveltyPage } from "pages/NoveltyPage";
import { PopularPage } from "pages/PopularPage";
import { AnimeDetailPage } from "pages/AnimeDetailPage";
import { SearchPage } from "pages/SearchPage";
import { NewsPage } from "pages/NewsPage/ui/NewsPage.tsx";
import { RegistrationPage } from "pages/RegistrationPage";
import { LoginPage } from "pages/LoginPage";
import type { RouteConfig } from "shared/config/routeConfig/types.ts";
import { ProfilePage } from "pages/ProfilePage";
import { AppRoutes, routePaths } from "./routes.ts";
import {NotFoundPage} from "pages/NotFoundPage";

export const routeConfig: RouteConfig = {
  [AppRoutes.HOME]: {
    routeKey: AppRoutes.HOME,
    path: routePaths[AppRoutes.HOME],
    element: <HomePage />,
    authOnly: true,
  },
  [AppRoutes.CATALOG]: {
    routeKey: AppRoutes.CATALOG,
    path: routePaths[AppRoutes.CATALOG],
    element: <CatalogPage />,
    authOnly: true,
  },
  [AppRoutes.NOVELTY]: {
    routeKey: AppRoutes.NOVELTY,
    path: routePaths[AppRoutes.NOVELTY],
    element: <NoveltyPage />,
    authOnly: true,
  },
  [AppRoutes.POPULAR]: {
    routeKey: AppRoutes.POPULAR,
    path: routePaths[AppRoutes.POPULAR],
    element: <PopularPage />,
    authOnly: true,
  },
  [AppRoutes.ANIME_DETAIL_PAGE]: {
    routeKey: AppRoutes.ANIME_DETAIL_PAGE,
    path: routePaths[AppRoutes.ANIME_DETAIL_PAGE],
    element: <AnimeDetailPage />,
    authOnly: true,
  },
  [AppRoutes.SEARCH]: {
    routeKey: AppRoutes.SEARCH,
    path: routePaths[AppRoutes.SEARCH],
    element: <SearchPage />,
    authOnly: true,
  },
  [AppRoutes.NEWS]: {
    routeKey: AppRoutes.NEWS,
    path: routePaths[AppRoutes.NEWS],
    element: <NewsPage />,
    authOnly: true,
  },
  [AppRoutes.REGISTRATION]: {
    routeKey: AppRoutes.REGISTRATION,
    path: routePaths[AppRoutes.REGISTRATION],
    element: <RegistrationPage />,
  },
  [AppRoutes.LOGIN]: {
    routeKey: AppRoutes.LOGIN,
    path: routePaths[AppRoutes.LOGIN],
    element: <LoginPage />,
  },
  [AppRoutes.PROFILE]: {
    routeKey: AppRoutes.PROFILE,
    path: routePaths[AppRoutes.PROFILE],
    element: <ProfilePage />,
  },
  [AppRoutes.NOT_FOUND]: {
    routeKey: AppRoutes.NOT_FOUND,
    path: routePaths[AppRoutes.NOT_FOUND],
    element: <NotFoundPage />,
  }
};
