import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
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

export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'>;
export type ProjectUpdate = Partial<ProjectInsert>;

// Storage key for localStorage backup
const PROJECTS_STORAGE_KEY = 'portfolio_projects_backup';

// Save projects to localStorage as backup
function saveToLocalStorage(projects: Project[]) {
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.warn('Failed to save projects to localStorage:', e);
  }
}

// Get projects from localStorage backup
function getFromLocalStorage(): Project[] | null {
  try {
    const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    console.warn('Failed to read projects from localStorage:', e);
    return null;
  }
}

// Convert fallback projects to match Project interface
function normalizeFallbackProjects(fallback: FallbackProject[]): Project[] {
  const now = new Date().toISOString();
  return fallback.map(p => ({
    ...p,
    image_url: p.image_url,
    created_at: now,
    updated_at: now,
  }));
}

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
        
        const projects = data as Project[];
        // Save to localStorage as backup
        saveToLocalStorage(projects);
        
        return projects;
      } catch (dbError) {
        console.warn('Database unavailable, trying localStorage backup...');
        
        // Try localStorage first
        const localData = getFromLocalStorage();
        if (localData && localData.length > 0) {
          console.log('Using localStorage backup data');
          return localData;
        }
        
        // Fall back to static JSON
        console.log('Using static fallback data');
        return normalizeFallbackProjects(fallbackProjects);
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    retryDelay: 500,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (project: ProjectInsert) => {
      const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select()
        .single();
      
      if (error) throw error;
      return data as Project;
    },
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      
      // Update localStorage backup
      const current = getFromLocalStorage() || [];
      saveToLocalStorage([...current, newProject]);
      
      toast({ title: 'Project created successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Failed to create project', description: error.message, variant: 'destructive' });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: ProjectUpdate }) => {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Project;
    },
    onSuccess: (updatedProject) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      
      // Update localStorage backup
      const current = getFromLocalStorage() || [];
      const updated = current.map(p => p.id === updatedProject.id ? updatedProject : p);
      saveToLocalStorage(updated);
      
      toast({ title: 'Project updated successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Failed to update project', description: error.message, variant: 'destructive' });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      
      // Update localStorage backup
      const current = getFromLocalStorage() || [];
      saveToLocalStorage(current.filter(p => p.id !== deletedId));
      
      toast({ title: 'Project deleted successfully' });
    },
    onError: (error: Error) => {
      toast({ title: 'Failed to delete project', description: error.message, variant: 'destructive' });
    },
  });
}
