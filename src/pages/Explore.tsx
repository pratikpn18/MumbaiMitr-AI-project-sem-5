import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import marineDrive from "@/assets/marine-drive.jpg";
import bandraWorli from "@/assets/bandra-worli.jpg";

const Explore = () => {
  const areas = [
    {
      name: "Colaba",
      description: "Historic area with Gateway of India, Taj Hotel, and vibrant Causeway",
      highlights: "Gateway of India, Leopold Cafe, Colaba Causeway",
      image: marineDrive,
    },
    {
      name: "Marine Drive",
      description: "Queen's Necklace promenade with stunning Art Deco architecture",
      highlights: "Sunset views, Art Deco buildings, Chowpatty Beach",
      image: marineDrive,
    },
    {
      name: "Bandra",
      description: "Trendy neighborhood with sea link, fort, and bustling Linking Road",
      highlights: "Bandra-Worli Sea Link, Bandstand, Linking Road shopping",
      image: bandraWorli,
    },
    {
      name: "Juhu",
      description: "Popular beach area famous for street food and Bollywood homes",
      highlights: "Juhu Beach, street food, celebrity spotting",
      image: marineDrive,
    },
    {
      name: "CST & Fort",
      description: "Colonial heritage area with UNESCO sites and bustling markets",
      highlights: "CST Station, Crawford Market, heritage architecture",
      image: marineDrive,
    },
    {
      name: "Worli",
      description: "Coastal area with Haji Ali Dargah and modern developments",
      highlights: "Haji Ali Dargah, Worli Fort, Sea Link views",
      image: bandraWorli,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto py-8 px-4">

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Explore Mumbai</h1>
          <p className="text-lg text-muted-foreground">
            Discover the diverse neighborhoods and iconic areas of Mumbai
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {areas.map((area) => (
            <Card key={area.name} className="overflow-hidden hover:shadow-xl transition-all group">
              <div className="h-48 overflow-hidden">
                <img
                  src={area.image}
                  alt={area.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{area.name}</CardTitle>
                <CardDescription className="text-base">
                  {area.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span>{area.highlights}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Want personalized recommendations for these areas?
          </p>
          <Link to="/chat">
            <Button size="lg">
              Ask Mumbai Mitr
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Explore;