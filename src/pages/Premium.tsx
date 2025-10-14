import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function Premium() {
  const { user, isPremium, checkPremiumStatus } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Redirect to auth if not logged in
  if (!user) {
    navigate('/auth');
    return null;
  }

  // TODO: PAYMENT GATEWAY INTEGRATION
  // Replace this simulated purchase with real payment gateway integration
  // Supported gateways: Razorpay, Stripe, PayPal
  // Example for Razorpay: https://razorpay.com/docs/
  // Example for Stripe: https://stripe.com/docs/
  const simulatePremiumPurchase = async () => {
    setLoading(true);

    try {
      // Simulate payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Grant premium role in database
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: user.id,
          role: 'premium',
        });

      if (error) {
        // If role already exists, that's fine
        if (error.code !== '23505') {
          throw error;
        }
      }

      // Refresh premium status
      await checkPremiumStatus();

      toast({
        title: '🎉 Welcome to Premium!',
        description: 'You now have access to all premium features.',
      });

      // Redirect to home after purchase
      setTimeout(() => navigate('/'), 2000);
    } catch (error: any) {
      console.error('Premium purchase error:', error);
      toast({
        title: 'Purchase failed',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const premiumFeatures = [
    'Detailed multi-day itineraries',
    'Premium POI information & hidden gems',
    'Resort & hotel recommendations',
    'Personalized travel suggestions',
    'Priority AI chat support',
    'Offline map downloads',
    'Exclusive local tips & secrets',
    'No ads, ever',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <Crown className="w-16 h-16 text-premium-gold animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-premium-gold bg-clip-text text-transparent">
            Upgrade to Premium
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock the full Mumbai Mitr experience with exclusive features and personalized recommendations
          </p>
        </div>

        {isPremium ? (
          <Card className="max-w-2xl mx-auto border-premium-gold shadow-large">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Badge className="bg-premium-gradient text-white border-0 px-4 py-2 text-lg">
                  <Star className="w-5 h-5 mr-2" />
                  Premium Member
                </Badge>
              </div>
              <CardTitle className="text-2xl">You're already a Premium member!</CardTitle>
              <CardDescription>Enjoy all the exclusive features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-premium-gold flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <Button onClick={() => navigate('/')} className="w-full mt-6">
                Explore Mumbai
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Free Plan</CardTitle>
                <CardDescription>Basic features for casual travelers</CardDescription>
                <div className="text-3xl font-bold mt-4">₹0</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary" />
                    <span>AI chat guide</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary" />
                    <span>Basic POI information</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary" />
                    <span>Interactive map</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary" />
                    <span>Simple itinerary builder</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="border-premium-gold shadow-large relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-premium-gradient text-white px-4 py-1 rounded-bl-lg text-sm font-semibold flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                Popular
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Premium Plan</CardTitle>
                <CardDescription>Full Mumbai experience unlocked</CardDescription>
                <div className="text-4xl font-bold mt-4 bg-premium-gradient bg-clip-text text-transparent">
                  ₹499
                  <span className="text-base text-muted-foreground font-normal">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-premium-gold flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={simulatePremiumPurchase}
                  disabled={loading}
                  className="w-full mt-6 bg-premium-gradient hover:opacity-90 text-white border-0"
                  size="lg"
                >
                  {loading ? 'Processing...' : 'Upgrade Now'}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Demo mode: No real payment required
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* TODO: PAYMENT GATEWAY INTEGRATION NOTES
        
        To integrate a real payment gateway:
        
        1. RAZORPAY (Recommended for India):
           - Sign up at https://razorpay.com/
           - Get API keys from dashboard
           - Install: npm install razorpay
           - Replace simulatePremiumPurchase function with:
             
             const options = {
               key: 'YOUR_RAZORPAY_KEY',
               amount: 49900, // Amount in paise (₹499)
               currency: 'INR',
               name: 'Mumbai Mitr Premium',
               description: 'Monthly subscription',
               handler: async (response) => {
                 // Verify payment on backend
                 // Grant premium role
               }
             };
             const rzp = new Razorpay(options);
             rzp.open();
        
        2. STRIPE (International):
           - Sign up at https://stripe.com/
           - Get publishable key
           - Install: npm install @stripe/stripe-js
           - Create checkout session on backend
           - Redirect to Stripe checkout
        
        3. BACKEND VERIFICATION:
           - Create edge function to verify payment
           - Only grant premium role after payment verification
           - Store transaction details in database
        */}

        <div className="mt-16 text-center text-muted-foreground">
          <p className="text-sm">
            Have questions? <Button variant="link" className="p-0 h-auto">Contact support</Button>
          </p>
        </div>
      </main>
    </div>
  );
}
