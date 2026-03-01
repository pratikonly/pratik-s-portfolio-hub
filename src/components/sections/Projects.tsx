import { useState } from 'react';
import { ExternalLink, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useProjects, type Project } from '@/hooks/useProjects';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

type Category = 'all' | 'website' | 'app' | 'ui';

const filters: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'website', label: 'Websites' },
  { value: 'app', label: 'Web Apps' },
  { value: 'ui', label: 'UI Design' },
];

const INITIAL_VISIBLE_COUNT = 9;

function ProjectCard({ project }: { project: Project }) {
  const isComingSoon = project.coming_soon;

  return (
    <div className={cn("group gradient-border overflow-hidden", isComingSoon && "opacity-90")}>
      <div className="relative h-40 overflow-hidden bg-secondary">
        <img
          src={project.image_url || '/placeholder.svg'}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-40" />
        {isComingSoon && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-primary/90 text-primary-foreground rounded-full text-xs font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" /> Coming Soon
          </div>
        )}
        {!isComingSoon && (
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors">
              Live Demo <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
      <div className="p-6 bg-card">
        <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span key={tech} className="px-3 py-1 text-xs bg-secondary rounded-full text-muted-foreground">{tech}</span>
          ))}
        </div>
        {isComingSoon ? (
          <span className="inline-flex items-center gap-2 text-muted-foreground text-sm font-medium"><Clock className="w-4 h-4" /> In Development</span>
        ) : (
          <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:underline text-sm font-medium">
            View Project <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectSkeleton() {
  return (
    <div className="gradient-border overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-6 bg-card space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [showAll, setShowAll] = useState(false);
  const { data: projects, isLoading } = useProjects();

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects?.filter((p) => p.category === activeFilter);

  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects?.slice(0, INITIAL_VISIBLE_COUNT);

  const hasMoreProjects = (filteredProjects?.length || 0) > INITIAL_VISIBLE_COUNT;

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
        <div className="absolute top-1/3 left-1/6 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/3 right-1/6 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="w-full md:w-[80%] mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="text-primary text-sm uppercase tracking-widest font-medium">My Work</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2">Recent Projects</h2>
          <p className="text-muted-foreground mt-3">{projects?.length || 0} Projects</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => { setActiveFilter(filter.value); setShowAll(false); }}
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
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <>{Array.from({ length: 6 }).map((_, i) => <ProjectSkeleton key={i} />)}</>
          ) : (
            visibleProjects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </div>

        {hasMoreProjects && !isLoading && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all duration-300 glow-effect"
            >
              {showAll ? (
                <>Show Less <ChevronUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" /></>
              ) : (
                <>See More Projects <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-1" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
