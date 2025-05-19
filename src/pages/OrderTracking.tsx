import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Package,
  CheckCircle2,
  Bike,
  Home,
  Clock,
  Phone,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { activeOrder, pastOrders } from "@/services/mockData";
import { Order } from "@/types";

const OrderTrackingSteps = [
  { id: "preparing", label: "Preparing Order", icon: Package },
  { id: "picked", label: "Order Picked Up", icon: CheckCircle2 },
  { id: "on-the-way", label: "On The Way", icon: Bike },
  { id: "delivered", label: "Delivered", icon: Home }
];

const OrderTracking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  
  useEffect(() => {
    // For this demo, we'll just use the active order if id is 'active'
    // Otherwise, try to find it in past orders
    if (id === "active") {
      setOrder(activeOrder);
    } else {
      const foundOrder = pastOrders.find(o => o.id === id);
      setOrder(foundOrder || null);
    }
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-xl">Order not found</p>
        <Button 
          onClick={() => navigate("/")} 
          className="mt-4"
          variant="outline"
        >
          Back to Home
        </Button>
      </div>
    );
  }

  // Get step index for progress tracking
  const currentStepIndex = OrderTrackingSteps.findIndex(step => step.id === order.status);

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="bg-brand-teal p-4 text-white relative">
        <button 
          className="bg-white/20 backdrop-blur-sm p-2 rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="text-center mt-4 mb-6">
          <h1 className="text-xl font-bold">Order Tracking</h1>
          <p className="text-sm opacity-90">Order #{order.id.replace("order", "")}</p>
        </div>
      </div>

      {/* Order Status */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold text-lg mb-4">Order Status</h2>
          
          {/* Progress Stepper */}
          <div className="flex flex-col mb-4">
            {OrderTrackingSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentStepIndex;
              const isCompleted = index < currentStepIndex;
              
              return (
                <div key={step.id} className="flex items-start mb-4 last:mb-0">
                  {/* Icon circle */}
                  <div className={`
                    rounded-full w-8 h-8 flex items-center justify-center mr-3
                    ${isActive ? 'bg-brand-teal text-white' : 'bg-gray-100 text-gray-400'}
                  `}>
                    <Icon size={18} />
                  </div>
                  
                  {/* Step info */}
                  <div className="flex-1">
                    <p className={`font-medium ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                    
                    {/* Only show estimated time for current step */}
                    {step.id === order.status && (
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock size={12} className="mr-1" />
                        <span>Estimated time: 
                          {new Date(order.estimatedDelivery).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute:'2-digit'
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Completion status */}
                  {isCompleted && (
                    <div className="text-green-500">
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Delivery Agent Information (only for active deliveries) */}
        {order.status === "on-the-way" && order.trackingInfo?.deliveryExecutive && (
          <div className="bg-white rounded-xl p-4 shadow-sm mt-4">
            <h2 className="font-semibold text-lg mb-3">Delivery Partner</h2>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                <img 
                  src={order.trackingInfo.deliveryExecutive.image} 
                  alt="Delivery Partner" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <p className="font-medium">{order.trackingInfo.deliveryExecutive.name}</p>
                <p className="text-sm text-gray-500">Delivery Partner</p>
              </div>
              
              <div className="flex space-x-2">
                <Button size="icon" variant="outline" className="rounded-full h-10 w-10">
                  <MessageSquare size={16} />
                </Button>
                <Button size="icon" className="rounded-full h-10 w-10">
                  <Phone size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Order Details */}
        <div className="bg-white rounded-xl p-4 shadow-sm mt-4">
          <h2 className="font-semibold text-lg mb-3">Order Details</h2>
          
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
              <p className="text-sm text-gray-500">
                Ordered on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="border-t border-b border-gray-100 py-3 mb-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-2 last:mb-0">
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">{item.quantity}x</span>
                  <p>{item.name}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center font-medium">
            <p>Total</p>
            <p>${order.total.toFixed(2)}</p>
          </div>
        </div>
        
        {/* Delivery Address */}
        <div className="bg-white rounded-xl p-4 shadow-sm mt-4">
          <h2 className="font-semibold text-lg mb-3">Delivery Address</h2>
          <p className="text-gray-700">{order.deliveryAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
