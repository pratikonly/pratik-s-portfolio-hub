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
  'git-alt': 'fab fa-git-alt',
  'npm': 'fab fa-npm',
  'figma': 'fab fa-figma',
  'terminal': 'fas fa-terminal',
  'mobile': 'fas fa-mobile-alt',
  'bolt': 'fas fa-bolt',
};

function SkillProgress({ percent, delay }: { percent: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="w-full h-2 bg-secondary rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${percent}%` } : {}}
        transition={{ duration: 1, delay, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: 'var(--gradient-primary)' }}
      />
    </div>
  );
}

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

        <div className="grid md:grid-cols-2 gap-12">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: catIndex === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + catIndex * 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-heading font-semibold mb-6">
                {category.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="gradient-border p-4 group hover:glow-effect transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <i className={`${iconMap[skill.icon]} text-primary text-lg`} />
                      </div>
                      <h4 className="font-medium">{skill.name}</h4>
                    </div>
                    <SkillProgress 
                      percent={skill.percent} 
                      delay={0.4 + index * 0.1} 
                    />
                    <div className="flex justify-end mt-1">
                      <span className="text-xs text-muted-foreground">{skill.percent}%</span>
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
