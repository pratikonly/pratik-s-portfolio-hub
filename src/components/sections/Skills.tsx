import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '@/data/skills';

// Font Awesome brand icons mapping
const iconMap: Record<string, string> = {
  'html5': 'fab fa-html5',
  'css3-alt': 'fab fa-css3-alt',
  'js': 'fab fa-js',
  'react': 'fab fa-react',
  'sass': 'fab fa-sass',
  'bootstrap': 'fab fa-bootstrap',
  'vite': 'fas fa-bolt',
  'node-js': 'fab fa-node-js',
  'nestjs': 'fas fa-feather-alt',
  'git-alt': 'fab fa-git-alt',
  'npm': 'fab fa-npm',
  'figma': 'fab fa-figma',
  'terminal': 'fas fa-terminal',
  'mobile': 'fas fa-mobile-alt',
  'bolt': 'fas fa-tachometer-alt',
};

// Custom colors for each skill icon
const iconColors: Record<string, string> = {
  'html5': '#E34F26',
  'css3-alt': '#1572B6',
  'js': '#F7DF1E',
  'react': '#61DAFB',
  'sass': '#CC6699',
  'bootstrap': '#7952B3',
  'vite': '#646CFF',
  'node-js': '#339933',
  'nestjs': '#E0234E',
  'git-alt': '#F05032',
  'npm': '#CB3837',
  'figma': '#F24E1E',
  'terminal': '#4D4D4D',
  'mobile': '#3DDC84',
  'bolt': '#FF6B6B',
};

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 md:py-32" ref={ref}>
      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      
      <div className="w-full md:w-[80%] mx-auto px-4">
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2">
            What I Know
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + catIndex * 0.1 }}
              className="gradient-border p-6 rounded-xl"
            >
              <h3 className="text-lg font-heading font-semibold mb-6 text-center">
                {category.title}
              </h3>

              <div className="flex flex-wrap justify-center gap-4">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + catIndex * 0.1 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 min-w-[80px] cursor-default"
                  >
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                      style={{ 
                        backgroundColor: `${iconColors[skill.icon]}15`,
                      }}
                    >
                      <i 
                        className={iconMap[skill.icon]} 
                        style={{ color: iconColors[skill.icon] }}
                      />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground text-center">
                      {skill.name}
                    </span>
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
