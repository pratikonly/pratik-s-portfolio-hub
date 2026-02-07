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
    <section id="about" className="py-20 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Video background with blur and fade */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Video element - Place your video at: public/videos/background.mp4 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/background.mp4"
        />
        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-lg" />
        {/* Dark fade overlay */}
        <div className="absolute inset-0 bg-background/85" />
        {/* Gradient edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>
      
      <div className="w-full md:w-[80%] mx-auto px-4 relative z-10">
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
                whileHover={{ scale: 1.05, y: -8 }}
                className="group relative p-6 text-center overflow-hidden rounded-xl bg-card border border-border"
              >
                {/* Animated wave background under the box */}
                <div className="absolute inset-0 -z-10">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent animate-pulse" />
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -bottom-4 left-0 right-0 h-8 bg-primary/10 rounded-full blur-md animate-float" style={{ animationDelay: `${index * 0.2}s` }} />
                  </div>
                </div>
                
                <h3 className="relative text-4xl md:text-5xl font-heading font-bold gradient-text mb-2">
                  <Counter target={stat.value} />
                </h3>
                <p className="relative text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
