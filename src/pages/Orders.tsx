import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Package, Clock, MapPin, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const Orders = () => {
  const orders = [
    {
      id: "ORD001",
      items: "प्याज़ 5kg, टमाटर 3kg",
      total: 165,
      status: "confirmed",
      deliveryTime: "आज, 2:00 PM",
      type: "delivery",
      vendor: "राज पटेल"
    },
    {
      id: "ORD002", 
      items: "हरी मिर्च 1kg, धनिया 2kg",
      total: 120,
      status: "preparing",
      deliveryTime: "कल, 10:00 AM",
      type: "pickup",
      vendor: "सुनीता शर्मा"
    },
    {
      id: "ORD003",
      items: "आलू 10kg, गाजर 3kg",
      total: 280,
      status: "delivered",
      deliveryTime: "कल, 11:00 AM",
      type: "delivery",
      vendor: "अमित गुप्ता"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-trust text-trust-foreground";
      case "preparing": return "bg-accent text-accent-foreground";
      case "delivered": return "bg-primary text-primary-foreground";
      case "cancelled": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Orders</h1>
            <p className="text-muted-foreground">Manage your vegetable orders</p>
          </div>
        </div>

        <div className="grid gap-6">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-card transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {order.id}
                      </Badge>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{order.vendor}</h3>
                    <p className="text-muted-foreground mb-3">{order.items}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
                    <p className="text-2xl font-bold text-primary mb-3">₹{order.total}</p>
                    <div className="space-y-2">
                      {order.status !== "delivered" && (
                        <Button variant="outline" size="sm" className="w-full">
                          Track Order
                        </Button>
                      )}
                      <Button variant="market" size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Button className="w-full" size="lg">
            <Package className="h-5 w-5 mr-2" />
            Place New Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Orders;