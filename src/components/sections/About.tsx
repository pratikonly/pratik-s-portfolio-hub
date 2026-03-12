import { useRef, useEffect, useState } from 'react';
import { personalInfo } from '@/data/skills';

interface CounterProps {
  target: number;
  suffix?: string;
}

function Counter({ target, suffix = '+' }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const stats = [
  { value: personalInfo.yearsExperience, label: 'Years Experience' },
  { value: personalInfo.projectsCompleted, label: 'Projects Completed' },
  { value: personalInfo.happyClients, label: 'Happy Clients' },
];

const infoItems = [
  { label: 'Name', value: personalInfo.name },
  { label: 'Email', value: personalInfo.email },
  { label: 'Location', value: personalInfo.location },
  { label: 'Freelance', value: personalInfo.freelance, isStatus: true },
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      
      <div className="w-full md:w-[80%] mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary text-sm uppercase tracking-widest font-medium">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2">
            Who I Am
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-6">
            {personalInfo.bio.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {infoItems.map((item) => (
                <div key={item.label} className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">{item.label}:</h4>
                  <p className={item.isStatus ? 'text-success font-medium' : 'font-medium'}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 text-center rounded-xl bg-card/50 backdrop-blur-sm border border-border"
              >
                <h3 className="text-4xl md:text-5xl font-heading font-bold gradient-text mb-2">
                  <Counter target={stat.value} />
                </h3>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
