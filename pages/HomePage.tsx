
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
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider uppercase">
              EXPLORE {stats.total}+ FREE PUBLIC APIS
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.05] hero-title">
            The Global
            <span className="block text-gradient bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent animate-gradient bg-300%">
              API Registry
            </span>
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-medium px-4">
            The most comprehensive catalog of public APIs. Curated, organized, and ready for your next breakthrough project.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-12 max-w-3xl mx-auto px-4">
            {[
              { label: 'Total APIs', value: stats.total, icon: <Globe2 className="w-4 h-4" />, color: 'blue' },
              { label: 'Categories', value: stats.categories, icon: <LayoutGrid className="w-4 h-4" />, color: 'purple' },
              { label: 'Free APIs', value: stats.free, icon: <Zap className="w-4 h-4" />, color: 'emerald' },
              { label: 'HTTPS Ready', value: stats.https, icon: <TrendingUp className="w-4 h-4" />, color: 'cyan' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/80 dark:bg-white/5 backdrop-blur-xl p-4 md:p-5 rounded-2xl border border-slate-100 dark:border-white/5 group hover:border-blue-200 dark:hover:border-blue-500/20 transition-all">
                <div className={`text-${stat.color}-500 mb-2 opacity-70 group-hover:opacity-100 transition-opacity`}>
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-32">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar - Categories */}
          <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-28 bg-white dark:bg-slate-900/50 backdrop-blur-xl p-5 md:p-6 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-100/50 dark:shadow-black/20">
              <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">
                  API Categories
                </h2>
                <span className="text-xs font-bold text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-2.5 py-1 rounded-full">
                  {categories.length - 1}
                </span>
              </div>

              {/* All APIs Button */}
              <div className="mb-4">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all ${selectedCategory === 'All'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4" />
                    <span className="font-bold text-sm">All APIs</span>
                  </div>
                  <span className={`text-xs font-bold ${selectedCategory === 'All' ? 'text-white/80' : 'text-slate-400'}`}>
                    {categories[0]?.count || 0}
                  </span>
                </button>
              </div>

              {/* Category List */}
              <div className="space-y-1 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
                {categories.slice(1).map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${selectedCategory === cat.name
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`${selectedCategory === cat.name ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'} transition-colors`}>
                        {CATEGORY_ICONS[cat.name] || DEFAULT_ICON}
                      </span>
                      <span className="font-semibold text-sm truncate max-w-[130px]">{cat.name}</span>
                    </div>
                    <span className={`text-[10px] font-bold ${selectedCategory === cat.name ? 'text-white/70' : 'text-slate-400'}`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Auth Filter */}
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5">
                <label className="flex items-center justify-between cursor-pointer group p-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition-colors">
                    Auth Required Only
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={showAuthOnly}
                      onChange={() => setShowAuthOnly(!showAuthOnly)}
                    />
                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-cyan-500 transition-all" />
                    <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all peer-checked:translate-x-5 shadow-sm" />
                  </div>
                </label>
              </div>
            </div>
          </aside>

          {/* API Grid */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                  {selectedCategory === 'All' ? 'All' : selectedCategory}
                  <span className="text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">APIs</span>
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                  {filteredApis.length} API{filteredApis.length !== 1 ? 's' : ''} available • Click any API for details
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'category')}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                >
                  <option value="name">Sort by Name</option>
                  <option value="category">Sort by Category</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
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
    </div>
  );
};
