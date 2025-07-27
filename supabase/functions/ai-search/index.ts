import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.52.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const { query, userType } = await req.json();
    
    if (!query) {
      throw new Error('Query is required');
    }

    // Create Supabase client with service key for admin access
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

    // Fetch relevant content from database based on query
    const { data: searchData, error: searchError } = await supabase
      .from('search_content')
      .select('*')
      .textSearch('searchable_text', query, { 
        type: 'websearch',
        config: 'english'
      })
      .limit(10);

    if (searchError) {
      console.error('Search error:', searchError);
      throw new Error('Failed to search database');
    }

    // Also do a broader search for partial matches
    const { data: broadSearchData, error: broadSearchError } = await supabase
      .from('search_content')
      .select('*')
      .ilike('searchable_text', `%${query}%`)
      .limit(5);

    // Combine and deduplicate results
    const combinedData = [...(searchData || []), ...(broadSearchData || [])]
      .filter((item, index, self) => 
        index === self.findIndex(t => t.id === item.id)
      );

    // Prepare context for OpenAI
    const contextData = combinedData.map(item => ({
      type: item.content_type,
      title: item.title,
      description: item.description,
      metadata: item.metadata
    }));

    const systemPrompt = `You are an AI assistant for a vegetable marketplace called Sabzi Saathi. 
    You help ${userType === 'vendor' ? 'vendors' : 'hubs'} find information about products, vendors, and hubs.
    
    Based on the search query and the available data, provide helpful and accurate information.
    If the data doesn't contain relevant information, say so clearly.
    
    Available data context:
    ${JSON.stringify(contextData, null, 2)}
    
    User type: ${userType}
    
    Provide responses in a helpful, concise manner. If suggesting products, include prices and units when available.
    For vendors, focus on product information and pricing.
    For hubs, focus on vendor information and distribution details.`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    });

    const aiResponse = await response.json();
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${aiResponse.error?.message || 'Unknown error'}`);
    }

    const aiMessage = aiResponse.choices[0].message.content;

    return new Response(
      JSON.stringify({ 
        response: aiMessage,
        sources: contextData.length > 0 ? contextData : null,
        query: query
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in ai-search function:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});