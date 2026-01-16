import { ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="w-full md:w-[80%] mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Scroll to top button - Left side */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>

          <p className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} Pratik. All Rights Reserved.
          </p>
          
          {/* Empty div for balance */}
          <div className="w-11" />
        </div>
      </div>
    </footer>
  );
}