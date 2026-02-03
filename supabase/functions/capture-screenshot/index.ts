import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { url, projectId } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Capturing screenshot for URL: ${url}`);

    // Use thum.io free service for screenshots
    // Format: https://image.thum.io/get/width/1280/crop/720/[URL]
    const screenshotUrl = `https://image.thum.io/get/width/1280/crop/720/${encodeURIComponent(url)}`;
    
    // Verify the URL is accessible by making a HEAD request
    try {
      const checkResponse = await fetch(screenshotUrl, { method: 'HEAD' });
      if (!checkResponse.ok) {
        console.log(`Screenshot service returned status: ${checkResponse.status}`);
      }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      console.log(`Could not verify screenshot URL: ${errorMessage}`);
    }

    // If projectId is provided, update the project's image_url in the database
    if (projectId) {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      const { error } = await supabase
        .from('projects')
        .update({ image_url: screenshotUrl, updated_at: new Date().toISOString() })
        .eq('id', projectId);

      if (error) {
        console.error('Error updating project:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to update project', details: error.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log(`Updated project ${projectId} with screenshot URL`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        screenshotUrl,
        message: projectId ? 'Screenshot captured and project updated' : 'Screenshot URL generated'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in capture-screenshot function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
