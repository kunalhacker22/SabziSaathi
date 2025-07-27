import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Slots = () => {
  const slots = [
    {
      id: "SLOT001",
      hub: "Green Valley Hub",
      address: "Sector 21, Noida",
      date: "Today",
      time: "2:00 PM - 4:00 PM",
      status: "active",
      tools: ["Chopper", "Weighing Scale", "Grater"],
      vendor: "राज पटेल",
      progress: 65,
      remaining: "35 minutes"
    },
    {
      id: "SLOT002",
      hub: "Fresh Mart Hub",
      address: "Connaught Place, Delhi",
      date: "Today",
      time: "4:00 PM - 6:00 PM",
      status: "upcoming",
      tools: ["Knife Set", "Chopper"],
      vendor: "सुनीता शर्मा",
      progress: 0,
      remaining: "Starts in 2 hours"
    },
    {
      id: "SLOT003",
      hub: "Green Valley Hub",
      address: "Sector 21, Noida",
      date: "Tomorrow",
      time: "10:00 AM - 12:00 PM",
      status: "booked",
      tools: ["Chopper", "Scale", "Mixer"],
      vendor: "अमित गुप्ता",
      progress: 0,
      remaining: "Starts tomorrow"
    },
    {
      id: "SLOT004",
      hub: "City Market Hub",
      address: "Karol Bagh, Delhi",
      date: "Tomorrow",
      time: "2:00 PM - 4:00 PM",
      status: "available",
      tools: ["Chopper", "Weighing Scale"],
      vendor: null,
      progress: 0,
      remaining: "Available to book"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "border-l-primary bg-primary/5";
      case "upcoming": return "border-l-accent bg-accent/5";
      case "booked": return "border-l-trust bg-trust/5";
      case "available": return "border-l-secondary bg-secondary/5";
      case "completed": return "border-l-muted bg-muted/5";
      default: return "border-l-muted";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return "bg-primary text-primary-foreground animate-pulse";
      case "upcoming": return "bg-accent text-accent-foreground";
      case "booked": return "bg-trust text-trust-foreground";
      case "available": return "bg-secondary text-secondary-foreground";
      case "completed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const activeSlots = slots.filter(slot => slot.status === "active").length;
  const upcomingSlots = slots.filter(slot => slot.status === "upcoming" || slot.status === "booked").length;
  const availableSlots = slots.filter(slot => slot.status === "available").length;

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
            <h1 className="text-3xl font-bold">Prep Slots</h1>
            <p className="text-muted-foreground">Manage your preparation time slots at different hubs</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Slots</p>
                  <p className="text-3xl font-bold text-primary">{activeSlots}</p>
                </div>
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Upcoming Slots</p>
                  <p className="text-3xl font-bold text-accent">{upcomingSlots}</p>
                </div>
                <Calendar className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-secondary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available Slots</p>
                  <p className="text-3xl font-bold text-secondary-foreground">{availableSlots}</p>
                </div>
                <Plus className="h-8 w-8 text-secondary-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Slots Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {slots.map((slot) => (
            <Card key={slot.id} className={`border-l-4 ${getStatusColor(slot.status)} hover:shadow-card transition-shadow`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{slot.hub}</CardTitle>
                    <CardDescription className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{slot.address}</span>
                    </CardDescription>
                  </div>
                  <Badge className={getStatusBadge(slot.status)}>
                    {slot.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{slot.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{slot.time}</span>
                  </span>
                </div>

                {slot.vendor && (
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{slot.vendor}</span>
                  </div>
                )}

                {slot.status === "active" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{slot.progress}%</span>
                    </div>
                    <Progress value={slot.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">{slot.remaining}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Available Tools:</p>
                  <div className="flex flex-wrap gap-1">
                    {slot.tools.map((tool) => (
                      <Badge key={tool} variant="outline" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  {slot.status === "available" && (
                    <Button variant="market" size="sm" className="flex-1">
                      Book Slot
                    </Button>
                  )}
                  {slot.status === "active" && (
                    <Button variant="outline" size="sm" className="flex-1">
                      Check Status
                    </Button>
                  )}
                  {(slot.status === "upcoming" || slot.status === "booked") && (
                    <>
                      <Button variant="outline" size="sm" className="flex-1">
                        Modify
                      </Button>
                      <Button variant="destructive" size="sm">
                        Cancel
                      </Button>
                    </>
                  )}
                  {slot.status !== "available" && slot.status !== "active" && (
                    <Button variant="trust" size="sm" className="flex-1">
                      View Details
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Button size="lg" className="w-full">
            <Plus className="h-5 w-5 mr-2" />
            Find Available Slots
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Slots;