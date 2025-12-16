import { createRoot } from "react-dom/client";
import "./app/styles/index.scss";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "app/providers/auth/AuthProvider.tsx";
import { ThemeProvider } from "app/providers/theme";
import StoreProvider from "./app/providers/store/ui/StoreProvider.tsx";
import App from "./app/App.tsx";

import "shared/config/i18n/i18n.ts";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StoreProvider>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </StoreProvider>
  </BrowserRouter>
);
