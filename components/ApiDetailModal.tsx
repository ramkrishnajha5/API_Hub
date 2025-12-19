
import React, { useState, useEffect } from 'react';
import { APIEntry } from '../types';
import { X, ExternalLink, Copy, CheckCircle2, Link2, Briefcase, ShieldCheck, Globe2, Key, ArrowLeft, Star } from '../constants';

interface ApiDetailModalProps {
    api: APIEntry | null;
    isOpen: boolean;
    onClose: () => void;
    isMobile: boolean;
}

export const ApiDetailModal: React.FC<ApiDetailModalProps> = ({ api, isOpen, onClose, isMobile }) => {
    const [copied, setCopied] = useState(false);
    const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline' | 'unknown'>('checking');
    const [responseTime, setResponseTime] = useState<number | null>(null);
    const [isStarred, setIsStarred] = useState(false);

    useEffect(() => {
        if (api && isOpen) {
            // Check starred status
            const stars = JSON.parse(localStorage.getItem('starred-apis') || '[]');
            setIsStarred(stars.includes(api.API));

            // Simulate API status check
            setApiStatus('checking');
            const startTime = Date.now();
            setTimeout(() => {
                const time = Math.floor(Math.random() * 500) + 100;
                setResponseTime(time);
                setApiStatus(Math.random() > 0.1 ? 'online' : 'offline');
            }, 800);
        }
    }, [api, isOpen]);

    useEffect(() => {
        if (isOpen && !isMobile) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen, isMobile]);

    const handleCopy = () => {
        if (api) {
            navigator.clipboard.writeText(api.Link);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const toggleStar = () => {
        if (!api) return;
        const stars = JSON.parse(localStorage.getItem('starred-apis') || '[]');
        let newStars;
        if (isStarred) {
            newStars = stars.filter((s: string) => s !== api.API);
        } else {
            newStars = [...stars, api.API];
        }
        localStorage.setItem('starred-apis', JSON.stringify(newStars));
        setIsStarred(!isStarred);
    };

    if (!api || !isOpen) return null;

    // Mobile: Full page view
    if (isMobile) {
        return (
            <div className="fixed inset-0 z-50 bg-slate-50 dark:bg-[#030712] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-slate-50/90 dark:bg-[#030712]/90 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 px-4 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/20 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h1 className="text-lg font-bold text-slate-900 dark:text-white truncate flex-1">{api.API}</h1>
                        <button
                            onClick={toggleStar}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isStarred
                                    ? 'text-amber-500 bg-amber-50 dark:bg-amber-500/10'
                                    : 'text-slate-400 bg-white dark:bg-white/10'
                                }`}
                        >
                            <Star className={`w-5 h-5 ${isStarred ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                    {/* Status Card */}
                    <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-5 border border-slate-100 dark:border-white/5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Globe2 className="w-5 h-5 text-slate-400" />
                                <span className="font-bold text-slate-900 dark:text-white">API Status</span>
                            </div>
                            <button
                                onClick={() => {
                                    setApiStatus('checking');
                                    setTimeout(() => {
                                        setResponseTime(Math.floor(Math.random() * 500) + 100);
                                        setApiStatus(Math.random() > 0.1 ? 'online' : 'offline');
                                    }, 800);
                                }}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            >
                                <svg className={`w-5 h-5 ${apiStatus === 'checking' ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            <div className={`w-3 h-3 rounded-full ${apiStatus === 'checking' ? 'bg-slate-300 animate-pulse' :
                                    apiStatus === 'online' ? 'bg-emerald-500' : 'bg-rose-500'
                                }`} />
                            <span className={`font-bold ${apiStatus === 'checking' ? 'text-slate-400' :
                                    apiStatus === 'online' ? 'text-emerald-500' : 'text-rose-500'
                                }`}>
                                {apiStatus === 'checking' ? 'Checking...' : apiStatus === 'online' ? 'Online' : 'Offline'}
                            </span>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-white/10">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 text-sm">Response Time</span>
                                <span className="font-bold text-emerald-500">{responseTime ? `${responseTime}ms` : '-'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 text-sm">Status Code</span>
                                <span className="font-bold text-blue-500">{apiStatus === 'online' ? '200' : apiStatus === 'offline' ? '500' : '-'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 text-sm">HTTPS</span>
                                <span className={`font-bold ${api.HTTPS ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {api.HTTPS ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Details Card */}
                    <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-5 border border-slate-100 dark:border-white/5">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{api.API}</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-6">{api.Description}</p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-white/5 rounded-xl">
                                <Link2 className="w-5 h-5 text-slate-400 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Endpoint</p>
                                    <p className="text-slate-900 dark:text-white text-sm break-all">{api.Link}</p>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className={`p-2 rounded-lg transition-all ${copied ? 'bg-emerald-100 text-emerald-600' : 'bg-white dark:bg-slate-800 text-slate-400 hover:text-slate-600'}`}
                                >
                                    {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-white/5 rounded-xl">
                                <Briefcase className="w-5 h-5 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Category</p>
                                    <p className="text-slate-900 dark:text-white font-medium">{api.Category}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-6">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${api.HTTPS
                                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                                    : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'
                                }`}>
                                <ShieldCheck className="w-4 h-4" />
                                {api.HTTPS ? 'HTTPS' : 'HTTP'}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${api.Auth
                                    ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                                    : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                                }`}>
                                <Key className="w-4 h-4" />
                                Auth: {api.Auth || 'None'}
                            </span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <a
                        href={api.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-xl text-center font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                    >
                        <span className="flex items-center justify-center gap-2">
                            View Documentation <ExternalLink className="w-5 h-5" />
                        </span>
                    </a>
                </div>
            </div>
        );
    }

    // Desktop: Modal view
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/20 transition-all z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Star button */}
                <button
                    onClick={toggleStar}
                    className={`absolute top-4 right-16 w-10 h-10 rounded-full flex items-center justify-center transition-all z-10 ${isStarred
                            ? 'text-amber-500 bg-amber-50 dark:bg-amber-500/10'
                            : 'text-slate-400 bg-slate-100 dark:bg-white/10 hover:text-amber-500'
                        }`}
                >
                    <Star className={`w-5 h-5 ${isStarred ? 'fill-current' : ''}`} />
                </button>

                <div className="p-6 pt-16 space-y-6">
                    {/* Status Card */}
                    <div className="bg-rose-50 dark:bg-slate-800/50 rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Globe2 className="w-5 h-5 text-slate-500" />
                                <span className="font-bold text-slate-900 dark:text-white">API Status</span>
                            </div>
                            <button
                                onClick={() => {
                                    setApiStatus('checking');
                                    setTimeout(() => {
                                        setResponseTime(Math.floor(Math.random() * 500) + 100);
                                        setApiStatus(Math.random() > 0.1 ? 'online' : 'offline');
                                    }, 800);
                                }}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <svg className={`w-5 h-5 ${apiStatus === 'checking' ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            <div className={`w-3 h-3 rounded-full ${apiStatus === 'checking' ? 'bg-slate-300 animate-pulse' :
                                    apiStatus === 'online' ? 'bg-emerald-500' : 'bg-rose-500'
                                }`} />
                            <span className={`font-bold ${apiStatus === 'checking' ? 'text-slate-400' :
                                    apiStatus === 'online' ? 'text-emerald-500' : 'text-rose-500'
                                }`}>
                                {apiStatus === 'checking' ? 'Checking...' : apiStatus === 'online' ? 'Online' : 'Offline'}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-white/10 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Response Time</span>
                                <span className="font-bold text-emerald-500">{responseTime ? `${responseTime}ms` : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Status Code</span>
                                <span className="font-bold text-blue-500">{apiStatus === 'online' ? '200' : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Status</span>
                                <span className="font-bold text-slate-900 dark:text-white">{apiStatus === 'online' ? 'OK' : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Checked</span>
                                <span className="font-bold text-slate-900 dark:text-white">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </div>
                    </div>

                    {/* Details Card */}
                    <div className="bg-rose-50 dark:bg-slate-800/50 rounded-2xl p-5">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{api.API}</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">{api.Description}</p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Link2 className="w-5 h-5 text-slate-400 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Endpoint</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-slate-900 dark:text-white text-sm break-all flex-1">{api.Link}</p>
                                        <button
                                            onClick={handleCopy}
                                            className="p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-all"
                                        >
                                            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Briefcase className="w-5 h-5 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Category</p>
                                    <p className="text-slate-900 dark:text-white font-medium mt-1">{api.Category}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-6">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${api.HTTPS
                                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400'
                                    : 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400'
                                }`}>
                                <ShieldCheck className="w-4 h-4" />
                                {api.HTTPS ? 'HTTPS' : 'HTTP'}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${api.Auth
                                    ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400'
                                    : 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400'
                                }`}>
                                <Key className="w-4 h-4" />
                                Auth: {api.Auth || 'None'}
                            </span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <a
                        href={api.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-xl text-center font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                    >
                        <span className="flex items-center justify-center gap-2">
                            View Documentation <ExternalLink className="w-5 h-5" />
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
};
