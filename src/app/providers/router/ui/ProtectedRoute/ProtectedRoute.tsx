import { useAuth } from "app/providers/auth/AuthProvider.tsx";
// !!! Нарушение FSD !!!
// Нельзя таким образом тянуть стили из pages в app. Компоненты из app (роутинг, провайдеры) могут брать стили из app/ui/ или shared/ui/
// NOTE: чаще всего используют styles для импорта модульных стилей: import styles from "./NameOfComponent.module.scss";
import cls from "pages/HomePage/ui/HomePage.module.scss";
import { Loader } from "shared/ui/Loader";
import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className={cls.loader}>
        <Loader />
      </div>
    );
  if (!user) return <Navigate to="/login" replace />;

  return children;
};
