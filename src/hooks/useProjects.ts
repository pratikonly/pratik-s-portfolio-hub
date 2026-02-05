import { fallbackProjects, type FallbackProject } from '@/data/projects';

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  category: 'website' | 'app' | 'ui';
  tech: string[];
  live_url: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// Convert fallback projects to match Project interface
function normalizeProjects(fallback: FallbackProject[]): Project[] {
  const now = new Date().toISOString();
  return fallback.map(p => ({
    ...p,
    image_url: p.image_url,
    created_at: now,
    updated_at: now,
  }));
}

export function useProjects() {
  // Return static data from JSON file
  const projects = normalizeProjects(fallbackProjects);
  
  return {
    data: projects,
    isLoading: false,
    isError: false,
  };
}
