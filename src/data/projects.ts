export interface FallbackProject {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: 'website' | 'app' | 'ui';
  tech: string[];
  live_url: string;
  display_order: number;
  coming_soon?: boolean;
}

export const fallbackProjects: FallbackProject[] = [
  {
    id: "fallback-0",
    title: "Ender Chest",
    description: "An advanced storage solution for notes, files, and media with seamless upload, organization, and access from anywhere.",
    image_url: "/placeholder.svg",
    category: "app",
    tech: ["Vite", "TypeScript", "React", "Supabase"],
    live_url: "#",
    display_order: 0,
    coming_soon: true
  },
  {
    id: "fallback-1",
    title: "PirateOne",
    description: "Advanced web-based entertainment platform that lets users browse and watch movies, TV shows, and anime with search, watchlist, and history features.",
    image_url: "/images/pirateone-thumbnail.png",
    category: "app",
    tech: ["HTML", "CSS", "JavaScript"],
    live_url: "http://pirateone-main.vercel.app/",
    display_order: 1
  },
  {
    id: "fallback-2",
    title: "Black Pearl AI",
    description: "An AI-powered assistant that helps users with intelligent conversations, code generation, and creative tasks using advanced language models.",
    image_url: "/images/blackpearl-thumbnail.png",
    category: "website",
    tech: ["Vite", "TypeScript", "HTML", "CSS", "JavaScript"],
    live_url: "https://blackxpearl.vercel.app/",
    display_order: 2
  },
  {
    id: "fallback-3",
    title: "Exciler - Burner Mails",
    description: "A free temporary email service that creates instant burner or custom addresses with an auto-deleting inbox—no registration required.",
    image_url: "https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-8.PNG",
    category: "app",
    tech: ["HTML", "CSS", "JavaScript"],
    live_url: "https://exciler.vercel.app/",
    display_order: 3
  },
  {
    id: "fallback-4",
    title: "Nest",
    description: "A minimalist real-time chat app with user login, clean interface, and options to clear chat history.",
    image_url: "https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-7.png",
    category: "app",
    tech: ["HTML", "CSS", "JavaScript"],
    live_url: "https://nestxmain.vercel.app/",
    display_order: 4
  },
  {
    id: "fallback-5",
    title: "Scrolls",
    description: "A private note-taking platform for writing and sharing ideas through clean, memorable URLs with beautiful publishing.",
    image_url: "/images/scrolls-thumbnail.png",
    category: "website",
    tech: ["Vite", "TypeScript", "HTML", "CSS", "JavaScript"],
    live_url: "https://scrolls-main.vercel.app/",
    display_order: 5
  },
  {
    id: "fallback-6",
    title: "Devtri Seczone Private Limited",
    description: "A responsive Empowering Industries website with modern design and professional layout.",
    image_url: "https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-6.jpg",
    category: "website",
    tech: ["HTML", "CSS", "JavaScript"],
    live_url: "https://devtriseczone.vercel.app/",
    display_order: 6
  },
  {
    id: "fallback-7",
    title: "CloudVault v2",
    description: "A simple, community-driven platform to share and explore categorized online resources with password-protected edits.",
    image_url: "https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-4.PNG",
    category: "app",
    tech: ["HTML", "CSS", "JavaScript"],
    live_url: "https://cloudxvault2.vercel.app/",
    display_order: 7
  },
  {
    id: "fallback-8",
    title: "CloudVault",
    description: "DIGITAL ARSENAL v2.0 - Where all Tech related resources are provided for developers and enthusiasts.",
    image_url: "https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-3.jpg",
    category: "ui",
    tech: ["JavaScript", "HTML", "CSS"],
    live_url: "https://cloudxvault.vercel.app/",
    display_order: 8
  },
  {
    id: "fallback-9",
    title: "Window Activation Page",
    description: "A Website which provides 2 methods to activate your Windows operating system easily.",
    image_url: "https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-2.PNG",
    category: "website",
    tech: ["HTML", "CSS", "JavaScript"],
    live_url: "https://window-activate.vercel.app/",
    display_order: 9
  },
  {
    id: "fallback-10",
    title: "NotaForge",
    description: "A simple note-taking app with image and file uploads, color customization, and note management, built with Express and PostgreSQL.",
    image_url: "https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-10.png",
    category: "app",
    tech: ["HTML", "CSS", "JavaScript"],
    live_url: "https://notaforge.vercel.app/",
    display_order: 10
  },
  {
    id: "fallback-11",
    title: "Pratik Portfolio",
    description: "A responsive portfolio website showcasing projects, skills, and professional information.",
    image_url: "https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-1.PNG",
    category: "website",
    tech: ["HTML", "CSS", "JavaScript"],
    live_url: "http://portfolio-bypratik.vercel.app/",
    display_order: 11
  }
];
