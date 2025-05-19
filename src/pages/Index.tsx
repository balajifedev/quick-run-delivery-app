import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import SearchBar from "@/components/home/SearchBar";
import CategoryList from "@/components/home/CategoryList";
import StoreCard from "@/components/home/StoreCard";
import PromoBanner from "@/components/home/PromoBanner";
import { useCategory } from "@/contexts/CategoryContext";
import { getStoresByCategory, getFeaturedStores, searchStores } from "@/services/mockData";
import { Store } from "@/types";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { activeCategory } = useCategory();
  const [stores, setStores] = useState<Store[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [featuredStores, setFeaturedStores] = useState<Store[]>([]);

  useEffect(() => {
    // If we have a search term, show search results
    if (searchTerm) {
      setStores(searchStores(searchTerm));
    } else {
      // Otherwise filter by category
      setStores(getStoresByCategory(activeCategory));
    }
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    // Get featured stores for promotions
    setFeaturedStores(getFeaturedStores());
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="pb-4">
      {/* Header */}
      <header className="bg-brand-teal pt-8 pb-4 px-4 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-white font-bold text-xl">QuickRun</h1>
            <div className="flex items-center mt-1 text-white/90">
              <MapPin size={14} className="mr-1" />
              <span className="text-xs">123 Main St, New York</span>
            </div>
          </div>
        </div>
        <SearchBar onSearch={handleSearch} />
      </header>

      {/* Categories */}
      <CategoryList />

      {/* Featured Banner */}
      {featuredStores.length > 0 && !searchTerm && (
        <div className="px-4 mt-2 mb-6">
          <PromoBanner
            title="Fast Grocery Delivery"
            description="Get your groceries delivered in 30 minutes or less"
            image="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1374&auto=format&fit=crop"
            onClick={() => navigate("/store/store1")}
          />
        </div>
      )}

      {/* Store List */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-lg">
            {searchTerm ? "Search Results" : "Nearby Stores"}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
        
        {/* Empty state */}
        {stores.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No stores found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
