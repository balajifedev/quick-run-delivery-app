export interface Store {
  id: string;
  name: string;
  type: string;
  image: string;
  rating: number;
  deliveryTime: number;
  deliveryFee: number;
  featured?: boolean;
  category: string;
  products: Product[];
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
}

export interface Order {
  id: string;
  storeId: string;
  storeName: string;
  storeImage: string;
  status: 'preparing' | 'picked' | 'on-the-way' | 'delivered' | 'cancelled';
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  deliveryAddress: string;
  createdAt: string;
  estimatedDelivery: string;
  trackingInfo?: {
    currentLocation: {
      lat: number;
      lng: number;
    };
    deliveryExecutive?: {
      name: string;
      phone: string;
      image: string;
    };
  };
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  vehicleNumber: string;
  image: string;
  status: 'offline' | 'online' | 'busy';
  currentLocation: {
    lat: number;
    lng: number;
  };
  rating: number;
  totalDeliveries: number;
  activeOrderId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: {
    id: string;
    type: 'home' | 'work' | 'other';
    address: string;
    landmark?: string;
    isDefault: boolean;
  }[];
  paymentMethods: {
    id: string;
    type: 'card' | 'upi' | 'wallet';
    name: string;
    details: string;
    isDefault: boolean;
  }[];
  orders: string[];
}
