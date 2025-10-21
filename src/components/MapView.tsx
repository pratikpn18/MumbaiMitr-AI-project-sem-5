import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface POI {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  area: string;
}

interface MapViewProps {
  pois: POI[];
  center?: [number, number];
  zoom?: number;
}

// TODO: CUSTOMIZE - Change default map center and zoom level here
// Default center: Mumbai (lat: 19.0760, lon: 72.8777), zoom: 12
export const MapView = ({ pois, center = [19.0760, 72.8777], zoom = 12 }: MapViewProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current).setView(center, zoom);
    mapRef.current = map;

    // Add tile layer from OpenStreetMap
    // TODO: CUSTOMIZE - To use Google Maps instead:
    // 1. Install: npm install @googlemaps/js-api-loader
    // 2. Replace Leaflet with Google Maps React component
    // 3. Add your API key: const GOOGLE_MAPS_API_KEY = "YOUR_API_KEY_HERE"
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Add markers for all POIs from the dataset
    // TODO: CUSTOMIZE - You can change marker icons, popup styling, and content here
    pois.forEach((poi) => {
      const marker = L.marker([poi.latitude, poi.longitude]).addTo(map);
      
      // Create popup with POI details and "View More" link
      marker.bindPopup(`
        <div class="p-3 min-w-[200px]">
          <h3 class="font-bold text-lg mb-1 text-gray-900">${poi.name}</h3>
          <p class="text-xs text-gray-500 mb-2 flex items-center gap-1">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
            </svg>
            ${poi.area}
          </p>
          <p class="text-sm text-gray-700 mb-3">${poi.description.substring(0, 120)}${poi.description.length > 120 ? '...' : ''}</p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(poi.name + ', ' + poi.area + ', Mumbai, India')}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
          >
            View on Google Maps →
          </a>
        </div>
      `, {
        maxWidth: 300,
        className: 'custom-popup'
      });
    });

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [pois, center, zoom]);

  return <div ref={mapContainerRef} className="w-full h-[600px] rounded-lg shadow-lg" />;
};