import { useMemo } from "react";
import { useGetAnimeNewsQuery } from "../api/newsApi";

export function useMultiAnimeNews(ids: string[]) {
    const queries = ids.map((id) => useGetAnimeNewsQuery(id));

    const isLoading = queries.some((q) => q.isLoading);

    const error = queries.find((q) => q.error)?.error ?? null;

    const queryDataList = queries.map((q) => q.data);

    const queryString = [queryDataList.join("|")];

    const news = useMemo(() => {
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
        error
    };
}
