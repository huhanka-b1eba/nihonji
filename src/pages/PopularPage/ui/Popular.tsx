import cls from './Popular.module.scss';
import {classNames} from "../../../shared/lib/classNames/classNames.ts";
import {ListHeader} from "../../../shared/ui/ListHeader";
import {OngoingList} from "../../../widgets/OngoingList";

interface PopularProps {
    className?: string;
}

export interface PopularAnime {
    id: string;
    title: string;
    image: string;
    episodesReleased: number;
    dayOfWeek: string;
    rating: number;
}


export const popularMock: PopularAnime[] = [
    {
        id: "1",
        title: "Solo Leveling: Season 2",
        image: "https://cdn.myanimelist.net/images/anime/1700/144702.jpg",
        episodesReleased: 7,
        dayOfWeek: "Пятница",
        rating: 8.9,
    },
    {
        id: "2",
        title: "Bleach: Thousand-Year Blood War Part 3",
        image: "https://cdn.myanimelist.net/images/anime/1763/140021.jpg",
        episodesReleased: 4,
        dayOfWeek: "Воскресенье",
        rating: 9.1,
    },
    {
        id: "3",
        title: "Blue Lock Season 2",
        image: "https://cdn.myanimelist.net/images/anime/1384/144532.jpg",
        episodesReleased: 10,
        dayOfWeek: "Суббота",
        rating: 8.2,
    },
    {
        id: "4",
        title: "Mushoku Tensei II Part 2",
        image: "https://cdn.myanimelist.net/images/anime/1993/143627.jpg",
        episodesReleased: 6,
        dayOfWeek: "Понедельник",
        rating: 8.5,
    },
    {
        id: "4",
        title: "Mushoku Tensei II Part 2",
        image: "https://cdn.myanimelist.net/images/anime/1993/143627.jpg",
        episodesReleased: 6,
        dayOfWeek: "Понедельник",
        rating: 8.5,
    },
    {
        id: "4",
        title: "Mushoku Tensei II Part 2",
        image: "https://cdn.myanimelist.net/images/anime/1993/143627.jpg",
        episodesReleased: 6,
        dayOfWeek: "Понедельник",
        rating: 8.5,
    },
    {
        id: "4",
        title: "Mushoku Tensei II Part 2",
        image: "https://cdn.myanimelist.net/images/anime/1993/143627.jpg",
        episodesReleased: 6,
        dayOfWeek: "Понедельник",
        rating: 8.5,
    }
];


export const Popular = ({className}: PopularProps) => {
    return (
        <div className={classNames(cls.Popular, {}, [className])}>
            <div className="container">
                <ListHeader title="Популярное" sortName="Сначала популярное"/>
                <OngoingList items={popularMock}/>
            </div>
        </div>
    );
};

