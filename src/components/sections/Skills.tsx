// components/Skills.tsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ────────────────────────────────────────────────
// Data – you can also move this to a separate file: data/skills.ts
// ────────────────────────────────────────────────
type Skill = {
  name: string;
  icon: string;
};

type SkillCategory = {
  title: string;
  skills: Skill[];
};

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Vite", icon: "vite" },
    ],
  },
  {
    title: "Backend & Tools",
    skills: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Git", icon: "git" },
      { name: "NPM", icon: "npm" },
      { name: "GitHub", icon: "github" },
    ],
  },
  {
    title: "Dev Tools & Others",
    skills: [
      { name: "VS Code", icon: "vscode" },
      { name: "Vercel", icon: "vercel" },
      { name: "Render", icon: "render" },
      { name: "Figma", icon: "figma" },
      { name: "Terminal", icon: "terminal" },
    ],
  },
];

// ────────────────────────────────────────────────
// Custom SVG Icons (only for ones without good FA brands or special styling)
// ────────────────────────────────────────────────
const CustomIcons: Record<string, JSX.Element> = {
  vite: (
    <svg viewBox="0 0 32 32" className="w-8 h-8">
      <defs>
        <linearGradient id="vite-a" x1="6%" y1="32.9%" x2="100%" y2="67.1%">
          <stop offset="0%" stopColor="#41D1FF" />
          <stop offset="100%" stopColor="#BD34FE" />
        </linearGradient>
        <linearGradient id="vite-b" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFBD4F" />
          <stop offset="100%" stopColor="#FF980E" />
        </linearGradient>
      </defs>
      <path fill="url(#vite-a)" d="M29.88 6.12 16.38 30.14a.75.75 0 0 1-1.32-.01L1.41 6.11a.75.75 0 0 1 .85-1.08l13.72 2.6a.75.75 0 0 0 .28 0l13.48-2.6a.75.75 0 0 1 .86 1.1z" />
      <path fill="url(#vite-b)" d="M22.27 1l-9.9 1.93a.38.38 0 0 0-.3.35l-.61 10.27a.38.38 0 0 0 .46.4l2.7-.53a.38.38 0 0 1 .44.44l-.8 3.96a.38.38 0 0 0 .47.44l1.67-.43a.38.38 0 0 1 .47.44l-1.27 6.2a.24.24 0 0 0 .44.18l.29-.45 5.78-11.55a.38.38 0 0 0-.4-.54l-2.77.45a.38.38 0 0 1-.42-.48l1.63-6.29z" />
    </svg>
  ),

  nextjs: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.251 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
    </svg>
  ),

  vercel: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M24 22.525H0l12-21.05 12 21.05z" />
    </svg>
  ),

  render: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="#46E3B7">
      <path d="M11.234 0a2.57 2.57 0 0 0-2.564 2.564v2.342a2.57 2.57 0 0 0 2.564 2.564h2.342a2.57 2.57 0 0 0 2.564-2.564V2.564A2.57 2.57 0 0 0 13.576 0h-2.342zM5.03 6.47a2.57 2.57 0 0 0-2.564 2.564v2.342a2.57 2.57 0 0 0 2.564 2.564h2.342a2.57 2.57 0 0 0 2.564-2.564V9.034a2.57 2.57 0 0 0-2.564-2.564H5.03zm12.61 0a2.57 2.57 0 0 0-2.564 2.564v2.342a2.57 2.57 0 0 0 2.564 2.564h2.342a2.57 2.57 0 0 0 2.564-2.564V9.034a2.57 2.57 0 0 0-2.564-2.564H17.64zM5.03 12.94a2.57 2.57 0 0 0-2.564 2.564v2.342a2.57 2.57 0 0 0 2.564 2.564h2.342a2.57 2.57 0 0 0 2.564-2.564v-2.342a2.57 2.57 0 0 0-2.564-2.564H5.03zm12.61 0a2.57 2.57 0 0 0-2.564 2.564v2.342a2.57 2.57 0 0 0 2.564 2.564h2.342a2.57 2.57 0 0 0 2.564-2.564v-2.342a2.57 2.57 0 0 0-2.564-2.564H17.64z" />
    </svg>
  ),
};

// ────────────────────────────────────────────────
// Icon → Tailwind class name mapping + colors
// ────────────────────────────────────────────────
const iconStyles: Record<string, { className: string; color: string }> = {
  html5: { className: "fab fa-html5", color: "#E34F26" },
  css3: { className: "fab fa-css3-alt", color: "#1572B6" },
  javascript: { className: "fab fa-js", color: "#F7DF1E" },
  typescript: { className: "fas fa-file-code", color: "#3178C6" }, // using file-code as fallback
  react: { className: "fab fa-react", color: "#61DAFB" },
  nodejs: { className: "fab fa-node-js", color: "#339933" },
  git: { className: "fab fa-git-alt", color: "#F05032" },
  npm: { className: "fab fa-npm", color: "#CB3837" },
  figma: { className: "fab fa-figma", color: "#F24E1E" },
  terminal: { className: "fas fa-terminal", color: "#FFFFFF" },
  github: { className: "fab fa-github", color: "#e0e0e0" },
  vscode: { className: "", color: "#007ACC" }, // custom svg
  vercel: { className: "", color: "#000000" },
  render: { className: "", color: "#46E3B7" },
  nextjs: { className: "", color: "#000000" },
  vite: { className: "", color: "#646CFF" },
};

function SkillIcon({ icon }: { icon: string }) {
  const style = iconStyles[icon];

  if (CustomIcons[icon]) {
    return <div className="text-[2rem]">{CustomIcons[icon]}</div>;
  }

  if (!style) {
    return <div className="text-3xl text-gray-400">?</div>;
  }

  if (style.className) {
    return (
      <i
        className={`${style.className} text-3xl transition-transform duration-300`}
        style={{ color: style.color }}
      />
    );
  }

  // fallback (shouldn't reach here)
  return <div className="w-12 h-12 bg-gray-700 rounded-xl" />;
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-20 md:py-32 bg-gradient-to-b from-gray-950 to-black" ref={ref}>
      {/* Make sure Font Awesome is included in your layout or index.html */}
      {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" /> */}

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 text-sm uppercase tracking-widest font-medium">
            My Skills
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            Technologies I Work With
          </h2>
        </motion.div>

        <div className="space-y-20">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: catIndex * 0.15 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-white/90 relative inline-block">
                {category.title}
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-0.5 w-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8 justify-items-center">
                {category.skills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 14,
                      delay: 0.2 + catIndex * 0.12 + idx * 0.06,
                    }}
                    whileHover={{
                      scale: 1.12,
                      y: -10,
                      transition: { type: "spring", stiffness: 400, damping: 12 },
                    }}
                    className="group"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className="relative w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-sm border border-gray-700/60 group-hover:border-indigo-500/40 transition-all duration-300 shadow-lg shadow-black/40"
                        style={{
                          boxShadow:
                            isInView && idx % 2 === 0
                              ? `0 0 35px ${iconStyles[skill.icon]?.color}20`
                              : undefined,
                        }}
                      >
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500"
                          style={{ backgroundColor: iconStyles[skill.icon]?.color }}
                        />
                        <SkillIcon icon={skill.icon} />
                      </div>

                      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
