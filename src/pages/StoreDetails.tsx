
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Info,
  Plus,
  Minus,
  ShoppingBag
} from "lucide-react";
import { getStoreById } from "@/services/mockData";
import { Store, Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const StoreDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const { 
    items, 
    addItem, 
    removeItem, 
    updateQuantity, 
    getTotalItems, 
    getTotalPrice,
    getItemsForStore
  } = useCart();

  useEffect(() => {
    if (id) {
      const storeData = getStoreById(id);
      if (storeData) {
        setStore(storeData);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-slow">Loading...</div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-xl">Store not found</p>
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

  const cartItemsInStore = getItemsForStore(store.id);
  const totalItemsInStore = cartItemsInStore.reduce((sum, item) => sum + item.quantity, 0);
  const totalPriceInStore = cartItemsInStore.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getItemQuantity = (productId: string) => {
    const item = items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      storeId: product.storeId,
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast.success(`Added ${product.name} to cart`);
  };

  const handleRemoveFromCart = (productId: string) => {
    removeItem(productId);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleCheckout = () => {
    navigate(`/order/active`);
  };

  return (
    <div className="pb-20">
      {/* Store Header */}
      <div 
        className="h-48 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${store.image})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        
        <button 
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm p-2 rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="text-white" size={20} />
        </button>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h1 className="text-2xl font-bold">{store.name}</h1>
          <p className="text-sm text-white/80 mt-1">{store.type}</p>
          
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center">
              <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-sm">{store.rating}</span>
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span className="text-sm">{store.deliveryTime} min</span>
            </div>
            <Badge variant="outline" className="border-white/30 text-white">
              {store.deliveryFee === 0 ? "Free Delivery" : `$${store.deliveryFee} Delivery`}
            </Badge>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="p-4">
        <h2 className="font-bold text-lg mb-4">Menu</h2>
        
        <div className="space-y-4">
          {store.products.map((product) => {
            const quantity = getItemQuantity(product.id);
            
            return (
              <div 
                key={product.id} 
                className="flex border border-gray-100 rounded-xl overflow-hidden bg-white"
              >
                <div className="w-24 h-24">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 p-3 flex flex-col">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="font-medium">${product.price.toFixed(2)}</p>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-1 flex-1">
                    {product.description}
                  </p>
                  
                  <div className="mt-2 flex justify-end">
                    {quantity === 0 ? (
                      <Button 
                        size="sm" 
                        className="h-8"
                        onClick={() => handleAddToCart(product)}
                      >
                        <Plus size={16} className="mr-1" /> Add
                      </Button>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleUpdateQuantity(product.id, quantity - 1)}
                        >
                          <Minus size={14} />
                        </Button>
                        
                        <span className="text-sm font-medium w-4 text-center">
                          {quantity}
                        </span>
                        
                        <Button
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleUpdateQuantity(product.id, quantity + 1)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Summary - Fixed at bottom */}
      {totalItemsInStore > 0 && (
        <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto p-4">
          <Button 
            className="w-full py-6"
            onClick={handleCheckout}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center">
                <ShoppingBag size={18} className="mr-2" />
                <span>{totalItemsInStore} {totalItemsInStore === 1 ? 'item' : 'items'}</span>
              </div>
              <span>${totalPriceInStore.toFixed(2)}</span>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default StoreDetails;
