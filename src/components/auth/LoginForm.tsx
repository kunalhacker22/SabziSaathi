import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Lock, 
  Users, 
  Store,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import sabziSaathiLogo from "@/assets/sabzi-saathi-logo.png";


interface LoginFormProps {
  onLogin: (userType: "vendor" | "hub", email: string) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"vendor" | "hub">("vendor");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    if (!email || !password) return;
    
    setIsLoading(true);
    // Simulate login verification (accept any email with password "password123")
    setTimeout(() => {
      if (password === "password123") {
        toast({
          title: "Login successful",
          description: "Welcome to SabziSaathi!",
        });
        onLogin(userType, email);
      } else {
        toast({
          title: "Invalid credentials",
          description: "Please check your email and password (use 'password123' for demo)",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  const features = [
    {
      title: "Bulk Pricing",
      description: "Wholesale rates for street vendors",
      icon: "💰"
    },
    {
      title: "Fresh Quality",
      description: "Premium vegetables daily",
      icon: "🥬"
    },
    {
      title: "Prep Facilities",
      description: "Hygienic preparation hubs",
      icon: "🏪"
    },
    {
      title: "Fast Delivery",
      description: "Same-day delivery available",
      icon: "🚚"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-market text-white p-12 flex-col justify-center">
        <div className="max-w-md">
          <div className="flex items-center space-x-4 mb-8">
            <img 
              src={sabziSaathiLogo} 
              alt="SabziSaathi"
              className="h-16 w-16 rounded-xl bg-white/20 p-2"
            />
            <div>
              <h1 className="text-4xl font-bold">SabziSaathi</h1>
              <p className="text-xl opacity-90">Your Vegetable Partner</p>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-6">
            Fresh vegetables at wholesale prices
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of street food vendors saving money and time with SabziSaathi's 
            bulk purchasing and hygienic prep facilities.
          </p>

          <div className="grid gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h4 className="font-semibold">{feature.title}</h4>
                  <p className="text-sm opacity-90">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <img 
              src={sabziSaathiLogo} 
              alt="SabziSaathi"
              className="h-16 w-16 rounded-xl mx-auto mb-4 shadow-card"
            />
            <h1 className="text-3xl font-bold bg-gradient-market bg-clip-text text-transparent">
              SabziSaathi
            </h1>
            <p className="text-muted-foreground">Fresh • Fast • Affordable</p>
          </div>

          <Card className="shadow-market border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Welcome Back!
              </CardTitle>
              <p className="text-muted-foreground">
                Sign in to your account to continue
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={userType} onValueChange={(value) => setUserType(value as "vendor" | "hub")}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="vendor" className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Vendor</span>
                  </TabsTrigger>
                  <TabsTrigger value="hub" className="flex items-center space-x-2">
                    <Store className="h-4 w-4" />
                    <span>Hub Operator</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="vendor" className="space-y-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg border">
                    <Users className="h-12 w-12 text-primary mx-auto mb-2" />
                    <h3 className="font-semibold">Street Food Vendor</h3>
                    <p className="text-sm text-muted-foreground">
                      Order fresh vegetables at wholesale prices
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="hub" className="space-y-4">
                  <div className="text-center p-4 bg-accent/5 rounded-lg border">
                    <Store className="h-12 w-12 text-accent mx-auto mb-2" />
                    <h3 className="font-semibold">Hub Operator</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage orders, inventory, and prep facilities
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Demo password: password123
                </p>
              </div>

              <Button 
                variant="market" 
                className="w-full" 
                onClick={handleLogin}
                disabled={!email || !password || isLoading}
              >
                {isLoading ? (
                  "Signing in..."
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>

              <div className="text-center text-xs text-muted-foreground">
                By continuing, you agree to our{" "}
                <Button variant="link" className="p-0 h-auto text-xs">
                  Terms & Conditions
                </Button>{" "}
                and{" "}
                <Button variant="link" className="p-0 h-auto text-xs">
                  Privacy Policy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}