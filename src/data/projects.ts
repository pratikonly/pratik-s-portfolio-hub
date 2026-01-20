export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'website' | 'app' | 'ui';
  tech: string[];
  liveUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "PirateOne",
    description: "Advanced web-based entertainment platform that lets users browse and watch movies, TV shows, and anime with search, watchlist, and history features.",
    image: "https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-9.png",
    category: "app",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://piratexone.vercel.app/"
  },
  {
    id: 2,
    title: "Nest",
    description: "A minimalist real-time chat app with user login, clean interface, and options to clear chat history.",
    image: "https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-7.png",
    category: "app",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://nestxmain.vercel.app/"
  },
  {
    id: 3,
    title: "Exciler - Burner Mails",
    description: "A free temporary email service that creates instant burner or custom addresses with an auto-deleting inbox—no registration required.",
    image: "https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-8.PNG",
    category: "app",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://exciler.vercel.app/"
  },
  {
    id: 4,
    title: "Devtri Seczone Private Limited",
    description: "A responsive Empowering Industries website with modern design and professional layout.",
    image: "https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-6.jpg",
    category: "website",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://devtriseczone.vercel.app/"
  },
  {
    id: 5,
    title: "NotaForge v2",
    description: "A simple note-taking app with image and file uploads, color customization, and note management, built with Express and PostgreSQL.",
    image: "https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-10.png",
    category: "app",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://notaforge.vercel.app/"
  },
  {
    id: 6,
    title: "NotaForge",
    description: "A simple note-taking app with image and file uploads, color customization, and note management, built with Express and PostgreSQL.",
    image: "https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-5.jpg",
    category: "app",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://notepad-main-ftid.onrender.com/"
  },
  {
    id: 7,
    title: "CloudVault v2",
    description: "A simple, community-driven platform to share and explore categorized online resources with password-protected edits.",
    image: "https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-4.PNG",
    category: "app",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://cloudxvault2.vercel.app/"
  },
  {
    id: 8,
    title: "CloudVault",
    description: "DIGITAL ARSENAL v2.0 - Where all Tech related resources are provided for developers and enthusiasts.",
    image: "https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-3.jpg",
    category: "ui",
    tech: ["JavaScript", "HTML", "CSS"],
    liveUrl: "https://cloudxvault.vercel.app/"
  },
  {
    id: 9,
    title: "Window Activation Page",
    description: "A Website which provides 2 methods to activate your Windows operating system easily.",
    image: "https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-2.PNG",
    category: "website",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://window-activate.vercel.app/"
  },
  {
    id: 10,
    title: "Portfolio Website",
    description: "A responsive portfolio website showcasing projects, skills, and professional information.",
    image: "https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/project-1.jpg",
    category: "website",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://pratikx.vercel.app/"
  }
];
