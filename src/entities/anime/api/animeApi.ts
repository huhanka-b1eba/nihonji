import { jikanApi } from "shared/api/jikanApi";
import type {
  Anime,
  AnimeCharacter,
  AnimePicture,
  AnimeRecommendation,
  AnimeStaff,
} from "../model/anime";

// NOTE: лучше перенести в ./model/types.ts и назвать AnimeParams
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

// TODO: это должно жить в shared/types
export type SuccessResponse<TData> = {
  data: TData;
  // NOTE: потенциально могут быть еще какие-то поля от бэка, next_page_token в случае пагинации, например
  // meta: ?;
};

export const animeApi = jikanApi.injectEndpoints({
  endpoints: (build) => ({
    getAnime: build.query<Anime[], GetAnimeArgs | void>({
      query: (args) => {
        const params: Record<string, any> = {};
        if (!args) {
          params.order_by = "popularity";
        } else {
          Object.entries(args).forEach(([k, v]) => {
            // TODO: вынеси в отдельную функцию или юзай omitBy из lodash
            if (v !== undefined && v !== null && v !== "") params[k] = v;
          });
        }
        return {
          url: "/anime",
          params,
        };
      },
      // NOTE: зачем подключали ts, если везде юзаем any? :)
      // TODO: заведи SuccessResponse<TypeOfData> в shared и везде юзай его, прокидывая нужный тип data, приведу тут пример
      transformResponse: (resp: SuccessResponse<Anime[]>) => resp?.data,
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
