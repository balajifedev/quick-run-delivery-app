
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Package, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  const navItems = [
    { path: "/", icon: <Home size={24} />, label: "Home" },
    { path: "/search", icon: <Search size={24} />, label: "Search" },
    { path: "/order/active", icon: <Package size={24} />, label: "Orders" },
    { path: "/profile", icon: <User size={24} />, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-16 bg-white border-t border-gray-200 flex justify-around items-center z-10 px-2">
      {navItems.map((item) => {
        const isActive = 
          (item.path === "/" && location.pathname === "/") || 
          (item.path !== "/" && location.pathname.startsWith(item.path));
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full ${
              isActive ? "text-brand-teal" : "text-gray-500"
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
            {item.label === "Orders" && cartItemCount > 0 && (
              <div className="absolute top-2 ml-4 bg-brand-purple text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {cartItemCount}
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
