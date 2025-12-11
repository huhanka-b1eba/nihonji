import React from "react";
import { Intro } from "../../../features/homePage/intro";
import cls from "./HomePage.module.scss";
import { Popular } from "../../../features/homePage/popular";
import { Novelty } from "../../../features/homePage/novelty";
import { AllTimeFavorites } from "../../../features/homePage/AllTimeFavorites";
import { News } from "../../../features/homePage/news";
import { useGetAnimeQuery } from "../../../entities/anime/api/animeApi";
import { Loader } from "../../../shared/ui/Loader";

const HomePage: React.FC = () => {
    const {
        data: popularAnimeList,
        error: popularError,
        isLoading: popularLoading,
        isFetching: popularFetching,
    } = useGetAnimeQuery({
        order_by: "popularity",
        start_date: "2025-01-01",
        sfw: true,
        page: 1,
        limit: 20,
    });

    const {
        data: ongoingAnimeList,
        error: ongoingError,
        isLoading: ongoingLoading,
        isFetching: ongoingFetching,
    } = useGetAnimeQuery({
        order_by: "score",
        start_date: "2025-01-01",
        min_score: 8,
        sort: "desc",
        sfw: true,
        page: 1,
        limit: 20,
    });

    const {
        data: favouritesAnimeList,
        error: favouritesError,
        isLoading: favouritesLoading,
        isFetching: favouritesFetching,
    } = useGetAnimeQuery({
        order_by: "score",
        sort: "desc",
        sfw: true,
        page: 1,
        limit: 20,
    });

    const anyLoading = popularLoading || ongoingLoading || favouritesLoading;
    const anyFetching = popularFetching || ongoingFetching || favouritesFetching;
    const anyError = popularError || ongoingError || favouritesError;

    if (anyLoading) {
        return (
            <div className={cls.loader}>
                <Loader />
            </div>
        );
    }

    if (anyError) {
        return <div className={cls.error}>Произошла ошибка при загрузке данных.</div>;
    }

    return (
        <main className={cls.homePage}>
            <Intro />

            {anyFetching && <div className={cls.updating}><Loader /></div>}

            <div className={cls.upper}>
                <Popular animeList={popularAnimeList ?? []} />

                <Novelty animeList={ongoingAnimeList ?? []} />

                <News />

                <AllTimeFavorites animeList={favouritesAnimeList ?? []} />
            </div>
        </main>
    );
};

export default HomePage;
