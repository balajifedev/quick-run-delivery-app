
import React from "react";
import { ArrowRight } from "lucide-react";

interface PromoBannerProps {
  title: string;
  description: string;
  image: string;
  action?: string;
  onClick?: () => void;
}

const PromoBanner: React.FC<PromoBannerProps> = ({
  title,
  description,
  image,
  action = "Order Now",
  onClick,
}) => {
  return (
    <div 
      className="rounded-xl overflow-hidden relative h-40"
      style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/80 to-brand-teal/50 p-4 flex flex-col justify-center">
        <h3 className="text-white font-bold text-lg">{title}</h3>
        <p className="text-white/90 text-sm mt-1">{description}</p>
        
        <button 
          onClick={onClick}
          className="mt-3 bg-white text-brand-purple py-2 px-4 rounded-full flex items-center max-w-fit"
        >
          <span className="text-sm font-medium">{action}</span>
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;
