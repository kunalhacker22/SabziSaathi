import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { VendorDashboard } from "@/components/vendor/VendorDashboard";
import { HubDashboard } from "@/components/hub/HubDashboard";
import { LoginForm } from "@/components/auth/LoginForm";
import { Toaster } from "@/components/ui/toaster";

interface User {
  type: "vendor" | "hub";
  phone: string;
  name: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userType: "vendor" | "hub", email: string) => {
    // In a real app, this would validate with Supabase
    const name = userType === "vendor" ? "राज पटेल" : "Green Valley Hub";
    setUser({ type: userType, phone: email, name });
  };

  if (!user) {
    return (
      <>
        <LoginForm onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userType={user.type}
        userName={user.name}
        cartItems={user.type === "vendor" ? 3 : undefined}
        walletBalance={user.type === "vendor" ? 2500 : undefined}
      />
      
      <main className="container mx-auto px-4 py-8">
        {user.type === "vendor" ? (
          <VendorDashboard />
        ) : (
          <HubDashboard />
        )}
      </main>
      <Toaster />
    </div>
  );
};

export default Index;
