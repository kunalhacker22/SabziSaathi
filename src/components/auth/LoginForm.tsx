import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Phone, 
  Shield, 
  Users, 
  Store,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import sabziSaathiLogo from "@/assets/sabzi-saathi-logo.png";
import { supabase } from "@/integrations/supabase/client";

interface LoginFormProps {
  onLogin: (userType: "vendor" | "hub", phone: string) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [userType, setUserType] = useState<"vendor" | "hub">("vendor");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendOTP = async () => {
    if (phone.length !== 10) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: `+91${phone}`,
        options: {
          shouldCreateUser: true,
        }
      });

      if (error) {
        toast({
          title: "Error sending OTP",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setStep("otp");
        toast({
          title: "OTP sent successfully",
          description: `Verification code sent to +91 ${phone}`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: `+91${phone}`,
        token: otp,
        type: 'sms'
      });

      if (error) {
        toast({
          title: "Invalid OTP",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login successful",
          description: "Welcome to SabziSaathi!",
        });
        onLogin(userType, phone);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
                {step === "phone" ? "Welcome Back!" : "Verify OTP"}
              </CardTitle>
              <p className="text-muted-foreground">
                {step === "phone" 
                  ? "Enter your mobile number to continue" 
                  : `OTP sent to +91 ${phone}`
                }
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === "phone" ? (
                <>
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
                    <Label htmlFor="phone">Mobile Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter 10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="pl-10"
                        maxLength={10}
                      />
                    </div>
                    {phone.length > 0 && phone.length < 10 && (
                      <p className="text-sm text-destructive">Please enter a valid 10-digit number</p>
                    )}
                  </div>

                  <Button 
                    variant="market" 
                    className="w-full" 
                    onClick={handleSendOTP}
                    disabled={phone.length !== 10 || isLoading}
                  >
                    {isLoading ? (
                      "Sending OTP..."
                    ) : (
                      <>
                        Send OTP
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <Badge variant="outline" className="mb-4">
                      +91 {phone}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otp">6-Digit OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="text-center text-xl tracking-widest"
                      maxLength={6}
                    />
                    {otp.length > 0 && otp.length < 6 && (
                      <p className="text-sm text-destructive">Please enter complete 6-digit OTP</p>
                    )}
                  </div>

                  <Button 
                    variant="market" 
                    className="w-full" 
                    onClick={handleVerifyOTP}
                    disabled={otp.length !== 6 || isLoading}
                  >
                    {isLoading ? (
                      "Verifying..."
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Verify & Login
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <Button 
                      variant="ghost" 
                      onClick={() => setStep("phone")}
                      className="text-sm"
                    >
                      Change mobile number
                    </Button>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Didn't receive OTP?{" "}
                      <Button variant="link" className="p-0 h-auto text-sm">
                        Resend OTP
                      </Button>
                    </p>
                  </div>
                </>
              )}

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