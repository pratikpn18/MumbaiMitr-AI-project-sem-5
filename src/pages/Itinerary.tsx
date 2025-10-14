import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Loader2, Sparkles, Crown, Lock } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Itinerary = () => {
  const { user, isPremium } = useAuth();
  const navigate = useNavigate();
  const [interests, setInterests] = useState("");
  const [days, setDays] = useState("1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  // Redirect to auth if not logged in
  if (!user) {
    navigate('/auth');
    return null;
  }

  const generateItinerary = async () => {
    if (!interests.trim()) {
      toast.error("Please tell us your interests first!");
      return;
    }

    // Premium feature check: Multi-day itineraries require premium
    const numDays = parseInt(days);
    if (numDays > 1 && !isPremium) {
      toast.error("Multi-day itineraries are a premium feature!");
      setTimeout(() => navigate('/premium'), 1500);
      return;
    }

    setIsGenerating(true);
    setSuggestion("");

    try {
      // Enhanced prompt for premium users
      const premiumContext = isPremium 
        ? "Include hidden gems, premium restaurant recommendations, luxury hotels, and exclusive local experiences."
        : "";
      
      const prompt = `Create a ${days}-day itinerary for Mumbai based on these interests: ${interests}. Include specific places, timing suggestions, and practical tips. ${premiumContext}`;

      const { data, error } = await supabase.functions.invoke('mumbai-chat', {
        body: {
          messages: [
            { role: "user", content: prompt }
          ]
        }
      });

      if (error) throw error;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setSuggestion(data.message);
      toast.success("Itinerary generated!");
    } catch (error) {
      console.error('Error generating itinerary:', error);
      toast.error("Failed to generate itinerary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />
      
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-3">
            <h1 className="text-4xl font-bold">Plan Your Mumbai Trip</h1>
            {isPremium && (
              <Badge className="bg-premium-gradient text-white border-0 px-3 py-1">
                <Crown className="w-4 h-4 mr-1" />
                Premium
              </Badge>
            )}
          </div>
          <p className="text-lg text-muted-foreground">
            Let Mumbai Mitr create a personalized itinerary based on your interests
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Itinerary Generator
            </CardTitle>
            <CardDescription>
              Tell us about your interests and we'll create a custom Mumbai experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="days">How many days?</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="days"
                  type="number"
                  min="1"
                  max="7"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  placeholder="1"
                  disabled={!isPremium && parseInt(days) > 1}
                />
                {!isPremium && parseInt(days) > 1 && (
                  <Badge variant="outline" className="text-xs whitespace-nowrap">
                    <Lock className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              {!isPremium && (
                <p className="text-sm text-muted-foreground mt-2">
                  Free users: 1-day itineraries only. 
                  <Button
                    variant="link"
                    className="p-0 h-auto ml-1"
                    onClick={() => navigate('/premium')}
                  >
                    Upgrade for multi-day planning
                  </Button>
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="interests">What are your interests?</Label>
              <Textarea
                id="interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g., heritage sites, street food, beaches, shopping, nightlife, photography..."
                rows={4}
              />
            </div>

            <Button
              onClick={generateItinerary}
              disabled={isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 w-4 h-4" />
                  Generate Itinerary
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {suggestion && (
          <Card>
            <CardHeader>
              <CardTitle>Your Personalized Itinerary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {suggestion}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Itinerary;