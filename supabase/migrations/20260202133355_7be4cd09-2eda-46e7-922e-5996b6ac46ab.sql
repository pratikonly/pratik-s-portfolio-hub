-- Create the update_updated_at_column function first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create projects table
CREATE TABLE public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  category text NOT NULL CHECK (category IN ('website', 'app', 'ui')),
  tech text[] DEFAULT '{}',
  live_url text NOT NULL,
  display_order integer DEFAULT 0,
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

-- Create trigger for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert existing projects from static data
INSERT INTO public.projects (title, description, image_url, category, tech, live_url, display_order) VALUES
('PirateOne', 'Advanced web-based entertainment platform that lets users browse and watch movies, TV shows, and anime with search, watchlist, and history features.', 'https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-9.png', 'app', ARRAY['HTML', 'CSS', 'JavaScript'], 'https://piratexone.vercel.app/', 1),
('Nest', 'A minimalist real-time chat app with user login, clean interface, and options to clear chat history.', 'https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-7.png', 'app', ARRAY['HTML', 'CSS', 'JavaScript'], 'https://nestxmain.vercel.app/', 2),
('Exciler - Burner Mails', 'A free temporary email service that creates instant burner or custom addresses with an auto-deleting inbox—no registration required.', 'https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-8.PNG', 'app', ARRAY['HTML', 'CSS', 'JavaScript'], 'https://exciler.vercel.app/', 3),
('Devtri Seczone Private Limited', 'A responsive Empowering Industries website with modern design and professional layout.', 'https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-6.jpg', 'website', ARRAY['HTML', 'CSS', 'JavaScript'], 'https://devtriseczone.vercel.app/', 4),
('NotaForge v2', 'A simple note-taking app with image and file uploads, and note management, built with Express and PostgreSQL.', 'https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-10.png', 'app', ARRAY['HTML', 'CSS', 'JavaScript'], 'https://notaforge.vercel.app/', 5),
('NotaForge', 'A simple note-taking app with image and file uploads, color customization, and note management, built with Express and PostgreSQL.', 'https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-5.jpg', 'app', ARRAY['HTML', 'CSS', 'JavaScript'], 'https://notepad-main-ftid.onrender.com/', 6),
('CloudVault v2', 'A simple, community-driven platform to share and explore categorized online resources with password-protected edits.', 'https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-4.PNG', 'app', ARRAY['HTML', 'CSS', 'JavaScript'], 'https://cloudxvault2.vercel.app/', 7),
('CloudVault', 'DIGITAL ARSENAL v2.0 - Where all Tech related resources are provided for developers and enthusiasts.', 'https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-3.jpg', 'ui', ARRAY['JavaScript', 'HTML', 'CSS'], 'https://cloudxvault.vercel.app/', 8),
('Window Activation Page', 'A Website which provides 2 methods to activate your Windows operating system easily.', 'https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-2.PNG', 'website', ARRAY['HTML', 'CSS', 'JavaScript'], 'https://window-activate.vercel.app/', 9),
('Portfolio Website', 'A responsive portfolio website showcasing projects, skills, and professional information.', 'https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-1.jpg', 'website', ARRAY['HTML', 'CSS', 'JavaScript'], 'https://pratikx.vercel.app/', 10);