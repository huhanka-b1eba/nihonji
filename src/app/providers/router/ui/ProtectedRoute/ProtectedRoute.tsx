import { useAuth } from "app/providers/auth/AuthProvider.tsx";
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
  return <>{children}</>;
};
