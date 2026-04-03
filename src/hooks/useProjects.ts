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
  coming_soon?: boolean;
}

// Convert fallback projects to match Project interface
function normalizeProjects(fallback: FallbackProject[]): Project[] {
  const now = new Date().toISOString();
  return fallback.map(p => ({
    ...p,
    image_url: p.image_url,
    created_at: now,
    updated_at: now,
    coming_soon: p.coming_soon,
  }));
}

export function useProjects() {
  // Return static data sorted by display_order descending (newest first)
  const projects = normalizeProjects(fallbackProjects).sort(
    (a, b) => b.display_order - a.display_order
  );
  
  return {
    data: projects,
    isLoading: false,
    isError: false,
  };
}
