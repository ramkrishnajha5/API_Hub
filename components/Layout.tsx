
import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, Github, Mail, Zap, ArrowRight, Heart, Instagram, Star, Download } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

const Navbar = ({ theme, toggleTheme }: { theme: 'light' | 'dark', toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const navLinks = [
    { href: '#/', label: 'Home', icon: <Zap className="w-5 h-5" /> },
    { href: '#/favorites', label: 'Favorites', icon: <Star className="w-5 h-5" /> },
    { href: '#/about', label: 'About', icon: <Heart className="w-5 h-5" /> },
    { href: '#/contact', label: 'Contact', icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white dark:bg-black ${scrolled
        ? 'border-b border-slate-200/50 dark:border-white/10 py-3'
        : 'py-5'
        }`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="#/" className="flex items-center group z-50">
              {/* Light mode logo (white) */}
              <img
                src="/assets/logo_white.jpg"
                alt="API Hub"
                className="h-10 md:h-12 lg:h-14 w-auto object-contain dark:hidden group-hover:scale-105 transition-transform"
              />
              {/* Dark mode logo (black) */}
              <img
                src="/assets/logo_black.jpg"
                alt="API Hub"
                className="h-10 md:h-12 lg:h-14 w-auto object-contain hidden dark:block group-hover:scale-105 transition-transform"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="h-6 w-px bg-slate-200 dark:bg-white/10" />

              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>

            {/* Mobile Navigation Toggle */}
            <div className="md:hidden flex items-center gap-2 z-50">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`md:hidden relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isOpen
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20'
                  }`}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                <div className="relative w-5 h-5">
                  <span className={`absolute left-0 w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'top-2.5 rotate-45' : 'top-1'
                    }`} />
                  <span className={`absolute left-0 top-2.5 w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-2' : 'opacity-100'
                    }`} />
                  <span className={`absolute left-0 w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'top-2.5 -rotate-45' : 'top-4'
                    }`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ${isOpen ? 'visible' : 'invisible'
          }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="flex flex-col h-full pt-24 pb-8 px-6">
            {/* Navigation Links */}
            <nav className="flex-1 space-y-2">
              {navLinks.map((link, idx) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-all group"
                  style={{
                    transitionDelay: isOpen ? `${idx * 50}ms` : '0ms',
                    transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all">
                    {link.icon}
                  </div>
                  <span className="text-lg font-bold">{link.label}</span>
                  <ArrowRight className="w-5 h-5 ml-auto text-slate-300 dark:text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </nav>

            {/* Social Links */}
            <div className="pt-6 border-t border-slate-100 dark:border-white/10">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Connect</p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/ramkrishnajha5"
                  target="_blank"
                  className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/ramkrishnajha5"
                  target="_blank"
                  className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="mailto:ram03krishna@gmail.com"
                  className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-blue-500 hover:text-white transition-all"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Download Android App Button */}
            <div className="pt-6">
              <a
                href="https://github.com/ramkrishnajha5/API_Hub/releases/download/v1.0.0/API_Hub.apk"
                download
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
              >
                <Download className="w-5 h-5" />
                Get Android App
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Footer = () => {
  const footerLinks = {
    navigation: [
      { label: 'API Explorer', href: '#/' },
      { label: 'Favorites', href: '#/favorites' },
      { label: 'About Us', href: '#/about' },
      { label: 'Contact', href: '#/contact' },
    ],
    resources: [
      { label: 'API Standards', href: '#' },
      { label: 'Documentation', href: '#' },
      { label: 'Getting Started', href: '#' },
    ],
  };

  return (
    <footer className="bg-white dark:bg-black border-t border-slate-100 dark:border-white/5 pt-16 md:pt-24 pb-8 md:pb-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#/" className="flex items-center mb-6">
              {/* Light mode logo (white) */}
              <img
                src="/assets/logo_white.jpg"
                alt="API Hub"
                className="h-12 lg:h-14 w-auto object-contain dark:hidden"
              />
              {/* Dark mode logo (black) */}
              <img
                src="/assets/logo_black.jpg"
                alt="API Hub"
                className="h-12 lg:h-14 w-auto object-contain hidden dark:block"
              />
            </a>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mb-6">
              A developer-first registry of high-quality, free, and public APIs. Built to accelerate innovation worldwide.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/ramkrishnajha5"
                target="_blank"
                className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:border-blue-200 dark:hover:text-blue-400 dark:hover:border-blue-500/30 flex items-center justify-center transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/ramkrishnajha5"
                target="_blank"
                className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-pink-600 hover:border-pink-200 dark:hover:text-pink-400 dark:hover:border-pink-500/30 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:ram03krishna@gmail.com"
                className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:border-blue-200 dark:hover:text-blue-400 dark:hover:border-blue-500/30 flex items-center justify-center transition-all"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-5">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-500 dark:text-slate-400 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resource Links */}
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-5">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-500 dark:text-slate-400 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-5">Status</h4>
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">ALL SYSTEMS OPERATIONAL</span>
              </div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Last updated: December 2025
              </p>
            </div>
          </div>
        </div>

        {/* Attribution Section */}
        <div className="pt-8 border-t border-slate-100 dark:border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium text-center md:text-left">
              © 2025 API HUB — Designed & Developed by{' '}
              <a href="https://github.com/ramkrishnajha5" target="_blank" className="text-blue-600 hover:underline font-semibold">
                Ram Krishna
              </a>
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-rose-500 fill-current animate-heart" />
              <span>for developers worldwide</span>
            </div>
          </div>
          {/* Attribution to public-apis */}
          <p className="text-center text-xs text-slate-400 dark:text-slate-500">
            API data inspired by{' '}
            <a
              href="https://github.com/public-apis/public-apis"
              target="_blank"
              className="text-blue-500 hover:underline"
            >
              public-apis/public-apis
            </a>
            {' '}— A collective list of free APIs for use in software and web development.
          </p>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved as 'light' | 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
