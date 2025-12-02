import {Route, Routes} from "react-router";
import {routeConfig} from "../../../../shared/config/routeConfig/routeConfig.tsx";
import {Suspense} from "react";
import {Loader} from "../../../../shared/ui/Loader";


const AppRouter = () => (
    <Routes>
        {Object.values(routeConfig).map(({element, path}) => (
            <Route
                key={path}
                path={path}
                element={
                    <Suspense fallback={<Loader />}>
                        {element}
                    </Suspense>
                }
            />
        ))}
    </Routes>
)

export default AppRouter;