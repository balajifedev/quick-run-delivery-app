
import React from "react";
import { Link } from "react-router-dom";
import { Star, Clock } from "lucide-react";
import { Store } from "@/types";

interface StoreCardProps {
  store: Store;
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  return (
    <Link to={`/store/${store.id}`}>
      <div className="rounded-xl overflow-hidden bg-white border border-gray-100 hover:shadow-md transition-all">
        <div className="h-36 w-full relative">
          <img 
            src={store.image} 
            alt={store.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded-md text-xs font-medium">
            <div className="flex items-center">
              <Clock size={12} className="mr-1 text-brand-teal" /> 
              {store.deliveryTime} min
            </div>
          </div>
        </div>
        <div className="p-3">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900 truncate">{store.name}</h3>
            <div className="flex items-center bg-green-50 px-1.5 py-0.5 rounded">
              <Star size={12} className="text-green-600 fill-green-600" />
              <span className="ml-1 text-xs font-medium text-green-700">{store.rating}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1 truncate">{store.type}</p>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;
