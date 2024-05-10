import React, { ReactElement, ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard, ErrorPage, Users } from "src/pages";

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = localStorage.getItem("user");

  if (!user) {
    return <Users />;
  }

  return <>{children}</>;
};

const Routers = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Routers;
