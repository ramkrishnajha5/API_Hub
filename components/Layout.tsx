import React, { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { ApiDetailModal } from './ApiDetailModal';
import { Menu, X, Github, Mail, Zap, ArrowRight, Heart, Instagram, Star, Download, Search, ExternalLink } from '../constants';
import { fetchAllApis } from '../services/apiService';
import { APIEntry } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Navbar = ({ theme, toggleTheme }: { theme: 'light' | 'dark', toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<APIEntry[]>([]);
  const [allApis, setAllApis] = useState<APIEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const lastSearchLength = useRef(0);

  useEffect(() => {
    fetchAllApis().then(setAllApis);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    if (isOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const [showAllResults, setShowAllResults] = useState(false);
  const [allSearchResults, setAllSearchResults] = useState<APIEntry[]>([]);
  const [selectedSearchApi, setSelectedSearchApi] = useState<APIEntry | null>(null);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      const shouldUpdate = searchQuery.length === 3 ||
        Math.abs(searchQuery.length - lastSearchLength.current) >= 2;

      if (shouldUpdate) {
        setIsLoading(true);
        lastSearchLength.current = searchQuery.length;

        const query = searchQuery.toLowerCase();
        const results = allApis.filter(api =>
          api.API.toLowerCase().includes(query) ||
          api.Category.toLowerCase().includes(query) ||
          api.Description.toLowerCase().includes(query)
        );

        setAllSearchResults(results);
        setSearchResults(showAllResults ? results : results.slice(0, 10));
        setIsLoading(false);
      }
    } else {
      setSearchResults([]);
      setAllSearchResults([]);
      lastSearchLength.current = 0;
    }
  }, [searchQuery, allApis, showAllResults]);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    setAllSearchResults([]);
    setShowAllResults(false);
    setSelectedSearchApi(null);
  };

  const handleShowMore = () => {
    setShowAllResults(true);
    setSearchResults(allSearchResults);
  };

  const navLinks = [
    { href: '#/', label: 'Home', icon: <Zap className="w-5 h-5" /> },
    { href: '#/favorites', label: 'Favorites', icon: <Star className="w-5 h-5" /> },
    { href: '#/about', label: 'About', icon: <Heart className="w-5 h-5" /> },
    { href: '#/contact', label: 'Contact', icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    <>
      <nav
        className={`fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${scrolled 
          ? 'md:top-4 md:w-[92%] md:max-w-6xl md:rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-black/20 bg-white/95 dark:bg-black/80 backdrop-blur-2xl border border-slate-100/50 dark:border-white/10' 
          : 'md:top-6 md:w-[96%] md:max-w-7xl md:rounded-2xl bg-transparent border-transparent'}
        top-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 w-full
        py-3 px-4 md:px-6
        `}
      >
        <div className="flex justify-between items-center h-full">
          <a href="#/" className="flex items-center group relative z-10 pl-2">
            <img
              src="https://raw.githubusercontent.com/ramkrishnajha5/API_Hub/main/assets/logo_white.jpg"
              alt="API Hub"
              className="h-8 md:h-10 w-auto object-contain dark:hidden group-hover:scale-105 transition-transform duration-300"
            />
            <img
              src="https://raw.githubusercontent.com/ramkrishnajha5/API_Hub/main/assets/logo_black.jpg"
              alt="API Hub"
              className="h-8 md:h-10 w-auto object-contain hidden dark:block group-hover:scale-105 transition-transform duration-300"
            />
          </a>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1 bg-white dark:bg-white/5 p-1 rounded-full border border-slate-100 dark:border-white/5 shadow-sm">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-5 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/10 rounded-full transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <button
              onClick={handleSearchClick}
              className="hidden lg:flex items-center gap-3 px-4 py-2.5 bg-white dark:bg-white/5 border border-slate-200/60 dark:border-white/5 rounded-full text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-md transition-all group w-64"
            >
              <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              <span className="text-sm font-medium">Search APIs...</span>
              <div className="ml-auto flex items-center gap-1 px-1.5 py-0.5 rounded-md border border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-white/5">
                <span className="text-[10px] font-bold">⌘</span>
                <span className="text-[10px] font-bold">K</span>
              </div>
            </button>

            <div className="pl-2 border-l border-slate-200 dark:border-white/10">
               <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={handleSearchClick}
              className="w-10 h-10 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/10 transition-all border border-slate-200/50 dark:border-white/5 shadow-sm"
            >
              <Search className="w-4 h-4" />
            </button>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                isOpen
                ? 'bg-slate-900 dark:bg-white text-white dark:text-black rotate-90'
                : 'bg-white dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200/50 dark:border-white/5 shadow-sm'
              }`}
            >
              <div className="flex flex-col gap-[5px] items-center justify-center">
                <span className={`w-5 h-0.5 rounded-full transition-all duration-300 ${isOpen ? 'bg-current rotate-45 translate-y-[3.5px]' : 'bg-current'}`} />
                <span className={`w-5 h-0.5 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : 'bg-current opacity-100'}`} />
                <span className={`w-5 h-0.5 rounded-full transition-all duration-300 ${isOpen ? 'bg-current -rotate-45 -translate-y-[3.5px]' : 'bg-current'}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[60] transition-all duration-300 flex items-start justify-center pt-4 md:pt-32 px-4 ${isSearchOpen ? 'visible' : 'invisible'}`}
      >
        <div
          className={`absolute inset-0 bg-white/90 dark:bg-black/90 backdrop-blur-md transition-opacity duration-300 ${isSearchOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeSearch}
        />

        <div 
          className={`relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden transform transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${
            isSearchOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 -translate-y-8'
          }`}
        >
          <div className="relative flex items-center px-6 py-2 border-b border-slate-100 dark:border-white/5">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for APIs, categories, or descriptions..."
              className="w-full px-4 py-5 bg-transparent border-0 text-lg font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-0"
            />
            {isLoading && (
              <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            )}
          </div>

          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar bg-slate-50/30 dark:bg-black/20">
            {searchQuery.length > 0 && searchQuery.length < 3 && (
               <div className="p-12 text-center">
                 <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                   Type at least 3 characters...
                 </p>
               </div>
            )}

            {searchResults.length > 0 && (
              <div className="p-3 space-y-2">
                {searchResults.map((api, index) => (
                  <div
                    key={`${api.API}-${index}`}
                    className="flex items-center justify-between p-4 bg-white dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 cursor-pointer group transition-all duration-300"
                    onClick={() => setSelectedSearchApi(api)}
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-3 mb-1.5">
                        <h4 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {api.API}
                        </h4>
                        <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 rounded-full">
                          {api.Category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate font-medium">
                        {api.Description}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                       <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}

                {!showAllResults && allSearchResults.length > 10 && (
                  <button
                    onClick={handleShowMore}
                    className="w-full mt-2 py-4 text-sm font-bold text-slate-600 dark:text-white bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/10 rounded-2xl transition-all"
                  >
                    Show {allSearchResults.length - 10} more results
                  </button>
                )}
              </div>
            )}

            {searchQuery.length >= 3 && searchResults.length === 0 && !isLoading && (
              <div className="py-20 text-center">
                <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                   <Search className="w-7 h-7" />
                </div>
                <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1">No results found</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Try adjusting your search terms
                </p>
              </div>
            )}
            
            {searchQuery === '' && (
              <div className="py-12 px-8">
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Popular Tags</div>
                 <div className="flex flex-wrap gap-2.5">
                    {['Weather', 'Finance', 'Social', 'Development', 'Music', 'Science', 'Security'].map(tag => (
                       <button 
                         key={tag}
                         onClick={() => setSearchQuery(tag)}
                         className="px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-sm font-semibold text-slate-600 dark:text-slate-300 hover:border-blue-500 hover:text-blue-500 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all shadow-sm hover:shadow-md"
                       >
                         {tag}
                       </button>
                    ))}
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ApiDetailModal
        api={selectedSearchApi}
        isOpen={!!selectedSearchApi}
        onClose={() => setSelectedSearchApi(null)}
        isMobile={window.innerWidth < 768}
      />

      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500 ${isOpen ? 'visible' : 'invisible'}`}
      >
        <div
          className={`absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-xl transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 h-full w-full bg-white dark:bg-slate-900 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
        >
          <div className="flex flex-col h-full pt-28 px-6 pb-12">
            <nav className="flex-1 space-y-3">
              {navLinks.map((link, idx) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-4 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 active:scale-[0.98] transition-all group"
                  style={{
                    transitionDelay: isOpen ? `${idx * 75}ms` : '0ms',
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateY(0)' : 'translateY(-20px)'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-black/20 flex items-center justify-center text-slate-900 dark:text-white shadow-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {link.icon}
                    </div>
                    <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{link.label}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white transition-all text-slate-400">
                     <ArrowRight className="w-5 h-5" />
                  </div>
                </a>
              ))}
            </nav>

            <div 
               className="mt-auto space-y-6"
               style={{
                  transitionDelay: isOpen ? '300ms' : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                  transitionProperty: 'all',
                  transitionDuration: '500ms'
               }}
            >
              <div className="flex justify-between items-center px-2">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Follow Us</span>
                <div className="flex gap-4">
                  {[
                    { icon: <Github className="w-5 h-5"/>, href: "https://github.com/ramkrishnajha5" },
                    { icon: <Instagram className="w-5 h-5"/>, href: "https://instagram.com/ramkrishnajha5" },
                    { icon: <Mail className="w-5 h-5"/>, href: "mailto:ram03krishna@gmail.com" }
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:scale-110 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              <a
                href="https://github.com/ramkrishnajha5/API_Hub/releases/download/v1.0.0/API_Hub.apk"
                download
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg rounded-3xl shadow-xl shadow-slate-900/10 active:scale-95 transition-all"
              >
                <Download className="w-5 h-5" />
                Download App
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
          <div className="lg:col-span-2">
            <a href="#/" className="flex items-center mb-6">
              <img
                src="https://raw.githubusercontent.com/ramkrishnajha5/API_Hub/main/assets/logo_white.jpg"
                alt="API Hub"
                className="h-12 lg:h-14 w-auto object-contain dark:hidden"
              />
              <img
                src="https://raw.githubusercontent.com/ramkrishnajha5/API_Hub/main/assets/logo_black.jpg"
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