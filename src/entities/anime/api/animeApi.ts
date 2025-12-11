import { jikanApi } from "../../../shared/api/jikanApi";
import type {
    Anime,
    AnimeCharacter,
    AnimePicture,
    AnimeRecommendation,
    AnimeStaff,
} from "../model/anime";

export interface GetAnimeArgs {
    type?: string;
    score?: number;
    min_score?: number;
    status?: string;
    rating?: string;
    sfw?: boolean;
    order_by?: string;
    sort?: string;
    letter?: string;
    start_date?: string;
    end_date?: string;
    page?: number;
    limit?: number;
    q?: string;
}

export const animeApi = jikanApi.injectEndpoints({
    endpoints: (build) => ({
        getAnime: build.query<Anime[], GetAnimeArgs | void>({
            query: (args) => {
                const params: Record<string, any> = {};
                if (!args) {
                    params.order_by = "popularity";
                } else {
                    Object.entries(args).forEach(([k, v]) => {
                        if (v !== undefined && v !== null && v !== "") params[k] = v;
                    });
                }
                return {
                    url: "/anime",
                    params,
                };
            },
            transformResponse: (resp: any) => resp?.data ?? resp,
        }),

        getAnimeById: build.query<Anime, string>({
            query: (id: string) => `/anime/${id}/full`,
            transformResponse: (resp: any) => resp?.data ?? resp,
        }),

        getAnimePicture: build.query<AnimePicture[], string>({
            query: (id: string) => `/anime/${id}/pictures`,
            transformResponse: (resp: any) => resp?.data ?? resp,
        }),
        getAnimeCharacters: build.query<AnimeCharacter[], string>({
            query: (id: string) => `/anime/${id}/characters`,
            transformResponse: (resp: any) => resp?.data ?? resp,
        }),
        getAnimeRecommendations: build.query<AnimeRecommendation[], string>({
            query: (id: string) => `/anime/${id}/recommendations`,
            transformResponse: (resp: any) => resp?.data ?? resp,
        }),
        getAnimeStaff: build.query<AnimeStaff[], string>({
            query: (id: string) => `/anime/${id}/staff`,
            transformResponse: (resp: any) => resp?.data ?? resp,
        }),
    }),
});

export const {
    useGetAnimeQuery,
    useGetAnimeByIdQuery,
    useGetAnimePictureQuery,
    useGetAnimeCharactersQuery,
    useGetAnimeStaffQuery,
} = animeApi;
