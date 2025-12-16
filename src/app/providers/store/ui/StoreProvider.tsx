import { Provider } from "react-redux";
import { setupStore } from "../config/store.ts";

const store = setupStore();

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => (
  <Provider store={store}>{children}</Provider>
);

export default StoreProvider;
