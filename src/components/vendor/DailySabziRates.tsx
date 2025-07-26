import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Minus, 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown, 
  Search,
  Filter
} from "lucide-react";

interface VegetableItem {
  id: string;
  name: string;
  hindiName: string;
  pricePerKg: number;
  originalPrice: number;
  minQuantity: number;
  unit: string;
  quality: "Premium" | "Fresh" | "Good";
  trend: "up" | "down" | "stable";
  discount?: number;
  image: string;
  availability: "In Stock" | "Limited" | "Out of Stock";
}

const vegetableData: VegetableItem[] = [
  {
    id: "1",
    name: "Onions",
    hindiName: "प्याज़",
    pricePerKg: 25,
    originalPrice: 35,
    minQuantity: 5,
    unit: "kg",
    quality: "Premium",
    trend: "down",
    discount: 29,
    image: "🧅",
    availability: "In Stock"
  },
  {
    id: "2", 
    name: "Tomatoes",
    hindiName: "टमाटर",
    pricePerKg: 30,
    originalPrice: 40,
    minQuantity: 3,
    unit: "kg",
    quality: "Fresh",
    trend: "up",
    discount: 25,
    image: "🍅",
    availability: "In Stock"
  },
  {
    id: "3",
    name: "Green Chilies",
    hindiName: "हरी मिर्च",
    pricePerKg: 80,
    originalPrice: 100,
    minQuantity: 1,
    unit: "kg",
    quality: "Premium",
    trend: "stable",
    discount: 20,
    image: "🌶️",
    availability: "Limited"
  },
  {
    id: "4",
    name: "Coriander",
    hindiName: "धनिया",
    pricePerKg: 40,
    originalPrice: 50,
    minQuantity: 2,
    unit: "kg",
    quality: "Fresh",
    trend: "down",
    discount: 20,
    image: "🌿",
    availability: "In Stock"
  },
  {
    id: "5",
    name: "Potatoes",
    hindiName: "आलू",
    pricePerKg: 20,
    originalPrice: 25,
    minQuantity: 10,
    unit: "kg",
    quality: "Good",
    trend: "stable",
    discount: 20,
    image: "🥔",
    availability: "In Stock"
  },
  {
    id: "6",
    name: "Cabbage",
    hindiName: "पत्तागोभी",
    pricePerKg: 15,
    originalPrice: 20,
    minQuantity: 5,
    unit: "kg",
    quality: "Fresh",
    trend: "down",
    discount: 25,
    image: "🥬",
    availability: "In Stock"
  }
];

export function DailySabziRates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [cartItems, setCartItems] = useState<Record<string, number>>({});

  const filteredVegetables = vegetableData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.hindiName.includes(searchTerm)
  );

  const updateQuantity = (id: string, change: number) => {
    const item = vegetableData.find(v => v.id === id);
    if (!item) return;

    setQuantities(prev => {
      const currentQty = prev[id] || item.minQuantity;
      const newQty = Math.max(item.minQuantity, currentQty + change);
      return { ...prev, [id]: newQty };
    });
  };

  const addToCart = (id: string) => {
    const quantity = quantities[id] || vegetableData.find(v => v.id === id)?.minQuantity || 1;
    setCartItems(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + quantity
    }));
    
    // Reset quantity after adding to cart
    setQuantities(prev => ({ ...prev, [id]: 0 }));
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "Premium": return "bg-primary text-primary-foreground";
      case "Fresh": return "bg-accent text-accent-foreground";
      case "Good": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "In Stock": return "text-primary";
      case "Limited": return "text-accent";
      case "Out of Stock": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-3 w-3 text-destructive" />;
      case "down": return <TrendingDown className="h-3 w-3 text-primary" />;
      default: return <div className="h-3 w-3 rounded-full bg-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">आज के भाव</h2>
          <p className="text-muted-foreground">Fresh vegetables at wholesale prices</p>
        </div>
        
        <div className="flex gap-2">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="सब्जी खोजें..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Today's Highlights */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="bg-gradient-fresh text-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">₹500+</div>
            <div className="text-sm opacity-90">आज की बचत</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-warm text-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm opacity-90">आइटम्स उपलब्ध</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-market text-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">25%</div>
            <div className="text-sm opacity-90">औसत छूट</div>
          </CardContent>
        </Card>
        <Card className="border-trust border-2">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-trust">Free</div>
            <div className="text-sm text-trust">5kg+ डिलीवरी</div>
          </CardContent>
        </Card>
      </div>

      {/* Vegetables Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVegetables.map((item) => {
          const currentQty = quantities[item.id] || item.minQuantity;
          const inCart = cartItems[item.id] || 0;
          
          return (
            <Card key={item.id} className="overflow-hidden shadow-card hover:shadow-market transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{item.image}</div>
                    <div>
                      <CardTitle className="text-lg">{item.hindiName}</CardTitle>
                      <p className="text-sm text-muted-foreground">{item.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getTrendIcon(item.trend)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className={getQualityColor(item.quality)} variant="secondary">
                      {item.quality}
                    </Badge>
                    {item.discount && (
                      <Badge variant="destructive" className="animate-pulse">
                        {item.discount}% OFF
                      </Badge>
                    )}
                  </div>
                  <p className={`text-sm font-medium ${getAvailabilityColor(item.availability)}`}>
                    {item.availability}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Pricing */}
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-primary">
                    ₹{item.pricePerKg}
                  </span>
                  <span className="text-sm text-muted-foreground">/{item.unit}</span>
                  {item.originalPrice > item.pricePerKg && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{item.originalPrice}
                    </span>
                  )}
                </div>

                <p className="text-xs text-muted-foreground">
                  Minimum: {item.minQuantity}{item.unit} • Bulk pricing
                </p>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={currentQty <= item.minQuantity}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-12 text-center font-semibold">
                      {currentQty}{item.unit}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="font-bold text-primary">
                      ₹{(item.pricePerKg * currentQty).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                  variant="market"
                  className="w-full"
                  onClick={() => addToCart(item.id)}
                  disabled={item.availability === "Out of Stock"}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  कार्ट में डालें
                  {inCart > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {inCart}{item.unit}
                    </Badge>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredVegetables.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">कोई सब्जी नहीं मिली</p>
          <p className="text-sm text-muted-foreground">अलग खोजने की कोशिश करें</p>
        </div>
      )}
    </div>
  );
}