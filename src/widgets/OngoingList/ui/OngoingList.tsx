import cls from "./OngoingList.module.scss";
import {AnimeCard} from "../../../entities/anime";

export const OngoingList = ({ items }) => {

    return (
        <div className={cls.wrapper}>

            <div className={cls.grid}>
                {items.map(item => (
                    <AnimeCard key={item.id} anime={item} />
                ))}
            </div>
        </div>
    );
};
