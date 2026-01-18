import { useMemo } from "react";
import { useGetAnimeNewsQuery } from "../api/newsApi";

export function useMultiAnimeNews(ids: string[]) {
  // как лучше сделать: либо в апи есть какая-то ручка, которая принимает массив ids и ты сначала его собираешь, а потом делаешь один запрос (batch называется)
  // либо внутри getAnimeNews реализовать свой queryFn с N запросами и Promise.all
  const queries = ids.map((id) => useGetAnimeNewsQuery(id));

  const isLoading = queries.some((q) => q.isLoading);

  const error = queries.find((q) => q.error)?.error ?? null;

  const queryDataList = queries.map((q) => q.data);

  const queryString = [queryDataList.join("|")];

  const news = useMemo(() => {
    // NOTE: ts грустно плачет в углу, потому что о нем забыли :(
    let all: any[] = [];

    queries.forEach((q) => {
      if (Array.isArray(q.data)) {
        all = [...all, ...q.data];
      }
    });

    return all;
  }, [queryString]);

  return {
    news,
    isLoading,
    error,
  };
}
