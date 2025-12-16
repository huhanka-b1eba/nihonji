export const AppRoutes = {
  HOME: "home",
  CATALOG: "catalog",
  NOVELTY: "novelty",
  POPULAR: "popular",
  ANIME_DETAIL_PAGE: "anime-detail-page",
  SEARCH: "search",
  NEWS: "news",
  REGISTRATION: "registration",
  LOGIN: "login",
  PROFILE: "profile",
} as const;

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes];

export const routePaths: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.CATALOG]: "/catalog",
  [AppRoutes.NOVELTY]: "/novelty",
  [AppRoutes.POPULAR]: "/popular",
  [AppRoutes.ANIME_DETAIL_PAGE]: "/anime/:id",
  [AppRoutes.SEARCH]: "/search",
  [AppRoutes.NEWS]: "/news",
  [AppRoutes.REGISTRATION]: "/registration",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.PROFILE]: "/profile",
};
