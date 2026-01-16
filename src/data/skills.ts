export interface Skill {
  name: string;
  icon: string;
  percent: number;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    skills: [
      { name: "HTML5", icon: "html5", percent: 95 },
      { name: "CSS3", icon: "css3-alt", percent: 90 },
      { name: "JavaScript", icon: "js", percent: 85 },
      { name: "React", icon: "react", percent: 80 },
      { name: "Sass", icon: "sass", percent: 85 },
      { name: "Bootstrap", icon: "bootstrap", percent: 90 },
    ]
  },
  {
    title: "Tools & Technologies",
    skills: [
      { name: "Git", icon: "git-alt", percent: 85 },
      { name: "NPM", icon: "npm", percent: 80 },
      { name: "Figma", icon: "figma", percent: 75 },
      { name: "Command Line", icon: "terminal", percent: 70 },
      { name: "Responsive Design", icon: "mobile", percent: 95 },
      { name: "Performance", icon: "bolt", percent: 85 },
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
