import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jikanApi = createApi({
  reducerPath: "jikanApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.jikan.moe/v4/" }),
  endpoints: () => ({}),
});
