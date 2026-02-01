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
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-label="TypeScript"
    role="img"
    viewBox="0 0 512 512"
    className="w-9 h-9 md:w-10 md:h-10 drop-shadow-sm"
  >
    <rect width="512" height="512" rx="15%" fill="#3178c6" />
    <path
      fill="#fff"
      d="m233 284h64v-41H118v41h64v183h51zm84 173c8.1 4.2 18 7.3 29 9.4s23 3.1 35 3.1c12 0 23-1.1 34-3.4c11-2.3 20-6.1 28-11c8.1-5.3 15-12 19-21s7.1-19 7.1-32c0-9.1-1.4-17-4.1-24s-6.6-13-12-18c-5.1-5.3-11-10-18-14s-15-8.2-24-12c-6.6-2.7-12-5.3-18-7.9c-5.2-2.6-9.7-5.2-13-7.8c-3.7-2.7-6.5-5.5-8.5-8.4c-2-3-3-6.3-3-10c0-3.4.89-6.5 2.7-9.3s4.3-5.1 7.5-7.1c3.2-2 7.2-3.5 12-4.6c4.7-1.1 9.9-1.6 16-1.6c4.2 0 8.6.31 13 .94c4.6.63 9.3 1.6 14 2.9c4.7 1.3 9.3 2.9 14 4.9c4.4 2 8.5 4.3 12 6.9v-47c-7.6-2.9-16-5.1-25-6.5s-19-2.1-31-2.1c-12 0-23 1.3-34 3.8s-20 6.5-28 12c-8.1 5.4-14 12-19 21c-4.7 8.4-7 18-7 30c0 15 4.3 28 13 38c8.6 11 22 19 39 27c6.9 2.8 13 5.6 19 8.3s11 5.5 15 8.4c4.3 2.9 7.7 6.1 10 9.5c2.5 3.4 3.8 7.4 3.8 12c0 3.2-.78 6.2-2.3 9s-3.9 5.2-7.1 7.2s-7.1 3.6-12 4.8c-4.7 1.1-10 1.7-17 1.7c-11 0-22-1.9-32-5.7c-11-3.8-21-9.5-28.1-15.44z"
    />
  </svg>
),

  // Tailwind CSS - official lightning style
  tailwind: (
  <svg
    viewBox="0 -51 256 256"
    className="w-9 h-9 md:w-10 md:h-10 drop-shadow-md"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    preserveAspectRatio="xMidYMid"
  >
    <defs>
      <linearGradient
        x1="-2.77777778%"
        y1="32%"
        x2="100%"
        y2="67.5555556%"
        id="tailwind-gradient"
      >
        <stop stopColor="#2298BD" offset="0%" />
        <stop stopColor="#0ED7B5" offset="100%" />
      </linearGradient>
    </defs>
    <g>
      <path
        d="M128,-1.0658141e-14 C93.8666667,-1.0658141e-14 72.5333333,17.0666667 64,51.2 C76.8,34.1333333 91.7333333,27.7333333 108.8,32 C118.537481,34.4343704 125.497363,41.4985481 133.201067,49.3184 C145.750756,62.0567704 160.275437,76.8 192,76.8 C226.133333,76.8 247.466667,59.7333333 256,25.6 C243.2,42.6666667 228.266667,49.0666667 211.2,44.8 C201.462519,42.3656296 194.502637,35.3014519 186.798933,27.4816 C174.249244,14.7432296 159.724563,-1.0658141e-14 128,-1.0658141e-14 Z M64,76.8 C29.8666667,76.8 8.53333333,93.8666667 0,128 C12.8,110.933333 27.7333333,104.533333 44.8,108.8 C54.5374815,111.23437 61.497363,118.298548 69.2010667,126.1184 C81.7507556,138.85677 96.275437,153.6 128,153.6 C162.133333,153.6 183.466667,136.533333 192,102.4 C179.2,119.466667 164.266667,125.866667 147.2,121.6 C137.462519,119.16563 130.502637,112.101452 122.798933,104.2816 C110.249244,91.5432296 95.724563,76.8 64,76.8 Z"
        fill="url(#tailwind-gradient)"
      />
    </g>
  </svg>
),

  // Node.js - official green hex
 'node-js': (
  <svg
    viewBox="-16.5 0 289 289"
    className="w-9 h-9 md:w-10 md:h-10 drop-shadow-md"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    preserveAspectRatio="xMidYMid"
  >
    <g>
      <path
        d="M127.999999,288.463771 C124.024844,288.463771 120.314699,287.403728 116.869564,285.548656 L81.6231884,264.612838 C76.32298,261.697724 78.9730854,260.637682 80.5631458,260.107661 C87.7184259,257.72257 89.0434775,257.192547 96.4637688,252.952381 C97.2587979,252.422361 98.3188405,252.687372 99.1138718,253.217392 L126.144927,269.383024 C127.20497,269.913045 128.530021,269.913045 129.325053,269.383024 L235.064182,208.165634 C236.124225,207.635611 236.654245,206.575571 236.654245,205.250519 L236.654245,83.0807467 C236.654245,81.7556929 236.124225,80.6956526 235.064182,80.1656324 L129.325053,19.2132506 C128.26501,18.6832305 126.939959,18.6832305 126.144927,19.2132506 L20.4057954,80.1656324 C19.3457551,80.6956526 18.8157349,82.0207041 18.8157349,83.0807467 L18.8157349,205.250519 C18.8157349,206.31056 19.3457551,207.635611 20.4057954,208.165634 L49.2919247,224.861286 C64.9275364,232.811595 74.7329196,223.536234 74.7329196,214.260871 L74.7329196,93.681159 C74.7329196,92.0910985 76.0579711,90.5010358 77.9130428,90.5010358 L91.4285716,90.5010358 C93.0186343,90.5010358 94.6086948,91.8260873 94.6086948,93.681159 L94.6086948,214.260871 C94.6086948,235.196689 83.2132512,247.387164 63.3374737,247.387164 C57.2422362,247.387164 52.4720502,247.387164 38.9565214,240.761906 L11.1304347,224.861286 C4.24016581,220.886129 5.68434189e-14,213.46584 5.68434189e-14,205.515528 L5.68434189e-14,83.3457557 C5.68434189e-14,75.3954465 4.24016581,67.9751552 11.1304347,64.0000006 L116.869564,2.78260752 C123.494824,-0.927535841 132.505176,-0.927535841 139.130436,2.78260752 L244.869565,64.0000006 C251.759834,67.9751552 256,75.3954465 256,83.3457557 L256,205.515528 C256,213.46584 251.759834,220.886129 244.869565,224.861286 L139.130436,286.078676 C135.685299,287.668739 131.710145,288.463771 127.999999,288.463771 L127.999999,288.463771 Z M160.596274,204.455488 C114.219461,204.455488 104.679089,183.254659 104.679089,165.233955 C104.679089,163.643893 106.004141,162.053832 107.859212,162.053832 L121.639752,162.053832 C123.229813,162.053832 124.554864,163.113872 124.554864,164.703935 C126.674947,178.749484 132.770187,185.639753 160.861283,185.639753 C183.122154,185.639753 192.662526,180.604556 192.662526,168.67909 C192.662526,161.788821 190.012423,156.753624 155.296065,153.308489 C126.409938,150.393375 108.389235,144.033126 108.389235,120.977226 C108.389235,99.5113875 126.409938,86.7908901 156.621119,86.7908901 C190.542443,86.7908901 207.238095,98.4513472 209.358178,123.89234 C209.358178,124.687371 209.093167,125.482403 208.563147,126.277434 C208.033127,126.807454 207.238095,127.337474 206.443064,127.337474 L192.662526,127.337474 C191.337475,127.337474 190.012423,126.277434 189.747412,124.952382 C186.567289,110.376813 178.351966,105.606625 156.621119,105.606625 C132.240165,105.606625 129.325053,114.086957 129.325053,120.447205 C129.325053,128.132506 132.770187,130.5176 165.631471,134.757766 C198.227744,138.997931 213.598344,145.093169 213.598344,167.884058 C213.333333,191.20497 194.252589,204.455488 160.596274,204.455488 L160.596274,204.455488 Z"
        fill="#539E43"
      />
    </g>
  </svg>
),

  express: (
  <svg
    viewBox="-2.5 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    className="w-9 h-9 md:w-10 md:h-10 drop-shadow-sm"
  >
    <g fill="none" fillRule="evenodd">
      {/* Background rectangle (optional - can be removed if you want pure text) */}
      {/* <path d="M-3 0h32v32H-3z" /> */}

      <path
        fill="#353535"  // dark gray/black — official-ish color
        d="M1.192 16.267c.04 2.065.288 3.982.745 5.75.456 1.767 1.16 3.307 2.115 4.618.953 1.31 2.185 2.343 3.694 3.098 1.51.755 3.357 1.132 5.54 1.132 3.22 0 5.89-.844 8.016-2.532 2.125-1.69 3.446-4.22 3.962-7.597h1.192c-.437 3.575-1.847 6.345-4.23 8.312-2.384 1.966-5.324 2.95-8.82 2.95-2.383.04-4.42-.338-6.107-1.133-1.69-.794-3.07-1.917-4.142-3.367-1.073-1.45-1.867-3.158-2.383-5.124C.258 20.408 0 18.294 0 16.028c0-2.542.377-4.806 1.132-6.792C1.887 7.25 2.88 5.57 4.112 4.2 5.34 2.83 6.77 1.79 8.4 1.074 10.03.358 11.698 0 13.406 0c2.383 0 4.44.457 6.167 1.37 1.728.914 3.138 2.126 4.23 3.635 1.093 1.51 1.887 3.238 2.384 5.184.496 1.945.705 3.97.625 6.077H1.193zm24.43-1.192c0-1.867-.26-3.645-.775-5.333-.516-1.688-1.28-3.168-2.294-4.44-1.013-1.27-2.274-2.273-3.784-3.008-1.51-.735-3.258-1.102-5.244-1.102-1.67 0-3.228.317-4.678.953-1.45.636-2.72 1.56-3.813 2.77-1.092 1.212-1.976 2.672-2.652 4.38-.675 1.708-1.072 3.635-1.19 5.78h24.43z"
      />
    </g>
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
  <svg
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-9 h-9 md:w-10 md:h-10 drop-shadow-sm"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 10.087 13.6902 12.3681 11.6975 13.7163L4.90687 4.20942C4.78053 4.03255 4.5544 3.95756 4.34741 4.02389C4.14042 4.09022 4 4.28268 4 4.50004V12H5V6.06027L10.8299 14.2221C9.82661 14.7201 8.696 15 7.5 15C3.35786 15 0 11.6421 0 7.5ZM10 10V4H11V10H10Z"
      fill="currentColor"  // uses currentColor so it adapts to theme / hover
    />
  </svg>
),

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
