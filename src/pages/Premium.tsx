import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function Premium() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (!loading && !user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <Card className="text-center">
          <CardHeader>
            <Shield className="w-12 h-12 text-primary mx-auto mb-2" />
            <CardTitle className="text-2xl">Premium features removed</CardTitle>
            <CardDescription>
              All features are now available to every user.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')}>Go to Home</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
