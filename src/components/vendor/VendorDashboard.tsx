import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DailySabziRates } from "./DailySabziRates";
import { AISearch } from "@/components/common/AISearch";
import freshVegetablesHero from "@/assets/fresh-vegetables-hero.jpg";
import { Link } from "react-router-dom";
import { 
  Clock, 
  MapPin, 
  Truck, 
  Wallet, 
  Package, 
  Calendar,
  ArrowRight,
  Star,
  TrendingUp,
  Users
} from "lucide-react";

export function VendorDashboard() {
  const upcomingOrders = [
    {
      id: "ORD001",
      items: "प्याज़ 5kg, टमाटर 3kg",
      total: 165,
      status: "confirmed",
      deliveryTime: "आज, 2:00 PM",
      type: "delivery"
    },
    {
      id: "ORD002", 
      items: "हरी मिर्च 1kg, धनिया 2kg",
      total: 120,
      status: "preparing",
      deliveryTime: "कल, 10:00 AM",
      type: "pickup"
    }
  ];

  const upcomingSlots = [
    {
      id: "SLOT001",
      hub: "Green Valley Hub",
      address: "Sector 21, Noida",
      time: "आज, 4:00 PM - 6:00 PM",
      status: "confirmed",
      tools: ["Chopper", "Weighing Scale"]
    }
  ];

  const todayStats = {
    savings: 450,
    ordersPlaced: 2,
    slotsBooked: 1,
    walletBalance: 2500
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-market text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${freshVegetablesHero})` }}
        />
        <div className="relative p-8 md:p-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">
              नमस्ते राज जी! 🙏
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Fresh vegetables at wholesale prices. Save money, save time.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">₹{todayStats.savings}</div>
                <div className="text-sm opacity-90">आज की बचत</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{todayStats.ordersPlaced}</div>
                <div className="text-sm opacity-90">आज के ऑर्डर</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">25%</div>
                <div className="text-sm opacity-90">औसत बचत</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-market transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
          <CardContent className="p-6 text-center">
            <div className="bg-gradient-fresh text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Package className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">नया ऑर्डर</h3>
            <p className="text-sm text-muted-foreground mb-4">Fresh vegetables order करें</p>
            <Link to="/orders">
              <Button variant="outline" size="sm" className="w-full">
                ऑर्डर करें
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-market transition-all duration-300 cursor-pointer border-2 hover:border-accent/20">
          <CardContent className="p-6 text-center">
            <div className="bg-gradient-warm text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">प्रीप स्लॉट</h3>
            <p className="text-sm text-muted-foreground mb-4">Hub में prep time book करें</p>
            <Link to="/slots">
              <Button variant="outline" size="sm" className="w-full">
                स्लॉट बुक करें
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-market transition-all duration-300 cursor-pointer border-2 hover:border-trust/20">
          <CardContent className="p-6 text-center">
            <div className="bg-trust text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Wallet className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">वॉलेट</h3>
            <p className="text-sm text-muted-foreground mb-4">Balance: ₹{todayStats.walletBalance}</p>
            <Button variant="outline" size="sm" className="w-full">
              टॉप अप करें
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-market transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
          <CardContent className="p-6 text-center">
            <div className="bg-gradient-market text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">नियर हब्स</h3>
            <p className="text-sm text-muted-foreground mb-4">Nearby prep locations</p>
            <Button variant="outline" size="sm" className="w-full">
              हब्स देखें
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-primary" />
                <span>आने वाले ऑर्डर्स</span>
              </CardTitle>
              <Link to="/orders">
                <Button variant="ghost" size="sm">
                  सभी देखें
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge variant={order.status === "confirmed" ? "default" : "secondary"}>
                      {order.status === "confirmed" ? "Confirmed" : "Preparing"}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {order.id}
                    </Badge>
                  </div>
                  <p className="font-medium">{order.items}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{order.deliveryTime}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      {order.type === "delivery" ? (
                        <Truck className="h-3 w-3" />
                      ) : (
                        <MapPin className="h-3 w-3" />
                      )}
                      <span>{order.type === "delivery" ? "Delivery" : "Pickup"}</span>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">₹{order.total}</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    ट्रैक करें
                  </Button>
                </div>
              </div>
            ))}
            
            {upcomingOrders.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>कोई आने वाला ऑर्डर नहीं</p>
                <Button variant="market" className="mt-4">
                  नया ऑर्डर करें
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Prep Slots */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-accent" />
              <span>प्रीप स्लॉट्स</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSlots.map((slot) => (
              <div key={slot.id} className="p-4 border rounded-lg bg-accent/5">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="default">Confirmed</Badge>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
                <h4 className="font-semibold text-sm">{slot.hub}</h4>
                <p className="text-xs text-muted-foreground mb-2">{slot.address}</p>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-3 w-3" />
                  <span>{slot.time}</span>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-1">Available Tools:</p>
                  <div className="flex flex-wrap gap-1">
                    {slot.tools.map((tool) => (
                      <Badge key={tool} variant="outline" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <Button variant="accent" className="w-full">
              नया स्लॉट बुक करें
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Today's Rates Section */}
      <DailySabziRates />
      
      {/* AI Search Section */}
      <AISearch userType="vendor" />
    </div>
  );
}