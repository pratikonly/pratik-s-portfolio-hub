import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Users } from 'lucide-react';
import { useVisitorCount } from '@/hooks/useVisitorCount';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { count } = useVisitorCount();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const sectionId = href.replace('/#', '');
      if (location.pathname === '/') {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <motion.img
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                src="https://raw.githubusercontent.com/pratik11500/PratikPortfolio/refs/heads/replit-agent/assets/images/logo.png"
                alt="Logo"
                className="w-10 h-10 rounded-lg"
              />
            </Link>

            {/* Desktop Navigation - Centered Pill Style */}
            <nav className="hidden md:flex items-center">
              <div className="flex items-center gap-1 px-2 py-2 rounded-full bg-secondary/50 backdrop-blur-sm border border-border">
                {navLinks.map((link) => {
                  const sectionId = link.href.replace('/#', '');
                  const isActive = activeSection === sectionId;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith('/#')) {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }
                      }}
                      className={cn(
                        "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Visitor Counter - Desktop */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Visitors:</span>
              <span className="text-sm font-semibold text-foreground">
                {count.toLocaleString()}
              </span>
            </div>

            {/* Mobile: Visitor Counter + Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 border border-border">
                <Users className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold">{count.toLocaleString()}</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-foreground"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-background/95 backdrop-blur-lg border-b border-border md:hidden"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('/#', '');
                const isActive = activeSection === sectionId;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('/#')) {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }
                    }}
                    className={cn(
                      "text-lg py-3 px-4 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}