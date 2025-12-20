import React, { useState, useEffect, useMemo } from 'react';
import { fetchAllApis } from '../services/apiService';
import { APIEntry } from '../types';
import { ApiCard } from '../components/ApiCard';
import { ApiDetailModal } from '../components/ApiDetailModal';
import { CATEGORY_ICONS, DEFAULT_ICON, LayoutGrid, Zap, Sparkles, TrendingUp, Globe2 } from '../constants';

export const HomePage: React.FC = () => {
  const [apis, setApis] = useState<APIEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAuthOnly, setShowAuthOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'category'>('name');
  const [selectedApi, setSelectedApi] = useState<APIEntry | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load API data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchAllApis();
      setApis(data);
      setLoading(false);
    };
    loadData();
  }, []);

  // Calculate categories
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    apis.forEach(api => {
      counts[api.Category] = (counts[api.Category] || 0) + 1;
    });
    const sorted = Object.keys(counts).sort().map(name => ({ name, count: counts[name] }));
    return [{ name: 'All', count: apis.length }, ...sorted];
  }, [apis]);

  // Filter and sort APIs
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

  // Calculate stats
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
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#05050A] text-slate-900 dark:text-slate-100 selection:bg-blue-500/30">
      <ApiDetailModal
        api={selectedApi}
        isOpen={!!selectedApi}
        onClose={() => setSelectedApi(null)}
        isMobile={isMobile}
      />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 dark:opacity-5 mix-blend-soft-light" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-24 px-4 overflow-hidden z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge Removed per request */}

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tight leading-none">
            Discover the <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 dark:from-blue-400 dark:via-violet-400 dark:to-blue-400 animate-gradient bg-300%">
              API Universe
            </span>
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
            Access {stats.total}+ curated public APIs for your next project. 
            Open source, free to use, and categorized for seamless integration.
          </p>

          {/* Redesigned Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto px-2 md:px-4">
            {[
              { label: 'TOTAL APIS', value: stats.total, icon: <Globe2 className="w-5 h-5" /> },
              { label: 'CATEGORIES', value: stats.categories, icon: <LayoutGrid className="w-5 h-5" /> },
              { label: 'NO AUTH', value: stats.free, icon: <Zap className="w-5 h-5" /> },
              { label: 'SECURE', value: stats.https, icon: <TrendingUp className="w-5 h-5" /> },
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="relative overflow-hidden group bg-white dark:bg-[#0A0C14] border border-slate-200 dark:border-white/5 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center hover:border-blue-500/30 transition-all duration-300 shadow-sm dark:shadow-none"
              >
                {/* Subtle gradient accent in corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-100 to-transparent dark:from-white/5 dark:to-transparent rounded-bl-[100%] -mr-4 -mt-4 transition-all duration-500 group-hover:from-blue-500/10" />
                
                {/* Icon (Top Left in spirit, centered here for symmetry or absolute for specific look) */}
                <div className="absolute top-6 left-6 text-slate-400 dark:text-slate-600 group-hover:text-blue-500 transition-colors duration-300">
                  {stat.icon}
                </div>

                {/* Content */}
                <div className="mt-4 relative z-10">
                  <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-[0.2em]">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-28 space-y-6">
              
              {/* Browse All Button */}
              <div className="bg-white/70 dark:bg-[#0F111A]/80 backdrop-blur-xl rounded-3xl border border-slate-200/60 dark:border-white/5 p-2 shadow-sm">
                 <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full relative overflow-hidden flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group ${selectedCategory === 'All'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <Sparkles className={`w-4 h-4 ${selectedCategory === 'All' ? 'text-yellow-400 dark:text-yellow-500' : ''}`} />
                    <span className="font-bold">Browse All</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                    selectedCategory === 'All' 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-100 dark:bg-white/10 text-slate-500'
                  }`}>
                    {categories[0]?.count || 0}
                  </span>
                </button>
              </div>

              {/* Category List */}
              <div className="bg-white/70 dark:bg-[#0F111A]/80 backdrop-blur-xl rounded-3xl border border-slate-200/60 dark:border-white/5 p-6 shadow-sm flex flex-col max-h-[calc(100vh-20rem)]">
                <div className="flex items-center justify-between mb-6">
                   <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Categories</span>
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-1">
                  {categories.slice(1).map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${selectedCategory === cat.name
                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:translate-x-1'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`opacity-70 group-hover:opacity-100 transition-opacity ${selectedCategory === cat.name ? 'text-blue-500' : ''}`}>
                          {CATEGORY_ICONS[cat.name] || DEFAULT_ICON}
                        </span>
                        <span className="font-medium text-sm truncate max-w-[140px]">{cat.name}</span>
                      </div>
                      <span className={`text-[10px] font-bold transition-colors ${
                        selectedCategory === cat.name 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-slate-300 dark:text-slate-600 group-hover:text-slate-500'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5">
                  <label className="flex items-center justify-between cursor-pointer group select-none">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Auth Required</span>
                      <span className="text-[10px] text-slate-400 font-medium">Show only secure APIs</span>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={showAuthOnly}
                        onChange={() => setShowAuthOnly(!showAuthOnly)}
                      />
                      <div className="w-10 h-6 bg-slate-200 dark:bg-white/10 rounded-full peer-checked:bg-blue-600 transition-colors" />
                      <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4 shadow-sm" />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Grid Area */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 pb-8 border-b border-slate-200/60 dark:border-white/5">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                  {selectedCategory === 'All' ? 'Browse All' : selectedCategory}
                  <span className="text-blue-500">.</span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">
                  Showing {filteredApis.length} resources in this collection
                </p>
              </div>

              <div className="relative group">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'category')}
                  className="appearance-none bg-white dark:bg-[#0F111A] border border-slate-200 dark:border-white/10 rounded-xl pl-5 pr-12 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 cursor-pointer shadow-sm hover:border-slate-300 dark:hover:border-white/20 transition-colors"
                >
                  <option value="name">Sort by Name</option>
                  <option value="category">Sort by Category</option>
                </select>
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-72 bg-white dark:bg-[#0F111A] rounded-3xl animate-pulse border border-slate-100 dark:border-white/5" />
                ))}
              </div>
            ) : filteredApis.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredApis.map((api, idx) => (
                  <ApiCard key={`${api.API}-${idx}`} api={api} onClick={() => handleApiClick(api)} />
                ))}
              </div>
            ) : (
              <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm p-16 rounded-3xl text-center border border-dashed border-slate-300 dark:border-white/10">
                <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No results found</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                  We couldn't find any APIs matching your current filters.
                </p>
                <button
                  onClick={() => { setSelectedCategory('All'); setShowAuthOnly(false); }}
                  className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};