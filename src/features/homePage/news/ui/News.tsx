import cls from './News.module.scss';
import {classNames} from "../../../../shared/lib/classNames/classNames.ts";


interface NewsProps {
    className?: string;
}

export interface News {
    title: string;
    date: string;   // ISO-строка или читабельная (пример: "2025-12-01")
    author: string;
    img: string;    // URL к изображению / локальный путь / placeholder
}

export const mockNews: News[] = [
    {
        title: "Анонсирован новый эпизод арки Hashira Training — Ufotable раскрыла детали",
        date: "2025-11-28",
        author: "Ая Танака",
        img: "https://a.storyblok.com/f/178900/1920x1080/3290dd3757/demon-slayer-kimetsu-no-yaiba-hashira-training-arc-episode-1.jpg/m/1200x0/filters:quality(95)format(webp)"
    },
    {
        title: "Режиссёр фильма «Yuri on Ice: Ice Adolescence» рассказал о замороженном продакшене",
        date: "2025-11-20",
        author: "Хироки Сакамото",
        img: "https://a.storyblok.com/f/178900/1263x711/7e56733d55/yuri-on-ice-the-movie-ice-adolescense.png/m/1200x0/filters:quality(95)format(webp)"
    },
    {
        title: "Почему OST в «Solo Leveling» получил признание критиков: разбор треков",
        date: "2025-10-30",
        author: "Nihonji Editorial",
        img: "https://a.storyblok.com/f/178900/1920x1080/636906bab5/solo-leveling.jpg/m/1200x0/filters:quality(95)format(webp)"
    },
    {
        title: "KonoSuba 3: что ждать от нового сезона — первые впечатления критиков",
        date: "2025-09-15",
        author: "София Ибрагимова",
        img: "https://a.storyblok.com/f/178900/1920x1080/3fbb4c4a33/konosuba-season-3.jpg/m/1200x0/filters:quality(95)format(webp)"
    },
    {
        title: "Frieren: новая реставрация открывающей сцены поразила фанатов",
        date: "2025-08-02",
        author: "Ильдар Фаритов",
        img: "https://a.storyblok.com/f/178900/900x506/9455bf4dcc/frieren-avatar-header.jpeg/m/576x0/filters:quality(95)format(webp)"
    },
    {
        title: "Доктор Элиза стала главным персонажем года — результаты опроса",
        date: "2025-07-23",
        author: "Команда Nihonji",
        img: "https://a.storyblok.com/f/178900/960x540/e94502e17d/doctor-elise.jpg/m/filters:quality(95)format(webp)"
    },
    {
        title: "Spy x Family: 12 коротких эпизодов, которые можно пересмотреть за вечер",
        date: "2025-06-11",
        author: "Екатерина Ли",
        img: "https://a.storyblok.com/f/178900/960x540/4890a8d51a/spy-x-family.jpg/m/filters:quality(95)format(webp)"
    },
    {
        title: "Returner’s Magic: как веб-роман получил аниме-адаптацию — интервью со студией",
        date: "2025-05-04",
        author: "Роман Петухов",
        img: "https://a.storyblok.com/f/178900/960x540/7c174fb994/returner-s-magic.jpg/m/filters:quality(95)format(webp)"
    },
    {
        title: "Demon Slayer: новый визуал Hashira Training демонстрирует тон глобальной арки",
        date: "2025-05-04",
        author: "Мидори Хасэгава",
        img: "https://a.storyblok.com/f/178900/1920x1080/87bf242f6f/demon-slayer-kimetsu-no-yaiba-hashira-training-arc-kv-wide.jpg/m/1200x0/filters:quality(95)format(webp)"
    },
    {
        title: "Re:Zero — что известно о третьем сезоне: первые кадры и комментарии авторов",
        date: "2025-05-04",
        author: "Кадзуки Мураяма",
        img: "https://a.storyblok.com/f/178900/1200x675/af316505c1/re-zero-starting-life-in-another-world-staffel-3-titelbild.jpg/m/1200x0/filters:quality(95)format(webp)"
    }
];


export const News = ({className}: NewsProps) => {
    return (
        <div className={classNames(cls.News, {}, [className])}>
            <div className="container">

                <div className={cls.bg}></div>

                <div className={cls.headerRow}>
                    <h2>Новости Nihonji</h2>
                    <div className={cls.viewAll}>Смотреть все →</div>
                </div>

                <div className={cls.newsGrid}>

                    <div className={cls.bigNewsWrapper}>
                        {mockNews.slice(0, 2).map((item) => (
                            <div className={cls.bigItem} key={item.title}>
                                <img src={item.img} alt={item.title}/>
                                <div className={cls.content}>
                                    <div className={cls.title}>{item.title}</div>
                                    <div className={cls.date}>{item.date}</div>
                                    <div className={cls.author}>{item.author}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={cls.smallColumn}>
                        {mockNews.slice(2, 6).map((item) => (
                            <div className={cls.smallItem} key={item.title}>
                                <img src={item.img} alt={item.title}/>
                                <div className={cls.content}>
                                    <div className={cls.title}>{item.title}</div>
                                    <div className={cls.date}>{item.date}</div>
                                    <div className={cls.author}>{item.author}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={cls.smallColumn}>
                        {mockNews.slice(6, 10).map((item) => (
                            <div className={cls.smallItem} key={item.title}>
                                <img src={item.img} alt={item.title}/>
                                <div className={cls.content}>
                                    <div className={cls.title}>{item.title}</div>
                                    <div className={cls.date}>{item.date}</div>
                                    <div className={cls.author}>{item.author}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>

    );
};

