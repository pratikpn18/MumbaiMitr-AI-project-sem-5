import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface POI {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  area: string;
  tags: string[];
  image_url?: string;
}

interface POICardProps {
  poi: POI;
  onClick?: () => void;
}

export const POICard = ({ poi, onClick }: POICardProps) => {
  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      {poi.image_url && (
        <div className="h-48 overflow-hidden">
          <img 
            src={poi.image_url} 
            alt={poi.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {poi.name}
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-secondary">
          <MapPin className="w-3 h-3" />
          {poi.area}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {poi.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {poi.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};