// src/components/sections/Skills.tsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '@/data/skills';

// Better / more official-looking custom brand icons
const BrandIcons: Record<string, JSX.Element> = {
  // Vite (gradient - already good)
  vite: (
    <svg viewBox="0 0 32 32" className="w-8 h-8 md:w-9 md:h-9">
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

  // TypeScript - official blue square with TS
  typescript: (
    <svg viewBox="0 0 256 256" className="w-8 h-8 md:w-9 md:h-9">
      <rect width="256" height="256" fill="#3178C6" rx="60" ry="60" />
      <path
        fill="#FFFFFF"
        d="M188.083 192H167.96l-10.667-32H97.707l-10.667 32H67.917L128 21.333 188.083 192zM127.947 63.04l-28.16 84.48h56.32l-28.16-84.48z"
      />
    </svg>
  ),

  // Tailwind CSS - official lightning style
  tailwind: (
    <svg viewBox="0 0 512 313" className="w-8 h-8 md:w-9 md:h-9">
      <path
        fill="#06B6D4"
        d="M512 0L384 128 256 0 128 128 0 0l128 128L0 256l128-128 128 128 128-128L512 0zM384 128l-128 128-128-128 128-128 128 128z"
      />
      <path
        fill="#38BDF8"
        d="M256 64l-64 64 64 64 64-64-64-64z"
      />
    </svg>
  ),

  // Node.js - official green hex
  'node-js': (
    <svg viewBox="0 0 48 48" className="w-8 h-8 md:w-9 md:h-9">
      <path
        fill="#393E41"
        d="M24 1.5l20.5 11.8v23.6L24 46.5 3.5 36.9V13.3z"
      />
      <path
        fill="#8CC84B"
        d="M24 1.5v43l-20.5-11.8V13.3z"
      />
      <path
        fill="#FFFFFF"
        d="M24 9.5c-7.7 0-14 6.3-14 14s6.3 14 14 14 14-6.3 14-14-6.3-14-14-14zm0 24c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10z"
      />
    </svg>
  ),

  // Vercel - triangle (official mark, uses currentColor so flexible)
  vercel: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-9 md:h-9" fill="currentColor">
      <path d="M24 22.525H0l12-21.05 12 21.05z" />
    </svg>
  ),

  // GitHub - white octocat on black background (inverted style)
  github: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-9 md:h-9">
      <rect width="24" height="24" fill="#000000" rx="4" />
      <path
        fill="#FFFFFF"
        d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.026 1.592 1.026 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.854 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.478-10-10-10z"
      />
    </svg>
  ),

  // Next.js - kept your existing one (it's already decent)
  nextjs: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-9 md:h-9" fill="currentColor">
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.251 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
    </svg>
  ),
};

// VS Code - your existing one is fine (official-ish blue)
const vscodeIcon = (
  <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-9 md:h-9" fill="#007ACC">
    <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
  </svg>
);

const iconMap: Record<string, string> = {
  html5: 'fab fa-html5',
  'css3-alt': 'fab fa-css3-alt',
  js: 'fab fa-js',
  'git-alt': 'fab fa-git-alt',
  npm: 'fab fa-npm',
  figma: 'fab fa-figma',
  terminal: 'fas fa-terminal',
  mobile: 'fas fa-mobile-alt',
  bolt: 'fas fa-bolt',
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
  github: '#000000',       // background reference
  vscode: '#007ACC',
  vercel: '#000000',
};

type SkillIconProps = {
  icon: string;
};

function SkillIcon({ icon }: SkillIconProps) {
  if (BrandIcons[icon]) {
    return BrandIcons[icon];
  }
  if (icon === 'vscode') {
    return vscodeIcon;
  }

  const faClass = iconMap[icon];
  if (faClass) {
    return (
      <i
        className={`${faClass} text-3xl sm:text-4xl`}
        style={{ color: iconColors[icon] || 'currentColor' }}
      />
    );
  }

  // Fallback
  return <div className="text-3xl font-bold text-muted-foreground">{icon.slice(0,2)}</div>;
}

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-20 md:py-32" ref={ref}>
      {/* Keep Font Awesome if using any FA icons; otherwise remove */}
      {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" /> */}

      <div className="w-full md:w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
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
                    className="absolute -bottom-2 left-0 h-0.5 bg-primary w-0 animate-[expand_0.8s_ease-out_forwards]"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '100%' } : {}}
                    transition={{ duration: 0.8, delay: 0.4 + catIndex * 0.15 }}
                  />
                </span>
              </motion.h3>

              <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0, rotate: -8 }}
                    animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                    transition={{
                      type: 'spring',
                      stiffness: 180,
                      damping: 14,
                      delay: 0.25 + catIndex * 0.12 + index * 0.07,
                    }}
                    whileHover={{
                      scale: 1.14,
                      y: -10,
                      transition: { type: 'spring', stiffness: 350, damping: 12 },
                    }}
                    className="group cursor-default"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <motion.div
                        className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center bg-secondary/70 backdrop-blur-md border border-border/50 group-hover:border-primary/70 shadow-sm group-hover:shadow-xl transition-all duration-300 overflow-hidden"
                        whileHover={{
                          boxShadow: `0 0 35px ${iconColors[skill.icon] || '#ffffff'}35`,
                        }}
                      >
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-400 blur-2xl"
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
