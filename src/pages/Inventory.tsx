import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Package, AlertTriangle, TrendingUp, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Inventory = () => {
  const inventory = [
    {
      id: 1,
      name: "प्याज़ (Onions)",
      current: 45,
      minimum: 20,
      maximum: 100,
      unit: "kg",
      price: 40,
      status: "good",
      lastUpdated: "2 hours ago"
    },
    {
      id: 2,
      name: "टमाटर (Tomatoes)",
      current: 8,
      minimum: 15,
      maximum: 80,
      unit: "kg",
      price: 50,
      status: "low",
      lastUpdated: "1 hour ago"
    },
    {
      id: 3,
      name: "आलू (Potatoes)",
      current: 75,
      minimum: 30,
      maximum: 150,
      unit: "kg",
      price: 25,
      status: "good",
      lastUpdated: "3 hours ago"
    },
    {
      id: 4,
      name: "हरी मिर्च (Green Chili)",
      current: 3,
      minimum: 10,
      maximum: 25,
      unit: "kg",
      price: 80,
      status: "critical",
      lastUpdated: "30 minutes ago"
    },
    {
      id: 5,
      name: "धनिया (Coriander)",
      current: 12,
      minimum: 8,
      maximum: 20,
      unit: "bundles",
      price: 15,
      status: "good",
      lastUpdated: "1 hour ago"
    },
    {
      id: 6,
      name: "पत्तागोभी (Cabbage)",
      current: 20,
      minimum: 15,
      maximum: 50,
      unit: "pieces",
      price: 30,
      status: "good",
      lastUpdated: "2 hours ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "border-l-destructive bg-destructive/5";
      case "low": return "border-l-accent bg-accent/5";
      case "good": return "border-l-primary bg-primary/5";
      default: return "border-l-muted";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "low": return "bg-accent text-accent-foreground";
      case "good": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStockPercentage = (current: number, maximum: number) => {
    return (current / maximum) * 100;
  };

  const criticalItems = inventory.filter(item => item.status === "critical").length;
  const lowItems = inventory.filter(item => item.status === "low").length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.current * item.price), 0);

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
            <h1 className="text-3xl font-bold">Inventory Management</h1>
            <p className="text-muted-foreground">Monitor and manage your vegetable stock</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <Card className="border-l-4 border-l-destructive">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Critical Items</p>
                  <p className="text-3xl font-bold text-destructive">{criticalItems}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
                  <p className="text-3xl font-bold text-accent">{lowItems}</p>
                </div>
                <Package className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Inventory Value</p>
                  <p className="text-3xl font-bold text-primary">₹{totalValue.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {inventory.map((item) => (
            <Card key={item.id} className={`border-l-4 ${getStatusColor(item.status)} hover:shadow-card transition-shadow`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <Badge className={getStatusBadge(item.status)}>
                    {item.status}
                  </Badge>
                </div>
                <CardDescription>
                  Last updated: {item.lastUpdated}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{item.current}</span>
                  <span className="text-sm text-muted-foreground">/ {item.maximum} {item.unit}</span>
                </div>
                
                <Progress 
                  value={getStockPercentage(item.current, item.maximum)} 
                  className="h-2"
                />
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Min: {item.minimum} {item.unit}</span>
                  <span>₹{item.price}/{item.unit}</span>
                </div>

                {item.status !== "good" && (
                  <Button variant="market" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Restock Now
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex space-x-4">
          <Button size="lg" className="flex-1">
            <Plus className="h-5 w-5 mr-2" />
            Add New Item
          </Button>
          <Button variant="outline" size="lg" className="flex-1">
            Generate Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Inventory;