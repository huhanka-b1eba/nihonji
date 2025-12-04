
export const AppRoutes  = {
    HOME: 'home',
    CATALOG: 'catalog',
    NOVELTY: 'novelty',
    POPULAR: 'popular'
} as const;

export type AppRoutes = typeof AppRoutes[keyof typeof AppRoutes];

export const routePaths: Record<AppRoutes, string> = {
    [AppRoutes.HOME]: '/',
    [AppRoutes.CATALOG]: '/catalog',
    [AppRoutes.NOVELTY]: '/novelty',
    [AppRoutes.POPULAR]: '/popular'
}

