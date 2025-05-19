
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  User as UserIcon,
  MapPin,
  CreditCard,
  LogOut,
  ChevronRight,
  Bell,
  HelpCircle,
  History,
  Settings,
  Edit
} from "lucide-react";
import { userData, pastOrders } from "@/services/mockData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";

const ProfileSection: React.FC<{
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  onClick?: () => void;
}> = ({ icon, title, children, onClick }) => (
  <div className="p-4 bg-white rounded-xl shadow-sm mb-4">
    <div className="flex items-center mb-2">
      <div className="text-brand-teal mr-3">{icon}</div>
      <h2 className="font-semibold text-lg">{title}</h2>
    </div>
    <div onClick={onClick} className={onClick ? "cursor-pointer" : ""}>
      {children}
    </div>
  </div>
);

const ProfileMenuItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
}> = ({ icon, title, subtitle, onClick }) => (
  <div className="flex items-center py-2" onClick={onClick}>
    <div className="text-gray-500 mr-3">{icon}</div>
    <div className="flex-1">
      <p className="font-medium">{title}</p>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
    <ChevronRight size={18} className="text-gray-400" />
  </div>
);

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  
  const handleLogout = () => {
    clearCart();
    navigate("/");
  };

  const initials = userData.name
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase();
    
  return (
    <div className="pb-10">
      {/* Header */}
      <div className="bg-brand-teal p-6 text-white">
        <div className="flex items-center">
          <Avatar className="h-16 w-16 border-2 border-white">
            <AvatarFallback className="bg-brand-purple text-white text-xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{userData.name}</h1>
            <p className="text-white/80">{userData.email}</p>
            <p className="text-white/80">{userData.phone}</p>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="ml-auto text-white"
          >
            <Edit size={18} />
          </Button>
        </div>
      </div>

      {/* User Sections */}
      <div className="p-4">
        {/* Past Orders */}
        <ProfileSection icon={<History size={20} />} title="Recent Orders">
          {pastOrders.length > 0 ? (
            <div className="space-y-3">
              {pastOrders.map((order) => (
                <div 
                  key={order.id}
                  className="flex items-center cursor-pointer"
                  onClick={() => navigate(`/order/${order.id}`)}
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden mr-3">
                    <img 
                      src={order.storeImage} 
                      alt={order.storeName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium">{order.storeName}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()} • ${order.total.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className={`
                    text-xs px-2 py-1 rounded
                    ${order.status === "delivered" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}
                  `}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>
              ))}
              
              <Button variant="ghost" className="w-full text-brand-teal mt-2">
                View All Orders
              </Button>
            </div>
          ) : (
            <p className="text-gray-500">No orders yet</p>
          )}
        </ProfileSection>

        {/* Addresses */}
        <ProfileSection icon={<MapPin size={20} />} title="My Addresses">
          {userData.addresses.map((address) => (
            <div key={address.id} className="mb-3 last:mb-0">
              <div className="flex justify-between">
                <p className="font-medium capitalize">{address.type}</p>
                {address.isDefault && (
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Default</span>
                )}
              </div>
              <p className="text-sm text-gray-600">{address.address}</p>
              {address.landmark && (
                <p className="text-xs text-gray-500">Landmark: {address.landmark}</p>
              )}
            </div>
          ))}
          
          <Button variant="outline" className="w-full mt-3">
            Add New Address
          </Button>
        </ProfileSection>

        {/* Payment Methods */}
        <ProfileSection icon={<CreditCard size={20} />} title="Payment Methods">
          {userData.paymentMethods.map((payment) => (
            <div key={payment.id} className="flex justify-between items-center mb-2 last:mb-0">
              <div>
                <p className="font-medium">{payment.name}</p>
                <p className="text-xs text-gray-500">{payment.details}</p>
              </div>
              {payment.isDefault && (
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Default</span>
              )}
            </div>
          ))}
          
          <Button variant="outline" className="w-full mt-3">
            Add Payment Method
          </Button>
        </ProfileSection>

        {/* Menu Items */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <ProfileMenuItem
            icon={<Bell size={20} />}
            title="Notifications"
            subtitle="Order updates and special offers"
          />
          <Separator className="my-2" />
          <ProfileMenuItem
            icon={<HelpCircle size={20} />}
            title="Help & Support"
            subtitle="Contact us, FAQ, terms of service"
          />
          <Separator className="my-2" />
          <ProfileMenuItem
            icon={<Settings size={20} />}
            title="Settings"
            subtitle="App preferences and account settings"
          />
          <Separator className="my-2" />
          <ProfileMenuItem
            icon={<LogOut size={20} />}
            title="Logout"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
