
import React, { createContext, useState, useContext } from 'react';

type Category = {
  id: string;
  name: string;
  icon: string;
};

interface CategoryContextType {
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  categories: Category[];
}

const categories: Category[] = [
  { id: "all", name: "All", icon: "layers" },
  { id: "grocery", name: "Grocery", icon: "shopping-basket" },
  { id: "food", name: "Food", icon: "utensils" },
  { id: "pharmacy", name: "Pharmacy", icon: "pill" },
  { id: "pets", name: "Pets", icon: "dog" },
  { id: "gifts", name: "Gifts", icon: "gift" },
];

const CategoryContext = createContext<CategoryContextType>({
  activeCategory: "all",
  setActiveCategory: () => {},
  categories: [],
});

export const CategoryProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  return (
    <CategoryContext.Provider value={{ activeCategory, setActiveCategory, categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
