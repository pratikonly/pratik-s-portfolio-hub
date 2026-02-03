

# Implementation Plan

This plan covers three changes:
1. Fixing the footer copyright year
2. Implementing automatic website screenshot capture for projects
3. Adding admin functionality to manage projects with thumbnail updates

---

## 1. Footer Copyright Year Fix

**Change:** Update `src/components/layout/Footer.tsx` to display a static year "2024" instead of the dynamic `new Date().getFullYear()`.

---

## 2. Dynamic Project Management with Auto Screenshots

### Overview

Currently, projects are hardcoded in `src/data/projects.ts`. We'll move projects to the database and implement automatic screenshot capture using an external screenshot API.

### Database Changes

**Create a new `projects` table:**

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| title | text | Project name |
| description | text | Project description |
| image_url | text | Screenshot URL (auto or manual) |
| category | text | website / app / ui |
| tech | text[] | Array of technologies |
| live_url | text | Project URL |
| created_at | timestamp | Creation date |
| updated_at | timestamp | Last update |

**RLS Policies:**
- Anyone can SELECT (public viewing)
- Only admins can INSERT/UPDATE/DELETE

---

## 3. Screenshot Capture Edge Function

**Create `supabase/functions/capture-screenshot/index.ts`**

This function will:
1. Accept a website URL
2. Use a free screenshot API (like `https://api.apiflash.com` or `https://screenshot.abstractapi.com`) to capture the screenshot
3. Return the screenshot URL

**Note:** We'll use a free screenshot service that doesn't require an API key, or I'll ask you to provide one if needed.

**Alternative approach:** Use `https://image.thum.io/get/width/1280/crop/720/` which is free and doesn't require authentication.

---

## 4. Admin Project Management

**Update `src/pages/Admin.tsx` to add a new "Projects" tab with:**

- List of all projects with thumbnails
- "Add New Project" form with fields:
  - Title
  - Description  
  - Live URL (auto-fetches screenshot on blur)
  - Category dropdown
  - Tech stack input
- "Update Screenshot" button for each project
- Edit/Delete functionality

---

## 5. Frontend Updates

**Update `src/components/sections/Projects.tsx`:**
- Fetch projects from database instead of static file
- Use React Query for data fetching
- Show loading skeleton while fetching

**Create new components:**
- `src/components/admin/ProjectsManager.tsx` - Admin project management UI
- `src/components/admin/ProjectForm.tsx` - Add/Edit project form

---

## Technical Details

### Screenshot Service Flow

```text
+----------------+      +-------------------+      +------------------+
|  Admin adds    | ---> | Edge Function     | ---> | Screenshot API   |
|  project URL   |      | captures image    |      | (thum.io/other)  |
+----------------+      +-------------------+      +------------------+
                                |
                                v
                        +-------------------+
                        | Returns image URL |
                        | stored in DB      |
                        +-------------------+
```

### File Changes Summary

| Action | File |
|--------|------|
| Edit | `src/components/layout/Footer.tsx` |
| Create | `supabase/functions/capture-screenshot/index.ts` |
| Edit | `supabase/config.toml` |
| Create | `src/components/admin/ProjectsManager.tsx` |
| Create | `src/components/admin/ProjectForm.tsx` |
| Edit | `src/pages/Admin.tsx` |
| Edit | `src/components/sections/Projects.tsx` |
| Create | `src/hooks/useProjects.ts` |
| Migration | Create `projects` table with RLS |

### Database Migration

```sql
-- Create projects table
CREATE TABLE public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  category text NOT NULL CHECK (category IN ('website', 'app', 'ui')),
  tech text[] DEFAULT '{}',
  live_url text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Anyone can view projects
CREATE POLICY "Anyone can view projects" ON public.projects
  FOR SELECT USING (true);

-- Only admins can insert
CREATE POLICY "Admins can insert projects" ON public.projects
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));

-- Only admins can update
CREATE POLICY "Admins can update projects" ON public.projects
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));

-- Only admins can delete
CREATE POLICY "Admins can delete projects" ON public.projects
  FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- Insert existing projects (migrate from static data)
INSERT INTO public.projects (title, description, image_url, category, tech, live_url) VALUES
('PirateOne', 'Advanced web-based entertainment platform...', 'https://...', 'app', ARRAY['HTML', 'CSS', 'JavaScript'], 'https://piratexone.vercel.app/'),
-- ... all 10 existing projects
```

---

## Summary

After implementation:
1. Footer will show "© 2024 Pratik. All Rights Reserved."
2. Projects will be stored in database, not hardcoded
3. When admin adds a new project with a URL, the screenshot is automatically captured
4. Admin can click "Update Screenshot" to refresh any project's thumbnail
5. Frontend will fetch projects dynamically from the database

