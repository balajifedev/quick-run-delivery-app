
import React from "react";
import { CalendarDays, Truck, Package, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

// Sample data for the dashboard
const revenueData = [
  { name: "Mon", amount: 420 },
  { name: "Tue", amount: 380 },
  { name: "Wed", amount: 510 },
  { name: "Thu", amount: 350 },
  { name: "Fri", amount: 620 },
  { name: "Sat", amount: 750 },
  { name: "Sun", amount: 690 },
];

const recentOrders = [
  { id: "ORD-001", customer: "Alex Johnson", total: 32.50, status: "Delivered", time: "10:30 AM" },
  { id: "ORD-002", customer: "Sarah Williams", total: 45.99, status: "Processing", time: "11:45 AM" },
  { id: "ORD-003", customer: "Michael Brown", total: 29.75, status: "Preparing", time: "12:15 PM" },
  { id: "ORD-004", customer: "Emily Davis", total: 18.99, status: "Delivered", time: "2:20 PM" },
];

const MerchantDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center bg-gray-100 rounded-md px-3 py-1">
          <CalendarDays className="h-4 w-4 mr-2" />
          <span className="text-sm">May 19, 2025</span>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Revenue</p>
                <h3 className="text-2xl font-bold">$850.90</h3>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" /> +12.5%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Orders</p>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" /> +5.2%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Truck className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Deliveries</p>
                <h3 className="text-2xl font-bold">18</h3>
                <p className="text-sm text-red-600 flex items-center mt-1">
                  <TrendingDown className="h-4 w-4 mr-1" /> -3.1%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Products</p>
                <h3 className="text-2xl font-bold">124</h3>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 mr-1" /> +8.4%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Revenue</CardTitle>
            <CardDescription>Your earnings for the past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto max-h-[300px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium py-2">Order ID</th>
                    <th className="text-left font-medium py-2">Customer</th>
                    <th className="text-left font-medium py-2">Total</th>
                    <th className="text-left font-medium py-2">Status</th>
                    <th className="text-left font-medium py-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3">{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3">${order.total.toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'Processing' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MerchantDashboard;
