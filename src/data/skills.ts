export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    skills: [
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3-alt" },
      { name: "JavaScript", icon: "js" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Vite", icon: "vite" },
    ],
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", icon: "node-js" },
      { name: "Express", icon: "express" }, 
      { name: "Next.js", icon: "nextjs" },
    ],
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Git", icon: "git-alt" },
      { name: "NPM", icon: "npm" },
      { name: "Figma", icon: "figma" },
      { name: "Command Line", icon: "terminal" },
    ],
  },
  {
    title: "Other Skills",
    skills: [
      { name: "Responsive Design", icon: "responsive" },
      { name: "GitHub", icon: "github" },
      { name: "VS Code", icon: "vscode" },
      { name: "Vercel", icon: "vercel" },
      { name: "Render", icon: "render" },
    ]
  }
];

export const personalInfo = {
  name: "Pratik",
  role: "Programmer",
  email: "pratikxdev@outlook.com",
  location: "Delhi, India",
  freelance: "Available",
  github: "https://github.com/pratik11500",
  discord: "https://discord.gg/BCEyMGKvxz",
  yearsExperience: 2,
  projectsCompleted: 15,
  happyClients: 1,
  bio: [
    "I'm a passionate Front-End Developer with a strong foundation in HTML, CSS, and JavaScript. I specialize in creating responsive, user-friendly web experiences that combine aesthetics with functionality.",
    "With a keen eye for design and a problem-solving mindset, I transform concepts into responsive, accessible, and performant web applications. I'm constantly learning and exploring new technologies to enhance my skillset.",
    "When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or simply enjoying a good book with a cup of coffee."
  ]
};
