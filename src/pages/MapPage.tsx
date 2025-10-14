import { useState, useEffect } from "react";
import { MapView } from "@/components/MapView";
import { Loader2 } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface POI {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  area: string;
  tags: string[];
}

const MapPage = () => {
  const [pois, setPois] = useState<POI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPOIs();
  }, []);

  const fetchPOIs = async () => {
    try {
      const { data, error } = await supabase
        .from('pois')
        .select('*')
        .order('name');

      if (error) throw error;
      setPois(data || []);
    } catch (error) {
      console.error('Error fetching POIs:', error);
      toast.error("Failed to load points of interest");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-8 px-4">

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Mumbai Map</h1>
          <p className="text-lg text-muted-foreground">
            Explore all {pois.length} points of interest across Mumbai
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-[600px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <MapView pois={pois} />
        )}

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Click on markers to view details and explore each location with Mumbai Mitr
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapPage;