
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { fetchAllApis } from '../services/apiService';
import { APIEntry } from '../types';
import { ApiCard } from '../components/ApiCard';
import { ApiDetailModal } from '../components/ApiDetailModal';
import { Search, ChevronDown, CATEGORY_ICONS, DEFAULT_ICON, LayoutGrid, Zap, TrendingUp, Globe2 } from '../constants';

// Animated Counter Component
const AnimatedCounter: React.FC<{ end: number; duration?: number }> = ({ end, duration = 2500 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const prevEnd = useRef(0);

  useEffect(() => {
    // Reset if end value changed significantly (data loaded)
    if (end !== prevEnd.current && end > 0) {
      prevEnd.current = end;
      hasAnimated.current = false;
    }

    // Don't observe until we have actual data
    if (end === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current && end > 0) {
          hasAnimated.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          animate();
        }
      },
      { threshold: 0.3 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={countRef}>{count.toLocaleString()}</span>;
};

export const HomePage: React.FC = () => {
  const [apis, setApis] = useState<APIEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAuthOnly, setShowAuthOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'category'>('name');
  const [selectedApi, setSelectedApi] = useState<APIEntry | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchAllApis();
      setApis(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    apis.forEach(api => {
      counts[api.Category] = (counts[api.Category] || 0) + 1;
    });
    const sorted = Object.keys(counts).sort().map(name => ({ name, count: counts[name] }));
    return [{ name: 'All', count: apis.length }, ...sorted];
  }, [apis]);

  const filteredApis = useMemo(() => {
    let filtered = apis.filter(api => {
      const matchesCategory = selectedCategory === 'All' || api.Category === selectedCategory;
      const matchesAuth = !showAuthOnly || (api.Auth !== "");
      return matchesCategory && matchesAuth;
    });

    if (sortBy === 'name') {
      filtered.sort((a, b) => a.API.localeCompare(b.API));
    } else {
      filtered.sort((a, b) => a.Category.localeCompare(b.Category));
    }

    return filtered;
  }, [apis, selectedCategory, showAuthOnly, sortBy]);

  const stats = useMemo(() => ({
    total: apis.length,
    categories: categories.length - 1,
    free: apis.filter(a => a.Auth === '').length,
    https: apis.filter(a => a.HTTPS).length
  }), [apis, categories]);

  const handleApiClick = (api: APIEntry) => {
    setSelectedApi(api);
  };

  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white dark:from-black dark:via-[#0a0f1a] dark:to-black min-h-screen">
      {/* API Detail Modal */}
      <ApiDetailModal
        api={selectedApi}
        isOpen={!!selectedApi}
        onClose={() => setSelectedApi(null)}
        isMobile={isMobile}
      />

      {/* Premium Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 px-4 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-blue-500/20 via-cyan-400/15 to-transparent blur-[100px] rounded-full animate-float" />
          <div className="absolute top-[10%] right-[-15%] w-[50%] h-[50%] bg-gradient-to-bl from-purple-500/15 via-pink-400/10 to-transparent blur-[100px] rounded-full animate-float" style={{ animationDelay: '-3s' }} />
          <div className="absolute bottom-[-20%] left-[30%] w-[40%] h-[40%] bg-gradient-to-t from-emerald-500/10 via-teal-400/10 to-transparent blur-[80px] rounded-full animate-float" style={{ animationDelay: '-5s' }} />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50 dark:opacity-30" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.05] hero-title">
            The Global
            <span className="block text-gradient bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent animate-gradient bg-300%">
              API Registry
            </span>
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed font-medium px-4">
            The most comprehensive catalog of public APIs. Curated, organized, and ready for your next breakthrough project.
          </p>

          {/* Search Button - Opens Navbar Search */}
          <button
            onClick={() => {
              // Trigger the navbar search by dispatching a custom event
              window.dispatchEvent(new CustomEvent('openSearch'));
            }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 rounded-xl text-slate-500 dark:text-slate-400 hover:border-blue-300 dark:hover:border-blue-500/30 hover:text-blue-500 transition-all shadow-lg shadow-slate-200/50 dark:shadow-black/30 mb-10"
          >
            <Search className="w-5 h-5" />
            <span className="font-medium">Search APIs</span>
          </button>

          {/* Stats - Grid layout for mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 px-4 max-w-2xl mx-auto">
            {[
              { label: 'APIs', value: stats.total, icon: <Globe2 className="w-4 h-4" /> },
              { label: 'Categories', value: stats.categories, icon: <LayoutGrid className="w-4 h-4" /> },
              { label: 'Free', value: stats.free, icon: <Zap className="w-4 h-4" /> },
              { label: 'HTTPS', value: stats.https, icon: <TrendingUp className="w-4 h-4" /> },
            ].map((stat, idx) => (
              <div key={idx} className="flex items-center justify-center gap-2 py-2 text-slate-600 dark:text-slate-400">
                <span className="text-blue-500">{stat.icon}</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  <AnimatedCounter end={stat.value} />
                </span>
                <span className="text-xs font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-32">
        {/* Filters Bar - Mobile Optimized */}
        <div className="bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-white/5 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Top Row: Category & Auth */}
            <div className="flex gap-2 flex-1">
              {/* Categories Dropdown */}
              <div className="relative flex-1 sm:flex-none">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="w-full sm:w-auto flex items-center justify-between gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-lg text-sm font-medium text-slate-700 dark:text-white hover:border-blue-300 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 text-blue-500" />
                    <span className="truncate max-w-[120px]">
                      {selectedCategory === 'All' ? 'All Categories' : selectedCategory}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showCategoryDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowCategoryDropdown(false)}
                    />
                    <div className="absolute top-full left-0 mt-2 w-64 max-h-[50vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl z-50 p-1.5 custom-scrollbar">
                      {/* All APIs */}
                      <button
                        onClick={() => { setSelectedCategory('All'); setShowCategoryDropdown(false); }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${selectedCategory === 'All'
                          ? 'bg-blue-500 text-white'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          <span className="text-sm font-medium">All APIs</span>
                        </div>
                        <span className="text-xs">{categories[0]?.count || 0}</span>
                      </button>

                      <div className="h-px bg-slate-100 dark:bg-white/5 my-1" />

                      {/* Category List */}
                      {categories.slice(1).map((cat) => (
                        <button
                          key={cat.name}
                          onClick={() => { setSelectedCategory(cat.name); setShowCategoryDropdown(false); }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${selectedCategory === cat.name
                            ? 'bg-blue-500 text-white'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                            }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4">{CATEGORY_ICONS[cat.name] || DEFAULT_ICON}</span>
                            <span className="text-sm truncate">{cat.name}</span>
                          </div>
                          <span className="text-xs">{cat.count}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Auth Filter Toggle */}
              <button
                onClick={() => setShowAuthOnly(!showAuthOnly)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all ${showAuthOnly
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400'
                  }`}
              >
                <span>Auth</span>
              </button>
            </div>

            {/* Sort & Results */}
            <div className="flex items-center gap-2 justify-between sm:justify-end">
              <span className="text-xs text-slate-500">
                {filteredApis.length} APIs
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'category')}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
              >
                <option value="name">Sort by Name</option>
                <option value="category">Sort by Category</option>
              </select>
            </div>
          </div>
        </div>

        {/* API Grid */}
        <div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-64 bg-white dark:bg-slate-800/50 rounded-[1.5rem] animate-pulse border border-slate-100 dark:border-white/5" />
              ))}
            </div>
          ) : filteredApis.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
              {filteredApis.map((api, idx) => (
                <ApiCard key={`${api.API}-${idx}`} api={api} onClick={() => handleApiClick(api)} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900/50 p-12 md:p-20 rounded-[2rem] text-center border-2 border-dashed border-slate-200 dark:border-white/10">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <LayoutGrid className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-3">No APIs Found</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base mb-8 max-w-md mx-auto">
                Try switching to a different category or adjusting your filters.
              </p>
              <button
                onClick={() => { setSelectedCategory('All'); setShowAuthOnly(false); }}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
