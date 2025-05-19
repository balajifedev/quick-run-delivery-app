
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import StoreDetails from "./pages/StoreDetails";
import OrderTracking from "./pages/OrderTracking";
import UserProfile from "./pages/UserProfile";
import DriverDashboard from "./pages/DriverDashboard";
import DriverOrderView from "./pages/DriverOrderView";
import { CategoryProvider } from "./contexts/CategoryContext";
import { CartProvider } from "./contexts/CartContext";

// Merchant pages
import MerchantLogin from "./pages/MerchantLogin";
import MerchantLayout from "./components/merchant/MerchantLayout";
import MerchantDashboard from "./pages/merchant/MerchantDashboard";
import MerchantProducts from "./pages/merchant/MerchantProducts";
import MerchantOrders from "./pages/merchant/MerchantOrders";
import MerchantSettings from "./pages/merchant/MerchantSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CategoryProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="store/:id" element={<StoreDetails />} />
                <Route path="order/:id" element={<OrderTracking />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="driver" element={<DriverDashboard />} />
                <Route path="driver/order/:id" element={<DriverOrderView />} />
              </Route>
              
              {/* Merchant Routes */}
              <Route path="/merchant/login" element={<MerchantLogin />} />
              <Route path="/merchant" element={<MerchantLayout />}>
                <Route path="dashboard" element={<MerchantDashboard />} />
                <Route path="products" element={<MerchantProducts />} />
                <Route path="orders" element={<MerchantOrders />} />
                <Route path="settings" element={<MerchantSettings />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </CategoryProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
