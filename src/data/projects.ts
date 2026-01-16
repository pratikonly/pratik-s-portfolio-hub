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
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=400&fit=crop",
    category: "app",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://piratexone.vercel.app/"
  },
  {
    id: 2,
    title: "Exciler - Burner Mails",
    description: "A free temporary email service that creates instant burner or custom addresses with an auto-deleting inbox—no registration required.",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=600&h=400&fit=crop",
    category: "app",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://exciler.vercel.app/"
  },
  {
    id: 3,
    title: "Nest",
    description: "A minimalist real-time chat app with user login, clean interface, and options to clear chat history.",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=600&h=400&fit=crop",
    category: "app",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://nestxmain.vercel.app/"
  },
  {
    id: 4,
    title: "Devtri Seczone Private Limited",
    description: "A responsive Empowering Industries website with modern design and professional layout.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
    category: "website",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://devtriseczone.vercel.app/"
  },
  {
    id: 5,
    title: "NotaForge",
    description: "A simple note-taking app with image and file uploads, color customization, and note management, built with Express and PostgreSQL.",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=400&fit=crop",
    category: "app",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://notepad-main-ftid.onrender.com/"
  },
  {
    id: 6,
    title: "CloudVault v2",
    description: "A simple, community-driven platform to share and explore categorized online resources with password-protected edits.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    category: "app",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://cloudxvault2.vercel.app/"
  },
  {
    id: 7,
    title: "CloudVault",
    description: "DIGITAL ARSENAL v2.0 - Where all Tech related resources are provided for developers and enthusiasts.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    category: "ui",
    tech: ["JavaScript", "HTML", "CSS"],
    liveUrl: "https://cloudxvault.vercel.app/"
  },
  {
    id: 8,
    title: "Window Activation Page",
    description: "A Website which provides 2 methods to activate your Windows operating system easily.",
    image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=600&h=400&fit=crop",
    category: "website",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://window-activate.vercel.app/"
  },
  {
    id: 9,
    title: "Portfolio Website",
    description: "A responsive portfolio website showcasing projects, skills, and professional information.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    category: "website",
    tech: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://pratikx.vercel.app/"
  }
];
