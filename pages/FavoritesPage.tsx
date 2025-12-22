
import React, { useState, useEffect } from 'react';
import { APIEntry } from '../types';
import { ApiCard } from '../components/ApiCard';
import { ApiDetailModal } from '../components/ApiDetailModal';
import { Star, Sparkles, ArrowRight, Search, Trash2 } from '../constants';
import { fetchAllApis } from '../services/apiService';

export const FavoritesPage: React.FC = () => {
    const [allApis, setAllApis] = useState<APIEntry[]>([]);
    const [favoriteApis, setFavoriteApis] = useState<APIEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [starredNames, setStarredNames] = useState<string[]>([]);
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
            setAllApis(data);

            const starred = JSON.parse(localStorage.getItem('starred-apis') || '[]');
            setStarredNames(starred);

            const favorites = data.filter(api => starred.includes(api.API));
            setFavoriteApis(favorites);
            setLoading(false);
        };
        loadData();
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const starred = JSON.parse(localStorage.getItem('starred-apis') || '[]');
            setStarredNames(starred);
            const favorites = allApis.filter(api => starred.includes(api.API));
            setFavoriteApis(favorites);
        };

        const interval = setInterval(() => {
            const starred = JSON.parse(localStorage.getItem('starred-apis') || '[]');
            if (JSON.stringify(starred) !== JSON.stringify(starredNames)) {
                handleStorageChange();
            }
        }, 500);

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, [allApis, starredNames]);

    const clearAllFavorites = () => {
        if (window.confirm('Are you sure you want to remove all favorites?')) {
            localStorage.setItem('starred-apis', '[]');
            setStarredNames([]);
            setFavoriteApis([]);
        }
    };

    const handleApiClick = (api: APIEntry) => {
        setSelectedApi(api);
    };

    return (
        <div className="bg-gradient-to-b from-white via-slate-50 to-white dark:from-black dark:via-[#0a0f1a] dark:to-black min-h-screen pt-28 md:pt-36 pb-20 md:pb-32 px-4">
            {/* API Detail Modal */}
            <ApiDetailModal
                api={selectedApi}
                isOpen={!!selectedApi}
                onClose={() => setSelectedApi(null)}
                isMobile={isMobile}
            />

            {/* Background decoration - Blue theme */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-bl from-blue-500/10 to-transparent blur-[100px] rounded-full" />
                <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[30%] bg-gradient-to-tr from-cyan-500/10 to-transparent blur-[80px] rounded-full" />
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Header - Blue theme */}
                <div className="text-center mb-12 md:mb-16">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                        Favorite <span className="text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">APIs</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Your personally curated collection of APIs. Star any API to add it here for quick access.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-64 bg-white dark:bg-slate-800/50 rounded-[1.5rem] animate-pulse border border-slate-100 dark:border-white/5" />
                        ))}
                    </div>
                ) : favoriteApis.length > 0 ? (
                    <>
                        {/* Stats and Actions - Blue theme */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white">
                                    <Star className="w-6 h-6 fill-current" />
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white">{favoriteApis.length}</p>
                                    <p className="text-sm text-slate-500">Saved API{favoriteApis.length !== 1 ? 's' : ''}</p>
                                </div>
                            </div>
                            <button
                                onClick={clearAllFavorites}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                                Clear All
                            </button>
                        </div>

                        {/* Favorites Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                            {favoriteApis.map((api, idx) => (
                                <ApiCard key={`${api.API}-${idx}`} api={api} onClick={() => handleApiClick(api)} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="bg-white dark:bg-slate-900/50 p-12 md:p-20 rounded-[2rem] text-center border-2 border-dashed border-slate-200 dark:border-white/10">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Star className="w-10 h-10 text-blue-500" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">No Favorites Yet</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg mb-8 max-w-md mx-auto">
                            Start exploring and click the star icon on any API card to add it to your favorites collection.
                        </p>
                        <a
                            href="#/"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                        >
                            <Search className="w-5 h-5" />
                            Explore APIs
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
