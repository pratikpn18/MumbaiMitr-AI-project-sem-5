import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { POICard } from "@/components/POICard";

interface POI {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  area: string;
  tags: string[];
}

const Admin = () => {
  const [pois, setPois] = useState<POI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    latitude: "",
    longitude: "",
    area: "",
    tags: "",
  });

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
      toast.error("Failed to load POIs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim());
      
      const { error } = await supabase.from('pois').insert({
        name: formData.name,
        description: formData.description,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        area: formData.area,
        tags: tagsArray,
      });

      if (error) throw error;

      toast.success("POI added successfully!");
      setFormData({
        name: "",
        description: "",
        latitude: "",
        longitude: "",
        area: "",
        tags: "",
      });
      fetchPOIs();
    } catch (error) {
      console.error('Error adding POI:', error);
      toast.error("Failed to add POI. Please sign in to access admin features.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this POI?")) return;

    try {
      const { error } = await supabase.from('pois').delete().eq('id', id);
      if (error) throw error;

      toast.success("POI deleted successfully!");
      fetchPOIs();
    } catch (error) {
      console.error('Error deleting POI:', error);
      toast.error("Failed to delete POI");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Admin Panel</h1>
          <p className="text-lg text-muted-foreground">
            Manage Mumbai points of interest
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add POI Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add New POI
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="any"
                      value={formData.latitude}
                      onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="any"
                      value={formData.longitude}
                      onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="area">Area</Label>
                  <Input
                    id="area"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    required
                    placeholder="e.g., Colaba, Bandra, etc."
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="heritage, beach, food"
                  />
                </div>

                <Button type="submit" disabled={isSaving} className="w-full">
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 w-4 h-4" />
                      Add POI
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* POI List */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Existing POIs ({pois.length})</h2>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
                {pois.map((poi) => (
                  <div key={poi.id} className="relative">
                    <POICard poi={poi} />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleDelete(poi.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;