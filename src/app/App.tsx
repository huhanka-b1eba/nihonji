import AppRouter from "./providers/router/ui/AppRouter.tsx";
import {Suspense} from "react";
import {Loader} from "../shared/ui/Loader";
import {Header} from "../widgets/Header";
import './styles/index.scss';
import {Footer} from "../widgets/Footer";


function App() {

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header />
        <AppRouter />
        <Footer />
      </Suspense>
    </>
  )
}

export default App
