import { Store, Order, User, Driver } from "@/types";

export const stores: Store[] = [
  {
    id: "store1",
    name: "Fresh Basket Grocery",
    type: "Grocery • Daily Essentials",
    image: "https://images.unsplash.com/photo-1573225342350-39908978a80c?q=80&w=2048&auto=format&fit=crop",
    rating: 4.8,
    deliveryTime: 20,
    deliveryFee: 2.5,
    featured: true,
    category: "grocery",
    products: [
      {
        id: "prod1",
        storeId: "store1",
        name: "Organic Bananas (1 bunch)",
        description: "Locally sourced organic bananas",
        price: 3.99,
        image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=1374&auto=format&fit=crop",
        category: "fruits"
      },
      {
        id: "prod2",
        storeId: "store1",
        name: "Whole Milk (1 gal)",
        description: "Farm fresh whole milk",
        price: 4.50,
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1374&auto=format&fit=crop",
        category: "dairy"
      },
      {
        id: "prod3",
        storeId: "store1",
        name: "Avocados (4 pack)",
        description: "Ripe and ready to eat",
        price: 6.99,
        image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=1375&auto=format&fit=crop",
        category: "fruits"
      },
      {
        id: "prod4",
        storeId: "store1",
        name: "Fresh Bread Loaf",
        description: "Baked fresh daily",
        price: 3.49,
        image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1374&auto=format&fit=crop",
        category: "bakery"
      }
    ]
  },
  {
    id: "store2",
    name: "Burger Station",
    type: "Fast Food • Burgers",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1365&auto=format&fit=crop",
    rating: 4.5,
    deliveryTime: 30,
    deliveryFee: 1.99,
    category: "food",
    products: [
      {
        id: "prod5",
        storeId: "store2",
        name: "Classic Cheeseburger",
        description: "Beef patty with cheese, lettuce, and special sauce",
        price: 8.99,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1398&auto=format&fit=crop"
      },
      {
        id: "prod6",
        storeId: "store2",
        name: "French Fries",
        description: "Crispy golden fries",
        price: 3.99,
        image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=1335&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "store3",
    name: "MediQuick Pharmacy",
    type: "Pharmacy • Healthcare",
    image: "https://images.unsplash.com/photo-1617881770125-6fb0d039ecad?q=80&w=1471&auto=format&fit=crop",
    rating: 4.7,
    deliveryTime: 25,
    deliveryFee: 0,
    category: "pharmacy",
    products: [
      {
        id: "prod7",
        storeId: "store3",
        name: "Pain Relief Tablets",
        description: "Fast acting pain relief, 24 tablets",
        price: 7.99,
        image: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=1374&auto=format&fit=crop"
      },
      {
        id: "prod8",
        storeId: "store3",
        name: "Digital Thermometer",
        description: "Quick and accurate readings",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1588600878108-578031aa6933?q=80&w=1376&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "store4",
    name: "Pawsome Pet Supplies",
    type: "Pet Shop • Supplies",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1364&auto=format&fit=crop",
    rating: 4.6,
    deliveryTime: 35,
    deliveryFee: 2.99,
    category: "pets",
    products: [
      {
        id: "prod9",
        storeId: "store4",
        name: "Premium Dog Food (5kg)",
        description: "Nutritionally complete dry food for adult dogs",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=1471&auto=format&fit=crop"
      },
      {
        id: "prod10",
        storeId: "store4",
        name: "Cat Toy Set",
        description: "Set of 5 interactive toys",
        price: 15.99,
        image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=1470&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "store5",
    name: "Gift Express",
    type: "Gifts • Occasions",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1440&auto=format&fit=crop",
    rating: 4.4,
    deliveryTime: 40,
    deliveryFee: 3.99,
    category: "gifts",
    products: [
      {
        id: "prod11",
        storeId: "store5",
        name: "Birthday Gift Box",
        description: "Assorted chocolates and small gifts",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1440&auto=format&fit=crop"
      },
      {
        id: "prod12",
        storeId: "store5",
        name: "Rose Bouquet",
        description: "12 fresh roses with gift wrap",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1520903304654-6d5e79254336?q=80&w=1473&auto=format&fit=crop"
      }
    ]
  }
];

export const activeOrder: Order = {
  id: "order1",
  storeId: "store1",
  storeName: "Fresh Basket Grocery",
  storeImage: "https://images.unsplash.com/photo-1573225342350-39908978a80c?q=80&w=2048&auto=format&fit=crop",
  status: "on-the-way",
  items: [
    {
      id: "prod1",
      name: "Organic Bananas (1 bunch)",
      quantity: 1,
      price: 3.99
    },
    {
      id: "prod2",
      name: "Whole Milk (1 gal)",
      quantity: 2,
      price: 4.50
    }
  ],
  total: 12.99,
  deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
  createdAt: "2025-05-19T14:30:00",
  estimatedDelivery: "2025-05-19T15:10:00",
  trackingInfo: {
    currentLocation: {
      lat: 40.7128,
      lng: -74.0060
    },
    deliveryExecutive: {
      name: "John Doe",
      phone: "+1 555-123-4567",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374&auto=format&fit=crop"
    }
  }
};

export const pastOrders: Order[] = [
  {
    id: "order2",
    storeId: "store2",
    storeName: "Burger Station",
    storeImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1365&auto=format&fit=crop",
    status: "delivered",
    items: [
      {
        id: "prod5",
        name: "Classic Cheeseburger",
        quantity: 2,
        price: 8.99
      },
      {
        id: "prod6",
        name: "French Fries",
        quantity: 1,
        price: 3.99
      }
    ],
    total: 21.97,
    deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
    createdAt: "2025-05-18T18:45:00",
    estimatedDelivery: "2025-05-18T19:30:00"
  }
];

export const userData: User = {
  id: "user1",
  name: "Alex Johnson",
  email: "alex@example.com",
  phone: "+1 555-987-6543",
  addresses: [
    {
      id: "addr1",
      type: "home",
      address: "123 Main St, Apt 4B, New York, NY 10001",
      landmark: "Near Central Park",
      isDefault: true
    },
    {
      id: "addr2",
      type: "work",
      address: "456 Office Rd, Floor 12, New York, NY 10002",
      landmark: "Glass building with blue logo",
      isDefault: false
    }
  ],
  paymentMethods: [
    {
      id: "pay1",
      type: "card",
      name: "Visa ending in 4242",
      details: "Expires 09/26",
      isDefault: true
    },
    {
      id: "pay2",
      type: "upi",
      name: "Google Pay",
      details: "alex@upi",
      isDefault: false
    }
  ],
  orders: ["order1", "order2"]
};

export const driverData: Driver = {
  id: "driver1",
  name: "John Doe",
  email: "john.driver@example.com",
  phone: "+1 555-123-4567",
  vehicle: "Motorcycle",
  vehicleNumber: "AB123CD",
  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1374&auto=format&fit=crop",
  status: 'online',
  currentLocation: {
    lat: 40.7128,
    lng: -74.0060
  },
  rating: 4.8,
  totalDeliveries: 247,
  activeOrderId: "order1"
};

export const getAvailableOrders = (): Order[] => {
  return [
    {
      id: "order3",
      storeId: "store3",
      storeName: "MediQuick Pharmacy",
      storeImage: "https://images.unsplash.com/photo-1617881770125-6fb0d039ecad?q=80&w=1471&auto=format&fit=crop",
      status: "preparing",
      items: [
        {
          id: "prod7",
          name: "Pain Relief Tablets",
          quantity: 1,
          price: 7.99
        }
      ],
      total: 7.99,
      deliveryAddress: "789 Health St, New York, NY 10003",
      createdAt: "2025-05-19T15:45:00",
      estimatedDelivery: "2025-05-19T16:30:00"
    },
    {
      id: "order4",
      storeId: "store2",
      storeName: "Burger Station",
      storeImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1365&auto=format&fit=crop",
      status: "preparing",
      items: [
        {
          id: "prod5",
          name: "Classic Cheeseburger",
          quantity: 1,
          price: 8.99
        },
        {
          id: "prod6",
          name: "French Fries",
          quantity: 1,
          price: 3.99
        }
      ],
      total: 12.98,
      deliveryAddress: "456 Food Ave, New York, NY 10002",
      createdAt: "2025-05-19T15:30:00",
      estimatedDelivery: "2025-05-19T16:15:00"
    }
  ];
};
