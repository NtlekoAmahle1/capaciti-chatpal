
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SYSTEM_PROMPT = `You are AskCapa, CAPACITI's AI Assistant. Provide accurate information about CAPACITI's programs and services.

Key Information about CAPACITI:

Programs:
1. Web Development
   - Frontend: HTML, CSS, JavaScript, React
   - Backend: Node.js, Express, Databases
   - Full Stack Development
   - Duration: 3-6 months

2. Data Analytics
   - Data Analysis & Visualization
   - SQL & Database Management
   - Python for Data Science
   - Duration: 3-4 months

3. UX/UI Design
   - User Research & Testing
   - Design Thinking
   - Prototyping Tools
   - Duration: 3-4 months

4. Digital Marketing
   - Social Media Marketing
   - Content Strategy
   - SEO & Analytics
   - Duration: 3-4 months

Be friendly but professional, and provide specific, accurate details about programs when asked.`

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const { messages } = await req.json()

    if (!Array.isArray(messages)) {
      throw new Error('Invalid messages format');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API error:', errorData);
        throw new Error(errorData.error?.message || 'OpenAI API call failed');
      }

      const data = await response.json();
      const reply = data.choices[0].message.content;

      return new Response(
        JSON.stringify({ reply }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      throw new Error(`OpenAI API request failed: ${fetchError.message}`);
    }
  } catch (error) {
    console.error('Error in edge function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'If this error persists, please ensure the Edge Function is properly deployed and the OpenAI API key is set.'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
