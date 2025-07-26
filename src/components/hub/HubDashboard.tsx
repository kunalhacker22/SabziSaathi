import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import vendorStallImage from "@/assets/vendor-stall.jpg";
import {
  Package,
  Users,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Calendar,
  MapPin,
  Truck,
  BarChart3,
  RefreshCw
} from "lucide-react";

export function HubDashboard() {
  const todayStats = {
    totalOrders: 24,
    completedOrders: 18,
    pendingOrders: 6,
    totalRevenue: 12500,
    activeSlots: 8,
    availableSlots: 4,
    vendorsServed: 15
  };

  const pendingOrders = [
    {
      id: "ORD001",
      vendor: "राज पटेल",
      items: "प्याज़ 5kg, टमाटर 3kg, धनिया 2kg",
      total: 165,
      orderTime: "10:30 AM",
      preferredTime: "2:00 PM",
      type: "delivery",
      status: "confirmed",
      priority: "high"
    },
    {
      id: "ORD002",
      vendor: "सुनीता शर्मा",
      items: "हरी मिर्च 1kg, आलू 10kg",
      total: 280,
      orderTime: "11:15 AM", 
      preferredTime: "1:00 PM",
      type: "pickup",
      status: "preparing",
      priority: "medium"
    },
    {
      id: "ORD003",
      vendor: "रमेश कुमार",
      items: "पत्तागोभी 5kg, गाजर 3kg",
      total: 135,
      orderTime: "11:45 AM",
      preferredTime: "3:00 PM", 
      type: "delivery",
      status: "confirmed",
      priority: "low"
    }
  ];

  const todaySlots = [
    {
      id: "SLOT001",
      vendor: "अमित गुप्ता",
      time: "2:00 PM - 4:00 PM",
      status: "active",
      tools: ["Chopper", "Scale"],
      progress: 60
    },
    {
      id: "SLOT002", 
      vendor: "प्रिया शर्मा",
      time: "4:00 PM - 6:00 PM",
      status: "upcoming",
      tools: ["Grater", "Chopper"],
      progress: 0
    },
    {
      id: "SLOT003",
      vendor: "विकास यादव",
      time: "6:00 PM - 8:00 PM", 
      status: "upcoming",
      tools: ["Scale", "Knife Set"],
      progress: 0
    }
  ];

  const inventoryAlerts = [
    { item: "प्याज़", current: 15, required: 25, unit: "kg", status: "low" },
    { item: "टमाटर", current: 8, required: 20, unit: "kg", status: "critical" },
    { item: "हरी मिर्च", current: 12, required: 15, unit: "kg", status: "ok" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-destructive bg-destructive/5";
      case "medium": return "border-l-accent bg-accent/5";
      case "low": return "border-l-primary bg-primary/5";
      default: return "border-l-muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-trust text-trust-foreground";
      case "preparing": return "bg-accent text-accent-foreground";
      case "ready": return "bg-primary text-primary-foreground";
      case "delivered": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getInventoryStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "text-destructive";
      case "low": return "text-accent";
      case "ok": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-market text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${vendorStallImage})` }}
        />
        <div className="relative p-8 md:p-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">
              Green Valley Hub 🏪
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Efficiently managing orders and serving our vendor community
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{todayStats.totalOrders}</div>
                <div className="text-sm opacity-90">आज के ऑर्डर्स</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">₹{todayStats.totalRevenue.toLocaleString()}</div>
                <div className="text-sm opacity-90">आज की कमाई</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{todayStats.vendorsServed}</div>
                <div className="text-sm opacity-90">वेंडर्स सर्व्ड</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
                <p className="text-3xl font-bold text-primary">{todayStats.pendingOrders}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              <AlertCircle className="mr-1 h-4 w-4 text-accent" />
              <span className="text-muted-foreground">
                {todayStats.pendingOrders} need attention
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Slots</p>
                <p className="text-3xl font-bold text-accent">{todayStats.activeSlots}</p>
              </div>
              <Clock className="h-8 w-8 text-accent" />
            </div>
            <div className="mt-4">
              <Progress 
                value={(todayStats.activeSlots / (todayStats.activeSlots + todayStats.availableSlots)) * 100} 
                className="h-2"
              />
              <p className="text-sm text-muted-foreground mt-1">
                {todayStats.availableSlots} slots available
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-trust">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-3xl font-bold text-trust">₹{todayStats.totalRevenue.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-trust" />
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="mr-1 h-4 w-4 text-primary" />
              <span className="text-primary">+12%</span>
              <span className="text-muted-foreground ml-1">from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-3xl font-bold text-secondary-foreground">
                  {Math.round((todayStats.completedOrders / todayStats.totalOrders) * 100)}%
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-4">
              <Progress 
                value={(todayStats.completedOrders / todayStats.totalOrders) * 100} 
                className="h-2"
              />
              <p className="text-sm text-muted-foreground mt-1">
                {todayStats.completedOrders} of {todayStats.totalOrders} completed
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pending Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-primary" />
                <span>Pending Orders</span>
              </CardTitle>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingOrders.map((order) => (
              <div 
                key={order.id} 
                className={`p-4 border-l-4 rounded-lg ${getPriorityColor(order.priority)} transition-all hover:shadow-card`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">{order.vendor}</h4>
                      <Badge variant="outline" className="text-xs">
                        {order.id}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{order.items}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Ordered: {order.orderTime}</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Due: {order.preferredTime}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        {order.type === "delivery" ? (
                          <Truck className="h-3 w-3" />
                        ) : (
                          <MapPin className="h-3 w-3" />
                        )}
                        <span className="capitalize">{order.type}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary mb-2">₹{order.total}</p>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="market" size="sm">
                    Mark Ready
                  </Button>
                  <Button variant="outline" size="sm">
                    Contact Vendor
                  </Button>
                  {order.type === "delivery" && (
                    <Button variant="trust" size="sm">
                      Assign Delivery
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's Prep Slots */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-accent" />
              <span>Today's Prep Slots</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaySlots.map((slot) => (
              <div key={slot.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{slot.vendor}</h4>
                  <Badge 
                    variant={slot.status === "active" ? "default" : "secondary"}
                    className={slot.status === "active" ? "animate-pulse" : ""}
                  >
                    {slot.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                  <Clock className="h-3 w-3" />
                  <span>{slot.time}</span>
                </div>
                
                {slot.status === "active" && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{slot.progress}%</span>
                    </div>
                    <Progress value={slot.progress} className="h-2" />
                  </div>
                )}
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {slot.tools.map((tool) => (
                    <Badge key={tool} variant="outline" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
                
                {slot.status === "active" && (
                  <Button variant="outline" size="sm" className="w-full">
                    Check Status
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Inventory Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-accent" />
            <span>Inventory Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {inventoryAlerts.map((item) => (
              <div key={item.item} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{item.item}</h4>
                  <Badge 
                    variant="outline" 
                    className={getInventoryStatusColor(item.status)}
                  >
                    {item.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Current: {item.current}{item.unit}</p>
                  <p>Required: {item.required}{item.unit}</p>
                </div>
                <Progress 
                  value={(item.current / item.required) * 100} 
                  className="mt-3 h-2"
                />
                {item.status !== "ok" && (
                  <Button variant="accent" size="sm" className="w-full mt-3">
                    Order More
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Button variant="market" className="h-20 flex-col space-y-2">
          <BarChart3 className="h-6 w-6" />
          <span>Today's Report</span>
        </Button>
        <Button variant="trust" className="h-20 flex-col space-y-2">
          <Package className="h-6 w-6" />
          <span>Bulk Purchase</span>
        </Button>
        <Button variant="accent" className="h-20 flex-col space-y-2">
          <Users className="h-6 w-6" />
          <span>Vendor Directory</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col space-y-2">
          <MapPin className="h-6 w-6" />
          <span>Delivery Routes</span>
        </Button>
      </div>
    </div>
  );
}