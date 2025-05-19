
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft,
  MapPin, 
  Phone,
  MessageSquare,
  CheckCircle2,
  Package,
  Bike
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { activeOrder } from "@/services/mockData";
import { toast } from "@/hooks/use-toast";

const orderSteps = [
  { id: "accept", label: "Order Accepted", icon: Package, completed: true },
  { id: "pickup", label: "Arrived at Store", icon: MapPin, completed: false },
  { id: "collected", label: "Order Picked Up", icon: Bike, completed: false },
  { id: "delivered", label: "Order Delivered", icon: CheckCircle2, completed: false }
];

const DriverOrderView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  const [steps, setSteps] = useState(orderSteps);
  
  useEffect(() => {
    // Update steps based on currentStep
    setSteps(steps.map((step, index) => ({
      ...step,
      completed: index <= currentStep
    })));
  }, [currentStep]);
  
  const handleNextStep = () => {
    const nextStep = currentStep + 1;
    
    if (nextStep === steps.length) {
      // Order completed
      toast({
        title: "Order Delivered!",
        description: "Order has been successfully delivered."
      });
      navigate("/driver");
      return;
    }
    
    setCurrentStep(nextStep);
    
    if (nextStep === 1) {
      toast({
        title: "Arrived at Store",
        description: `You've arrived at ${activeOrder.storeName}`
      });
    } else if (nextStep === 2) {
      toast({
        title: "Order Picked Up",
        description: "You've picked up the order and started delivery"
      });
    } else if (nextStep === 3) {
      toast({
        title: "Order Delivered",
        description: "You've successfully delivered the order"
      });
      
      // Wait a moment before returning to dashboard
      setTimeout(() => {
        navigate("/driver");
      }, 2000);
    }
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-brand-teal p-4 text-white">
        <button 
          className="bg-white/20 backdrop-blur-sm p-2 rounded-full"
          onClick={() => navigate("/driver")}
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="text-center mt-2 mb-3">
          <h1 className="text-xl font-bold">Order #{activeOrder.id.replace("order", "")}</h1>
          <p className="text-sm opacity-90">Delivery in Progress</p>
        </div>
      </div>
      
      {/* Order Progress */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold text-lg mb-4">Order Status</h2>
          
          {/* Progress Stepper */}
          <div className="flex flex-col mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentStep;
              
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
                  </div>
                </div>
              );
            })}
          </div>
          
          {currentStep < steps.length - 1 ? (
            <Button 
              onClick={handleNextStep}
              className="w-full"
            >
              {currentStep === 0 && "Arrived at Store"}
              {currentStep === 1 && "Picked Up Order"}
              {currentStep === 2 && "Delivered Order"}
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/driver")}
              className="w-full"
              variant="outline"
            >
              Back to Dashboard
            </Button>
          )}
        </div>
      </div>
      
      {/* Order Details */}
      <div className="px-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold text-lg mb-3">Order Details</h2>
          
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
            </div>
          </div>
          
          <div className="border-t border-b border-gray-100 py-3 mb-3">
            {activeOrder.items.map((item) => (
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
            <p>${activeOrder.total.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      {/* Customer and Location */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold text-lg mb-3">Delivery Location</h2>
          <p className="text-gray-700 mb-3">{activeOrder.deliveryAddress}</p>
          
          <Button className="w-full mb-3" variant="outline">
            Open in Maps
          </Button>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <Phone size={18} className="mr-2" /> Call
            </Button>
            <Button variant="outline" className="flex-1">
              <MessageSquare size={18} className="mr-2" /> Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverOrderView;
