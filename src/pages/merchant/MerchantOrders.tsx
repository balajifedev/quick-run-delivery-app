
import React, { useState } from "react";
import { Search, Package, X, Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

// Sample orders data based on the existing mock data
const mockOrders = [
  {
    id: "order1",
    customer: "Alex Johnson",
    address: "123 Main St, Apt 4B, New York, NY 10001",
    time: "10:30 AM",
    date: "May 19, 2025",
    status: "preparing",
    items: [
      { name: "Organic Bananas (1 bunch)", quantity: 1, price: 3.99 },
      { name: "Whole Milk (1 gal)", quantity: 2, price: 4.50 }
    ],
    total: 12.99
  },
  {
    id: "order2",
    customer: "Sarah Williams",
    address: "456 Oak Ave, Brooklyn, NY 10002",
    time: "11:45 AM",
    date: "May 19, 2025",
    status: "preparing",
    items: [
      { name: "Avocados (4 pack)", quantity: 1, price: 6.99 },
      { name: "Fresh Bread Loaf", quantity: 1, price: 3.49 }
    ],
    total: 10.48
  },
  {
    id: "order3",
    customer: "Michael Brown",
    address: "789 Pine St, Manhattan, NY 10003",
    time: "1:15 PM",
    date: "May 19, 2025",
    status: "picked",
    items: [
      { name: "Organic Bananas (1 bunch)", quantity: 2, price: 3.99 },
      { name: "Whole Milk (1 gal)", quantity: 1, price: 4.50 },
      { name: "Fresh Bread Loaf", quantity: 2, price: 3.49 }
    ],
    total: 19.46
  },
  {
    id: "order4",
    customer: "Emily Davis",
    address: "321 Elm St, Queens, NY 10004",
    time: "2:30 PM",
    date: "May 19, 2025",
    status: "delivered",
    items: [
      { name: "Avocados (4 pack)", quantity: 2, price: 6.99 },
      { name: "Fresh Bread Loaf", quantity: 1, price: 3.49 }
    ],
    total: 17.47
  },
  {
    id: "order5",
    customer: "James Wilson",
    address: "654 Maple St, Bronx, NY 10005",
    time: "3:45 PM",
    date: "May 18, 2025",
    status: "delivered",
    items: [
      { name: "Organic Bananas (1 bunch)", quantity: 1, price: 3.99 },
      { name: "Whole Milk (1 gal)", quantity: 3, price: 4.50 }
    ],
    total: 17.49
  }
];

const MerchantOrders: React.FC = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "preparing") return matchesSearch && order.status === "preparing";
    if (activeTab === "picked") return matchesSearch && order.status === "picked";
    if (activeTab === "delivered") return matchesSearch && order.status === "delivered";
    
    return matchesSearch;
  });

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const handleUpdateStatus = (orderId: string, newStatus: "preparing" | "picked" | "delivered" | "cancelled") => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    
    toast.success(`Order status updated to ${newStatus}`);
    setIsOrderDetailsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full md:w-[250px]"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="preparing">Preparing</TabsTrigger>
          <TabsTrigger value="picked">Picked</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <div className="overflow-auto rounded-lg border">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left font-medium p-3">Order ID</th>
                  <th className="text-left font-medium p-3">Customer</th>
                  <th className="text-left font-medium p-3 hidden md:table-cell">Date & Time</th>
                  <th className="text-left font-medium p-3 hidden md:table-cell">Total</th>
                  <th className="text-left font-medium p-3">Status</th>
                  <th className="text-right font-medium p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-t transition-colors hover:bg-muted/25">
                      <td className="p-3 font-medium">{order.id}</td>
                      <td className="p-3">{order.customer}</td>
                      <td className="p-3 hidden md:table-cell">
                        <div className="text-sm text-muted-foreground">
                          {order.date}
                        </div>
                        <div>{order.time}</div>
                      </td>
                      <td className="p-3 hidden md:table-cell">${order.total.toFixed(2)}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'picked' 
                            ? 'bg-blue-100 text-blue-800' 
                            : order.status === 'preparing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewOrder(order)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-3 text-center text-muted-foreground">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Order Details Dialog */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        {selectedOrder && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>
                Order ID: {selectedOrder.id}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                  <p>{selectedOrder.date}, {selectedOrder.time}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delivery Address</p>
                <p>{selectedOrder.address}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Order Items</p>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left font-medium p-2">Item</th>
                        <th className="text-center font-medium p-2">Qty</th>
                        <th className="text-right font-medium p-2">Price</th>
                        <th className="text-right font-medium p-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item: any, index: number) => (
                        <tr key={index} className="border-t">
                          <td className="p-2">{item.name}</td>
                          <td className="p-2 text-center">{item.quantity}</td>
                          <td className="p-2 text-right">${item.price.toFixed(2)}</td>
                          <td className="p-2 text-right">${(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="border-t bg-muted/20">
                        <td colSpan={3} className="p-2 text-right font-medium">Total</td>
                        <td className="p-2 text-right font-medium">${selectedOrder.total.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Status</p>
                <div className="flex gap-2">
                  {selectedOrder.status === "preparing" && (
                    <>
                      <Button 
                        onClick={() => handleUpdateStatus(selectedOrder.id, "picked")}
                        className="flex-1"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Mark as Picked
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleUpdateStatus(selectedOrder.id, "cancelled")}
                        className="flex-1"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel Order
                      </Button>
                    </>
                  )}
                  
                  {selectedOrder.status === "picked" && (
                    <Button 
                      onClick={() => handleUpdateStatus(selectedOrder.id, "delivered")}
                      className="flex-1"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Mark as Delivered
                    </Button>
                  )}
                  
                  {selectedOrder.status === "delivered" && (
                    <p className="text-green-600 flex items-center">
                      <Check className="mr-2 h-4 w-4" />
                      This order has been delivered
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOrderDetailsOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default MerchantOrders;
