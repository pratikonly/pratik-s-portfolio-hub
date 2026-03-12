import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border py-8">
      <div className="w-full md:w-[80%] mx-auto px-4">
        <div className="flex items-center justify-between">
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors hover-scale"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <p className="text-muted-foreground text-sm text-center">© 2024 Pratik. All Rights Reserved.</p>
          <div className="w-11" />
        </div>
      </div>
    </footer>
  );
}
