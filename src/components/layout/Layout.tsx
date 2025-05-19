
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";

const Layout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isDriverPage = location.pathname.startsWith('/driver');

  return (
    <main className="min-h-screen max-w-md mx-auto bg-gray-50">
      <div className="pb-16">
        <Outlet />
      </div>
      <BottomNavigation />
    </main>
  );
};

export default Layout;
