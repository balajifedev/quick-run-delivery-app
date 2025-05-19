
import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Store, 
  Package, 
  Settings, 
  ChartBar, 
  LogOut
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const MerchantLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/merchant/login");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Merchant Portal</h2>
            <p className="text-sm text-muted-foreground">Fresh Basket Grocery</p>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            <Link to="/merchant/dashboard">
              <Button
                variant={location.pathname === "/merchant/dashboard" ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <ChartBar className="mr-2" />
                Dashboard
              </Button>
            </Link>
            
            <Link to="/merchant/products">
              <Button
                variant={location.pathname === "/merchant/products" ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Store className="mr-2" />
                Products
              </Button>
            </Link>
            
            <Link to="/merchant/orders">
              <Button
                variant={location.pathname === "/merchant/orders" ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Package className="mr-2" />
                Orders
              </Button>
            </Link>
            
            <Link to="/merchant/settings">
              <Button
                variant={location.pathname === "/merchant/settings" ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Settings className="mr-2" />
                Settings
              </Button>
            </Link>
          </nav>
          
          <div className="p-4 border-t mt-auto">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 md:hidden z-10">
        <Link to="/merchant/dashboard">
          <Button variant="ghost" size="icon">
            <ChartBar />
          </Button>
        </Link>
        <Link to="/merchant/products">
          <Button variant="ghost" size="icon">
            <Store />
          </Button>
        </Link>
        <Link to="/merchant/orders">
          <Button variant="ghost" size="icon">
            <Package />
          </Button>
        </Link>
        <Link to="/merchant/settings">
          <Button variant="ghost" size="icon">
            <Settings />
          </Button>
        </Link>
      </div>
      
      {/* Main Content */}
      <main className="flex-1 p-6 pb-20 md:pb-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MerchantLayout;
