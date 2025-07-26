import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  ShoppingCart, 
  User, 
  Menu, 
  Wallet, 
  Clock, 
  MapPin,
  LogOut,
  Settings
} from "lucide-react";
import sabziSaathiLogo from "@/assets/sabzi-saathi-logo.png";

interface HeaderProps {
  userType?: "vendor" | "hub" | null;
  userName?: string;
  cartItems?: number;
  walletBalance?: number;
}

export function Header({ 
  userType = null, 
  userName = "राज पटेल", 
  cartItems = 3, 
  walletBalance = 2500 
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = userType === "vendor" 
    ? [
        { label: "दैनिक भाव", href: "/", icon: "📊" },
        { label: "मेरे ऑर्डर", href: "/orders", icon: "📦" },
        { label: "प्रीप स्लॉट", href: "/prep-slots", icon: "⏰" },
        { label: "वॉलेट", href: "/wallet", icon: "💳" },
        { label: "हब्स", href: "/hubs", icon: "📍" }
      ]
    : userType === "hub"
    ? [
        { label: "डैशबोर्ड", href: "/hub", icon: "📊" },
        { label: "ऑर्डर्स", href: "/hub/orders", icon: "📦" },
        { label: "इन्वेंट्री", href: "/hub/inventory", icon: "📋" },
        { label: "स्लॉट्स", href: "/hub/slots", icon: "⏰" },
        { label: "रिपोर्ट्स", href: "/hub/reports", icon: "📈" }
      ]
    : [];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src={sabziSaathiLogo} 
            alt="SabziSaathi"
            className="h-10 w-10 rounded-lg shadow-card"
          />
          <div className="hidden sm:block">
            <h1 className="text-2xl font-bold bg-gradient-market bg-clip-text text-transparent">
              SabziSaathi
            </h1>
            <p className="text-xs text-muted-foreground">
              {userType === "vendor" ? "Fresh • Fast • Affordable" : 
               userType === "hub" ? "Hub Management" : "Welcome"}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        {userType && (
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="text-sm font-medium hover:text-primary"
                asChild
              >
                <a href={item.href}>
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </a>
              </Button>
            ))}
          </nav>
        )}

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {userType === "vendor" && (
            <>
              {/* Wallet Balance */}
              <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-gradient-subtle rounded-lg border">
                <Wallet className="h-4 w-4 text-trust" />
                <span className="text-sm font-semibold text-trust">
                  ₹{walletBalance.toLocaleString()}
                </span>
              </div>

              {/* Cart */}
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs animate-bounce-in"
                  >
                    {cartItems}
                  </Badge>
                )}
              </Button>
            </>
          )}

          {userType ? (
            <>
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-gradient-market">
                    <span className="text-white font-semibold">
                      {userName.charAt(0)}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {userType === "vendor" ? "Street Food Vendor" : "Hub Operator"}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    प्रोफाइल
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    सेटिंग्स
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    लॉग आउट
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="text-left">मेन्यू</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {userType === "vendor" && (
                      <div className="flex items-center space-x-3 p-4 bg-gradient-subtle rounded-lg">
                        <Wallet className="h-5 w-5 text-trust" />
                        <div>
                          <p className="text-sm text-muted-foreground">वॉलेट बैलेंस</p>
                          <p className="text-lg font-semibold text-trust">
                            ₹{walletBalance.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <nav className="space-y-2">
                      {navigationItems.map((item) => (
                        <Button
                          key={item.href}
                          variant="ghost"
                          className="w-full justify-start"
                          asChild
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <a href={item.href}>
                            <span className="mr-3 text-lg">{item.icon}</span>
                            {item.label}
                          </a>
                        </Button>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                लॉग इन
              </Button>
              <Button variant="market">
                रजिस्टर
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}