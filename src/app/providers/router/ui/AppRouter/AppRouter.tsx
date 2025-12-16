import { Routes, Route } from "react-router-dom";
import { routeConfig } from "shared/config/routeConfig/routeConfig.tsx";
import { Suspense } from "react";
import { Loader } from "shared/ui/Loader";
import ScrollToTop from "shared/ui/ScrollToTop/ScrollToTop.tsx";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

const AppRouter = () => (
  <>
    <ScrollToTop />
    <Suspense fallback={<Loader />}>
      <Routes>
        {Object.values(routeConfig).map(({ element, path, authOnly, routeKey }) => {
          const content = authOnly ? <ProtectedRoute>{element}</ProtectedRoute> : element;
          return <Route key={routeKey} path={path} element={content} />;
        })}
      </Routes>
    </Suspense>
  </>
);

export default AppRouter;
