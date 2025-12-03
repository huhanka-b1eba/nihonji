import {Intro} from "../../../features/intro";
import styles from "./HomePage.module.scss";
import {Popular} from "../../../features/popular";

const HomePage = () => {

    const animeList = [
        { id: 1, title: "Dandadan", rating: 8.6, img: "/anime/dandadan.jpg" },
        { id: 2, title: "Blue Lock S2", rating: 8.2, img: "/anime/bluelock.jpg" },
        { id: 3, title: "Kaiju No.8", rating: 8.4, img: "/anime/kaiju8.jpg" },
        { id: 4, title: "Solo Leveling S2", rating: 8.8, img: "/anime/sololeveling.jpg" }
    ];

    return (
        <main className={styles.homePage}>
            <Intro />

            <Popular animeList={animeList} />

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Предстоящий сезон</h2>

                <div className={styles.comingSoon}>
                    <p>Скоро здесь появятся горячие новинки следующего сезона!</p>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Популярны всегда</h2>

                <div className={styles.alwaysPopular}>
                    <p>Топ-тайтлы, которые всегда остаются фаворитами зрителей.</p>
                </div>
            </section>

        </main>
    )
}

export default HomePage;