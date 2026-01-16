import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import { cn } from '@/lib/utils';

type Category = 'all' | 'website' | 'app' | 'ui';

const filters: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'website', label: 'Websites' },
  { value: 'app', label: 'Web Apps' },
  { value: 'ui', label: 'UI Design' },
];

function ProjectCard({ project, index, isReversed }: { project: Project; index: number; isReversed?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isReversed ? 50 : -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      layout
      className={`group flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-6 lg:gap-8 p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300`}
    >
      {/* Image */}
      <div className="relative w-full lg:w-1/2 h-56 lg:h-64 overflow-hidden rounded-xl">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-60" />
        
        {/* Overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center"
        >
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors"
          >
            Live Demo <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Content */}
      <div className={`flex flex-col justify-center w-full lg:w-1/2 ${isReversed ? 'lg:text-right lg:items-end' : 'lg:text-left lg:items-start'}`}>
        <h3 className="text-2xl font-heading font-semibold mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {project.description}
        </p>
        
        {/* Tech Stack */}
        <div className={`flex flex-wrap gap-2 mb-4 ${isReversed ? 'lg:justify-end' : 'lg:justify-start'}`}>
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs bg-secondary rounded-full text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Link */}
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
        >
          View Project <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 md:py-32 bg-secondary/30" ref={ref}>
      <div className="w-full md:w-[80%] mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm uppercase tracking-widest font-medium">
            My Work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2">
            Recent Projects
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeFilter === filter.value
                  ? "bg-primary text-primary-foreground glow-effect"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects List - Alternating Layout */}
        <motion.div
          layout
          className="flex flex-col gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isReversed={index % 2 === 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
