import cls from './NewsCard.module.scss';
import {classNames} from "../../../shared/lib/classNames/classNames.ts";


interface NewsCardProps {
    className?: string;
}


export const NewsCard = ({className}: NewsCardProps) => {
    return (
        <div className={classNames(cls.NewsCard, {}, [className])}>

        </div>
    );
};

