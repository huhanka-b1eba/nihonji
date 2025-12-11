import {jikanApi} from "../../../shared/api/jikanApi.ts";
import type {News} from "../model/news.ts";


export const newsApi = jikanApi.injectEndpoints({
    endpoints: (build) => ({
        getAnimeNews: build.query<News[], string>({
            query: (id: string) => `/anime/${id}/news`,
            transformResponse: (resp: any) => resp?.data ?? resp,
        })
    })
})

export const {useGetAnimeNewsQuery} = newsApi;