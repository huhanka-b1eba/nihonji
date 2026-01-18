import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jikanApi = createApi({
  reducerPath: "jikanApi",
  // NOTE: ссылки на апи тоже можно прятать в env, потому что потом они будут разными для dev/stage/prod окружения
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.jikan.moe/v4/" }),
  endpoints: () => ({}),
});
