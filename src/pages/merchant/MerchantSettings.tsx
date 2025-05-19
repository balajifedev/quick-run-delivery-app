
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Store profile schema
const storeProfileSchema = z.object({
  name: z.string().min(3, "Store name must be at least 3 characters"),
  type: z.string().min(3, "Store type must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Please enter a valid image URL"),
});

// Account schema
const accountSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional()
    .or(z.literal("")),
  confirmPassword: z
    .string()
    .optional()
    .or(z.literal("")),
}).refine(data => !data.password || data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type StoreProfileValues = z.infer<typeof storeProfileSchema>;
type AccountValues = z.infer<typeof accountSchema>;

const MerchantSettings: React.FC = () => {
  // Initialize form with mock data
  const storeProfileForm = useForm<StoreProfileValues>({
    resolver: zodResolver(storeProfileSchema),
    defaultValues: {
      name: "Fresh Basket Grocery",
      type: "Grocery • Daily Essentials",
      description: "We offer fresh, locally sourced produce and grocery items for your daily needs.",
      image: "https://images.unsplash.com/photo-1573225342350-39908978a80c?q=80&w=2048&auto=format&fit=crop",
    },
  });

  const accountForm = useForm<AccountValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      email: "merchant@example.com",
      phone: "+1 (555) 123-4567",
      password: "",
      confirmPassword: "",
    },
  });

  const onStoreProfileSubmit = (data: StoreProfileValues) => {
    console.log("Store profile updated:", data);
    toast.success("Store profile updated successfully!");
  };

  const onAccountSubmit = (data: AccountValues) => {
    console.log("Account settings updated:", data);
    toast.success("Account settings updated successfully!");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Tabs defaultValue="profile">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="profile">Store Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        {/* Store Profile Tab */}
        <TabsContent value="profile" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>
                Update your store details and how it appears to customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...storeProfileForm}>
                <form onSubmit={storeProfileForm.handleSubmit(onStoreProfileSubmit)} className="space-y-4">
                  <FormField
                    control={storeProfileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={storeProfileForm.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Type</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          E.g., "Grocery • Daily Essentials" or "Bakery • Fresh Bread"
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={storeProfileForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Description</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={storeProfileForm.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Image URL</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <Input {...field} />
                            {field.value && (
                              <div className="w-full max-w-[200px] overflow-hidden rounded-md border">
                                <img
                                  src={field.value}
                                  alt="Store Preview"
                                  className="aspect-video object-cover"
                                />
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit">Update Store Profile</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>
                Set your store opening and closing hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <div key={day} className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <Label>{day}</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            type="time"
                            defaultValue="09:00"
                            className="w-24"
                          />
                          <span>to</span>
                          <Input
                            type="time"
                            defaultValue="18:00"
                            className="w-24"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch defaultChecked={day !== "Sunday"} />
                        <Label>Open</Label>
                      </div>
                    </div>
                  ))}
                </div>
                <Button>Save Business Hours</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Update your email, phone, and password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...accountForm}>
                <form onSubmit={accountForm.handleSubmit(onAccountSubmit)} className="space-y-4">
                  <FormField
                    control={accountForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={accountForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-medium mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <FormField
                        control={accountForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Leave blank to keep current password"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={accountForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="Leave blank to keep current password"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit">Save Account Settings</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive order and system notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Order Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Orders</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when a new order is placed
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Order Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when an order status changes
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium">System Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Inventory Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when products are running low
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Marketing Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive tips and promotions to boost your business
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium">Notification Methods</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via SMS
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>App Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications in the app
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Button>Save Notification Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MerchantSettings;
