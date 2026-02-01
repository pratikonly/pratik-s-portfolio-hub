// src/components/sections/Skills.tsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '@/data/skills';

// Only keeping truly custom / gradient icons
const CustomIcons: Record<string, JSX.Element> = {
  vite: (
    <svg viewBox="0 0 32 32" className="w-7 h-7">
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
      <path
        fill="url(#vite-a)"
        d="M29.88 6.12l-13.5 24.02a.75.75 0 01-1.32-.01L1.41 6.11a.75.75 0 01.85-1.08l13.72 2.6a.75.75 0 00.28 0l13.48-2.6a.75.75 0 01.86 1.1z"
      />
      <path
        fill="url(#vite-b)"
        d="M22.27 1l-9.9 1.93a.38.38 0 00-.3.35l-.61 10.27a.38.38 0 00.46.4l2.7-.53a.38.38 0 01.44.44l-.8 3.96a.38.38 0 00.47.44l1.67-.43a.38.38 0 01.47.44l-1.27 6.2a.24.24 0 00.44.18l.29-.45 5.78-11.55a.38.38 0 00-.4-.54l-2.77.45a.38.38 0 01-.42-.48l1.63-6.29"
      />
    </svg>
  ),
  nextjs: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.251 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
    </svg>
  ),
  vercel: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M24 22.525H0l12-21.05 12 21.05z" />
    </svg>
  ),
};

// New simple icons for TypeScript & Tailwind (you can replace with better SVGs later)
const SimpleIcons: Record<string, JSX.Element> = {
  typescript: (
    <svg viewBox="0 0 24 24" className="w-7 h-7">
      <path
        fill="#3178C6"
        d="M1.5 0h21a1.5 1.5 0 0 1 1.5 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0zm9.75 11.625v7.875h2.25v-7.875h-2.25zM12 4.5a1.875 1.875 0 1 0 0 3.75 1.875 1.875 0 0 0 0-3.75z"
      />
      <path
        fill="#fff"
        d="M9.75 11.625h2.25v7.875h-2.25zM12 4.5a1.875 1.875 0 1 1 0 3.75 1.875 1.875 0 0 1 0-3.75z"
      />
    </svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" className="w-7 h-7">
      <path
        fill="#38BDF8"
        d="M12 4.5c-3.75 0-6.75 2.25-7.875 6.75 1.5-2.25 3.75-3.375 6.75-3.375 3.75 0 5.625 2.625 7.875 2.625 3 0 5.25-2.625 6-6.75-1.5 2.25-3.75 3.375-6.75 3.375-3.75 0-5.625-2.625-7.875-2.625z"
      />
      <path
        fill="#0EA5E9"
        d="M4.125 11.25c1.5-2.25 3.75-3.375 6.75-3.375 3.75 0 5.625 2.625 7.875 2.625 3 0 5.25-2.625 6-6.75-1.5 2.25-3.75 3.375-6.75 3.375-3.75 0-5.625-2.625-7.875-2.625-3 0-5.25 2.625-6 6.75z"
      />
    </svg>
  ),
};

const iconMap: Record<string, string> = {
  html5: 'fab fa-html5',
  'css3-alt': 'fab fa-css3-alt',
  js: 'fab fa-js',
  'node-js': 'fab fa-node',
  'git-alt': 'fab fa-git-alt',
  npm: 'fab fa-npm',
  figma: 'fab fa-figma',
  terminal: 'fas fa-terminal',
  mobile: 'fas fa-mobile-alt',
  bolt: 'fas fa-bolt',
  github: 'fab fa-github',
};

const iconColors: Record<string, string> = {
  html5: '#E34F26',
  'css3-alt': '#1572B6',
  js: '#F7DF1E',
  typescript: '#3178C6',
  tailwind: '#38BDF8',
  vite: '#646CFF',
  'node-js': '#339933',
  nextjs: '#000000',
  'git-alt': '#F05032',
  npm: '#CB3837',
  figma: '#F24E1E',
  terminal: '#4D4D4D',
  mobile: '#3DDC84',
  bolt: '#FF6B6B',
  github: '#181717',
  vscode: '#007ACC',
  vercel: '#000000',
};

type SkillIconProps = {
  icon: string;
};

function SkillIcon({ icon }: SkillIconProps) {
  if (CustomIcons[icon]) {
    return CustomIcons[icon];
  }
  if (SimpleIcons[icon]) {
    return SimpleIcons[icon];
  }

  // fallback to Font Awesome
  const faClass = iconMap[icon];
  if (faClass) {
    return (
      <i
        className={`${faClass} text-3xl sm:text-4xl`}
        style={{ color: iconColors[icon] || '#ffffff' }}
      />
    );
  }

  // ultimate fallback
  return (
    <div className="text-3xl sm:text-4xl font-bold text-muted-foreground">
      {icon.slice(0, 2).toUpperCase()}
    </div>
  );
}

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-20 md:py-32" ref={ref}>
      {/* You can keep Font Awesome if you want to use the remaining icons */}
      {/* <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        crossOrigin="anonymous"
      /> */}

      <div className="w-full md:w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-widest font-medium">
            My Skills
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
            What I Know
          </h2>
        </motion.div>

        <div className="space-y-16 md:space-y-20">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + catIndex * 0.15 }}
            >
              <motion.h3
                className="text-xl md:text-2xl font-semibold mb-8 text-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + catIndex * 0.15 }}
              >
                <span className="relative inline-block">
                  {category.title}
                  <motion.span
                    className="absolute -bottom-2 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '100%' } : {}}
                    transition={{ duration: 0.8, delay: 0.4 + catIndex * 0.15 }}
                  />
                </span>
              </motion.h3>

              {/* Skills Grid */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0, rotate: -8 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                      delay: 0.3 + catIndex * 0.1 + index * 0.08,
                    }}
                    whileHover={{
                      scale: 1.12,
                      y: -8,
                      transition: { type: 'spring', stiffness: 400, damping: 12 },
                    }}
                    className="group cursor-default"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <motion.div
                        className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center bg-secondary/60 backdrop-blur-sm border border-border/40 group-hover:border-primary/60 transition-all duration-300"
                        whileHover={{
                          boxShadow: `0 0 30px ${iconColors[skill.icon] || '#ffffff'}30`,
                        }}
                      >
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-300 blur-xl"
                          style={{ backgroundColor: iconColors[skill.icon] }}
                        />
                        <SkillIcon icon={skill.icon} />
                      </motion.div>

                      <motion.span
                        className="text-sm md:text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                      >
                        {skill.name}
                      </motion.span>
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
