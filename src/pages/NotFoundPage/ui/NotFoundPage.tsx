import { Link } from "react-router-dom";
import cls from "./NotFoundPage.module.scss";

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
    return (
        <div className={cls.NotFoundPage}>
            <div className={cls.content}>
                <div className={cls.code}>404</div>

                <h1 className={cls.title}>Page not found</h1>
                <p className={cls.subtitle}>
                    The page you’re looking for doesn’t exist or has been moved.
                </p>

                <Link to="/" className={cls.homeBtn}>
                    Go back home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
