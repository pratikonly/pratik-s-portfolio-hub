

# Plan: Remove Auto Screenshot & Add JSON Fallback System

## Overview

This plan addresses two main requirements:
1. Remove the automatic screenshot capture system - admin will manually paste thumbnail URLs
2. Create a hybrid data system with JSON file as primary fallback when database is disconnected

---

## Changes Summary

### Part 1: Remove Screenshot Capture System

**Delete Edge Function:**
- Delete `supabase/functions/capture-screenshot/index.ts`

**Update ProjectForm (`src/components/admin/ProjectForm.tsx`):**
- Remove the `useCaptureScreenshot` hook import and usage
- Remove the `isCapturing` state
- Remove the `handleCaptureScreenshot` function
- Remove the `handleUrlBlur` auto-capture behavior
- Remove the "Capture" button next to Live URL
- Keep only the manual "Thumbnail URL" input field
- Make thumbnail URL a required field with clear labeling

**Update ProjectsManager (`src/components/admin/ProjectsManager.tsx`):**
- Remove the `useCaptureScreenshot` hook import
- Remove the `handleUpdateScreenshot` function
- Remove the `updatingScreenshot` state
- Remove the "Update Screenshot" button (RefreshCw icon button)

**Update useProjects hook (`src/hooks/useProjects.ts`):**
- Remove the `useCaptureScreenshot` function entirely

---

### Part 2: Hybrid Data System with JSON Fallback

**Strategy:**
- Try to fetch from database first
- If database fails, fall back to the static JSON file (`src/data/projects.ts`)
- When admin creates/updates projects, save to both database AND update the local JSON data file
- The JSON file serves as a static backup that will work even if database is disconnected

**Update projects data file (`src/data/projects.ts`):**
- Align the interface to match database schema (use `image_url`, `live_url`, `display_order`, string id)
- Export a mutable array that can be updated at runtime

**Create new hook (`src/hooks/useProjectsWithFallback.ts`):**
```typescript
// Try database first, fall back to static JSON if error
export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true });
        
        if (error) throw error;
        return { data: data as Project[], source: 'database' };
      } catch (dbError) {
        console.warn('Database unavailable, using fallback data');
        return { data: fallbackProjects, source: 'fallback' };
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
    retryDelay: 500,
  });
}
```

**Update Create/Update mutations:**
- When saving to database, also export/sync to localStorage as backup
- The static JSON file cannot be written at runtime (it's bundled), so we'll use localStorage as a dynamic backup layer

**Update Projects section (`src/components/sections/Projects.tsx`):**
- Show a subtle indicator when using fallback data (optional)
- Normalize data format to handle both sources

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `supabase/functions/capture-screenshot/index.ts` | DELETE | Remove edge function entirely |
| `src/hooks/useProjects.ts` | EDIT | Remove `useCaptureScreenshot`, add fallback logic |
| `src/data/projects.ts` | EDIT | Update interface to match DB schema, add all current projects |
| `src/components/admin/ProjectForm.tsx` | EDIT | Remove screenshot capture, simplify to manual URL only |
| `src/components/admin/ProjectsManager.tsx` | EDIT | Remove screenshot update button |
| `src/components/sections/Projects.tsx` | EDIT | Add fallback data handling |

---

## Technical Details

### Fallback Strategy Flow

```text
User visits website
      │
      ▼
Try fetch from Database
      │
      ├─── Success ──▶ Display projects from DB
      │
      └─── Error ──▶ Load from static JSON file
                           │
                           ▼
                    Display fallback projects
                    (works even if DB disconnected)
```

### Data Sync Strategy

When admin saves a project:
1. Save to Supabase database (primary)
2. Save to localStorage (dynamic backup)
3. Static JSON file serves as build-time snapshot

When loading projects:
1. Try database first
2. If fails, try localStorage backup
3. If no localStorage, use static JSON (bundled at build)

### Updated ProjectForm Fields

- Title (required)
- Description (required)  
- Live URL (required)
- **Thumbnail URL (required)** - Admin pastes image link manually
- Category (dropdown)
- Display Order (number)
- Technologies (comma-separated)

### Sample Updated projects.ts

```typescript
export interface FallbackProject {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: 'website' | 'app' | 'ui';
  tech: string[];
  live_url: string;
  display_order: number;
}

export const fallbackProjects: FallbackProject[] = [
  {
    id: "fallback-1",
    title: "PirateOne",
    description: "Advanced web-based entertainment platform...",
    image_url: "https://raw.githubusercontent.com/pratik11500/...",
    category: "app",
    tech: ["HTML", "CSS", "JavaScript"],
    live_url: "https://piratexone.vercel.app/",
    display_order: 0
  },
  // ... all other projects
];
```

---

## Benefits

1. **No external dependencies** - Screenshot system removed, no thum.io dependency
2. **Resilient display** - Projects always visible even if database disconnects
3. **Simple admin workflow** - Just paste thumbnail URL, no waiting for capture
4. **Multiple backup layers** - Static JSON + localStorage + Database

