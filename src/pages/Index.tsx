import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Map, Calendar, MapPin, Compass, Shield } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import heroImage from "@/assets/mumbai-hero.jpg";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            Welcome to Mumbai Mitr
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-md">
            Your AI-powered friend exploring the City of Dreams
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/chat">
              <Button size="lg" className="text-lg shadow-lg">
                <MessageCircle className="mr-2" />
                Chat with Mumbai Mitr
              </Button>
            </Link>
            <Link to="/explore">
              <Button size="lg" variant="secondary" className="text-lg shadow-lg">
                <Compass className="mr-2" />
                Explore Areas
              </Button>
            </Link>
            {!user && (
              <Link to="/auth">
                <Button size="lg" variant="outline" className="text-lg shadow-lg bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                  Get Started Free
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Discover Mumbai Your Way</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <MessageCircle className="w-12 h-12 text-primary mb-4" />
                <CardTitle>AI Tour Guide</CardTitle>
                <CardDescription>
                  Chat with Mumbai Mitr, your friendly AI companion who knows everything about the city
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <Map className="w-12 h-12 text-secondary mb-4" />
                <CardTitle>Interactive Map</CardTitle>
                <CardDescription>
                  Explore 23+ points of interest across Mumbai with our interactive map
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <Calendar className="w-12 h-12 text-accent mb-4" />
                <CardTitle>Custom Itineraries</CardTitle>
                <CardDescription>Get AI-generated trip suggestions tailored to your interests</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <MapPin className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Famous Areas</CardTitle>
                <CardDescription>
                  Discover Colaba, Bandra, Marine Drive, Juhu Beach, and more iconic locations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <Compass className="w-12 h-12 text-secondary mb-4" />
                <CardTitle>Hidden Gems & Resorts</CardTitle>
                <CardDescription>Discover local secrets, boutique stays, and curated experiences</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <Shield className="w-12 h-12 text-accent mb-4" />
                <CardTitle>Always Available</CardTitle>
                <CardDescription>
                  24/7 access to Mumbai information, whether planning or exploring
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium features removed */}

      {/* Quick Links */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Start Exploring Now</h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/map">
              <Button variant="outline" size="lg">
                <Map className="mr-2" />
                View Map
              </Button>
            </Link>
            <Link to="/itinerary">
              <Button variant="outline" size="lg">
                <Calendar className="mr-2" />
                Plan Itinerary
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" size="lg">
                <Shield className="mr-2" />
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;