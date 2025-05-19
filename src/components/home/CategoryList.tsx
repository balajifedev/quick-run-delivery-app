
import React from "react";
import { useCategory } from "@/contexts/CategoryContext";
import { LucideProps } from "lucide-react";
import { 
  Layers, 
  ShoppingBasket, 
  Utensils, 
  Pill,
  Dog,
  Gift 
} from "lucide-react";

const iconMap: Record<string, React.FC<LucideProps>> = {
  layers: Layers,
  "shopping-basket": ShoppingBasket,
  utensils: Utensils,
  pill: Pill,
  dog: Dog,
  gift: Gift
};

const CategoryList: React.FC = () => {
  const { categories, activeCategory, setActiveCategory } = useCategory();

  return (
    <div className="w-full overflow-x-auto py-4 no-scrollbar">
      <div className="flex space-x-4 px-4">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          const Icon = iconMap[category.icon];
          
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex flex-col items-center justify-center min-w-20 p-3 rounded-lg transition-all ${
                isActive 
                  ? "bg-brand-teal text-white" 
                  : "bg-white text-gray-600 border border-gray-100"
              }`}
            >
              <div className={`rounded-full p-2 ${
                isActive ? "bg-white/20" : "bg-gray-50"
              }`}>
                <Icon size={20} />
              </div>
              <span className="text-xs mt-2">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
