
# Plan: Screenshot System Improvements & Admin Loading Fix

## Issues to Address

1. **Screenshot delay**: thum.io takes screenshots immediately, but websites need time to fully load all elements
2. **Admin page stuck on loading**: The query may hang or timeout causing indefinite loading states
3. **Manual thumbnail URL**: Admin should have option to enter a custom thumbnail URL instead of relying on auto-capture

---

## Solution Overview

### 1. Add 5-Second Delay to Screenshot Capture

Update the edge function to use thum.io's `wait` parameter which tells the service to wait before capturing.

**File: `supabase/functions/capture-screenshot/index.ts`**

Change the screenshot URL from:
```javascript
const screenshotUrl = `https://image.thum.io/get/width/1280/crop/720/${encodeURI(normalizedUrl)}`;
```

To include a 5-second delay:
```javascript
const screenshotUrl = `https://image.thum.io/get/width/1280/crop/720/wait/5/${encodeURI(normalizedUrl)}`;
```

The `wait/5` parameter tells thum.io to wait 5 seconds after page load before capturing the screenshot.

---

### 2. Fix Admin Page Loading Issues

Add error handling, retry logic, and timeout handling to prevent infinite loading states.

**File: `src/hooks/useProjects.ts`**

Add staleTime, retry, and error handling options to the query:
```javascript
export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as Project[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    retryDelay: 1000,
  });
}
```

**File: `src/components/admin/ProjectsManager.tsx`**

Add error state handling alongside loading state:
```javascript
const { data: projects, isLoading, isError, refetch } = useProjects();

// Add error UI with retry button
if (isError) {
  return (
    <div className="text-center py-12">
      <p className="text-destructive mb-4">Failed to load projects</p>
      <Button onClick={() => refetch()}>Try Again</Button>
    </div>
  );
}
```

---

### 3. Add Manual Thumbnail URL Input

Update the ProjectForm to allow manual entry of thumbnail URL as an alternative to auto-capture.

**File: `src/components/admin/ProjectForm.tsx`**

Add a new input field for manual thumbnail URL:
```jsx
<div>
  <Label htmlFor="imageUrl">Thumbnail URL (optional)</Label>
  <Input
    id="imageUrl"
    type="url"
    value={imageUrl}
    onChange={(e) => setImageUrl(e.target.value)}
    placeholder="https://example.com/image.png or leave empty for auto-capture"
  />
  <p className="text-xs text-muted-foreground mt-1">
    Enter a direct image URL or use the Capture button to auto-generate
  </p>
</div>
```

Also update the auto-capture logic to skip if user has manually entered an image URL.

---

## File Changes Summary

| File | Change |
|------|--------|
| `supabase/functions/capture-screenshot/index.ts` | Add `wait/5` parameter to thum.io URL for 5-second delay |
| `src/hooks/useProjects.ts` | Add staleTime, retry config to prevent hanging |
| `src/components/admin/ProjectsManager.tsx` | Add error state handling with retry button |
| `src/components/admin/ProjectForm.tsx` | Add manual thumbnail URL input field |

---

## Technical Details

### thum.io Wait Parameter
- `wait/N` - Wait N seconds after page load before capturing (max 60 seconds)
- This ensures dynamic content, images, and animations have time to load

### React Query Improvements
- `staleTime: 5 minutes` - Prevents unnecessary refetches
- `retry: 2` - Retries failed requests twice
- `retryDelay: 1000` - Waits 1 second between retries

### Manual URL Flow
- User can paste any image URL directly
- Auto-capture only triggers on URL blur if imageUrl is empty
- Manual URL takes precedence over captured screenshots
