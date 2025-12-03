import {Link} from "react-router";
import styles from './Header.module.scss';
import {Moon} from "lucide-react";


const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.headerInner}>

                <div className={styles.left}>
                    <Link to="/" className={styles.logo}>Nihonji</Link>
                </div>

                <div className={styles.center}>
                    <input type="text" className={styles.search} placeholder="Поиск..." />
                </div>

                <div className={styles.right}>
                    <div className={styles.links}>
                        <Link to="/catalog" className={styles.navLink}>Каталог</Link>
                        <Link to="/ongoing" className={styles.navLink}>Онгоинги</Link>
                    </div>
                    <div className={styles.toggles}>
                        <button className={styles.toggleLang}>RU</button>
                        <button className={styles.toggleTheme}>
                            <Moon />
                        </button>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Header;