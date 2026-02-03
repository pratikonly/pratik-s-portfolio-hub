

# Fix: Screenshot Capture System Not Working

## Problem Identified

After testing, I found that the edge function **works correctly when called directly** (returns status 200 with valid screenshot URL). However, the CORS headers are incomplete which may cause issues when the frontend calls the function.

The current CORS headers:
```javascript
'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
```

The required CORS headers (per Supabase guidelines):
```javascript
'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version'
```

---

## Solution

Update the CORS headers in the edge function to include all required Supabase client headers.

---

## File Changes

### Edit: `supabase/functions/capture-screenshot/index.ts`

**Change the corsHeaders constant to include all required headers:**

```javascript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};
```

---

## Testing After Fix

After making this change:
1. Go to the Admin panel
2. Click on "Projects" tab
3. Try clicking the refresh button (Update Screenshot) on any project
4. The screenshot should be captured and the thumbnail should update

Alternatively, add a new project with a URL to test the automatic screenshot capture on blur.

