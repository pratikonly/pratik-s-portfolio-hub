import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { personalInfo } from '@/data/skills';

interface CounterProps {
  target: number;
  suffix?: string;
}

function Counter({ target, suffix = '+' }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
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

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-widest font-medium">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mt-2">
            Who I Am
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {personalInfo.bio.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {infoItems.map((item) => (
                <div key={item.label} className="space-y-1">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    {item.label}:
                  </h4>
                  <p className={item.isStatus ? 'text-success font-medium' : 'font-medium'}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="gradient-border p-6 text-center"
              >
                <h3 className="text-4xl md:text-5xl font-heading font-bold gradient-text mb-2">
                  <Counter target={stat.value} />
                </h3>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
