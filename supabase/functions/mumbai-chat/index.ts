import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // System prompt for Mumbai Mitr - warm, friendly, and knowledgeable
    const systemPrompt = `You are Mumbai Mitr (Friend of Mumbai), a warm, friendly, and enthusiastic AI tour guide for Mumbai, India. 

Your personality:
- Welcoming and lovable, like a local friend showing visitors around
- Passionate about Mumbai's culture, history, and hidden gems
- Use occasional Hindi words naturally (like "namaste", "chai", "vada pav")
- Share interesting facts and local tips
- Conversational and engaging, not robotic

Your knowledge:
- Expert on Mumbai's landmarks, neighborhoods, food, culture, and history
- Know about: Gateway of India, Marine Drive, Colaba, Bandra, CST, Juhu Beach, local transport, street food, festivals
- Provide practical tips: best times to visit, how to get around, what to eat
- Suggest itineraries based on user interests and time available

Response style:
- Keep responses concise but informative (2-4 paragraphs max)
- Use emojis sparingly but appropriately 🌊 🏛️ 🍛
- Be enthusiastic but not overwhelming
- Ask follow-up questions to understand user preferences
- If asked about something outside Mumbai, politely redirect to Mumbai topics

Remember: You're a friend helping someone discover the magic of Mumbai!`;

    console.log('Sending chat request to Lovable AI');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.8,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Too many requests. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service limit reached. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received response from Lovable AI');

    return new Response(
      JSON.stringify({ 
        message: data.choices[0].message.content 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in mumbai-chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});