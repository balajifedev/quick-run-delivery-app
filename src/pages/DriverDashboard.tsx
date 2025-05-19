
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, 
  Package, 
  Clock, 
  CheckCircle2,
  Bike,
  User,
  ArrowLeft,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { driverData, getAvailableOrders, activeOrder } from "@/services/mockData";
import { toast } from "@/hooks/use-toast";
import { Driver, Order } from "@/types";

const DriverDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [driver, setDriver] = useState<Driver>(driverData);
  const [isOnline, setIsOnline] = useState(driver.status !== 'offline');
  const availableOrders = getAvailableOrders();
  
  const handleToggleStatus = () => {
    const newStatus = isOnline ? 'offline' : 'online';
    setIsOnline(!isOnline);
    setDriver({ ...driver, status: newStatus as 'offline' | 'online' | 'busy' });
    
    toast({
      title: `You are now ${newStatus}`,
      description: isOnline ? "You won't receive new delivery requests" : "You can now receive new delivery requests"
    });
  };
  
  const handleAcceptOrder = (order: Order) => {
    setDriver({ ...driver, activeOrderId: order.id, status: 'busy' });
    navigate(`/driver/order/${order.id}`);
    
    toast({
      title: "Order Accepted",
      description: `You have accepted the order from ${order.storeName}`
    });
  };
  
  const handleCompleteOrder = () => {
    setDriver({ ...driver, activeOrderId: undefined, status: 'online', totalDeliveries: driver.totalDeliveries + 1 });
    
    toast({
      title: "Order Delivered",
      description: "Great job! Order has been successfully delivered."
    });
  };
  
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-brand-teal p-4 text-white">
        <div className="flex items-center gap-4 mb-2">
          <button className="bg-white/20 p-2 rounded-full" onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Driver Dashboard</h1>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-white/20">
              <img 
                src={driver.image} 
                alt={driver.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{driver.name}</p>
              <div className="flex items-center text-sm opacity-90">
                <Bike size={14} className="mr-1" />
                <span>{driver.vehicle} • {driver.vehicleNumber}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="mr-2 text-sm">{isOnline ? 'Online' : 'Offline'}</span>
            <Switch 
              checked={isOnline} 
              onCheckedChange={handleToggleStatus}
            />
          </div>
        </div>
      </div>
      
      {/* Status Summary */}
      <div className="p-4 bg-white shadow-sm">
        <div className="grid grid-cols-3 gap-4 mb-2">
          <div className="text-center">
            <p className="text-xl font-bold">{driver.rating}</p>
            <p className="text-xs text-gray-500">Rating</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{driver.totalDeliveries}</p>
            <p className="text-xs text-gray-500">Deliveries</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{driver.status === 'busy' ? 1 : 0}</p>
            <p className="text-xs text-gray-500">Active Orders</p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <Tabs defaultValue="current" className="w-full px-4 mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current">Current Order</TabsTrigger>
          <TabsTrigger value="available">Available Orders</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="mt-4">
          {driver.activeOrderId ? (
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Order #{activeOrder.id.slice(-4)}</h3>
                <Badge variant="outline" className="bg-brand-teal/10 text-brand-teal border-brand-teal/20">
                  In Progress
                </Badge>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <img 
                    src={activeOrder.storeImage} 
                    alt={activeOrder.storeName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{activeOrder.storeName}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    <span>Pickup by {new Date(activeOrder.estimatedDelivery).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute:'2-digit'
                    })}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 mb-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <MapPin size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pickup</p>
                    <p className="text-sm font-medium">{activeOrder.storeName}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand-purple/10 p-1 rounded-full mr-3 mt-1">
                    <MapPin size={16} className="text-brand-purple" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Delivery</p>
                    <p className="text-sm font-medium">{activeOrder.deliveryAddress}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Order Items:</h4>
                <ul className="text-sm space-y-1">
                  {activeOrder.items.map(item => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.quantity}x {item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between mt-2 font-medium border-t pt-2">
                  <span>Total</span>
                  <span>${activeOrder.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button className="flex-1" variant="outline" onClick={() => navigate(`/order/${activeOrder.id}`)}>
                  View Details
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleCompleteOrder}>
                  <CheckCircle2 className="mr-2 h-4 w-4" /> Mark Delivered
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <Package className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              <h3 className="font-medium text-gray-700 mb-2">No Active Orders</h3>
              <p className="text-sm text-gray-500 mb-4">
                You don't have any active deliveries at the moment
              </p>
              <Button variant="outline" className="mx-auto" onClick={() => document.getElementById('available-tab')?.click()}>
                <RefreshCw className="mr-2 h-4 w-4" /> Find Orders
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="available" className="mt-4 space-y-4" id="available-tab">
          {isOnline ? (
            availableOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Order #{order.id.slice(-4)}</h3>
                  <Badge variant="secondary" className="bg-gray-100">
                    ${order.total.toFixed(2)}
                  </Badge>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img 
                      src={order.storeImage} 
                      alt={order.storeName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{order.storeName}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      <span>{new Date(order.estimatedDelivery).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute:'2-digit'
                      })}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-start">
                    <div className="bg-brand-purple/10 p-1 rounded-full mr-3 mt-1">
                      <MapPin size={16} className="text-brand-purple" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Delivery to</p>
                      <p className="text-sm font-medium">{order.deliveryAddress}</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-brand-teal hover:bg-brand-teal/90"
                  onClick={() => handleAcceptOrder(order)}
                >
                  Accept Order
                </Button>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <User className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              <h3 className="font-medium text-gray-700 mb-2">You're Offline</h3>
              <p className="text-sm text-gray-500 mb-4">
                Go online to see available orders
              </p>
              <Button onClick={handleToggleStatus}>
                Go Online
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DriverDashboard;
