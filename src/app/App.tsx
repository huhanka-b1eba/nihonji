import { Suspense } from "react";

import { classNames } from "shared/lib/classNames/classNames.ts";
import { useTheme } from "app/providers/theme";
import { Loader } from "shared/ui/Loader";
import { Header } from "widgets/Header";
import { Footer } from "widgets/Footer";

import AppRouter from "./providers/router/ui/AppRouter/AppRouter.tsx";
import "./styles/index.scss";

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback={<Loader />}>
        <Header />
        <AppRouter />
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
