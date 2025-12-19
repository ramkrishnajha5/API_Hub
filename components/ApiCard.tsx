
import React, { useState, useEffect } from 'react';
import { APIEntry } from '../types';
import { ExternalLink, Copy, CheckCircle2, Star, Key, ShieldCheck, Globe2 } from '../constants';

interface ApiCardProps {
  api: APIEntry;
  onClick?: () => void;
}

export const ApiCard: React.FC<ApiCardProps> = ({ api, onClick }) => {
  const [copied, setCopied] = useState(false);
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    const stars = JSON.parse(localStorage.getItem('starred-apis') || '[]');
    setIsStarred(stars.includes(api.API));
  }, [api.API]);

  const toggleStar = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(api.Link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleViewDocs = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const getCategoryColor = (category: string) => {
    const colors = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-emerald-500 to-teal-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-blue-500',
      'from-rose-500 to-pink-500',
      'from-amber-500 to-orange-500',
      'from-teal-500 to-cyan-500',
    ];
    const index = category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  return (
    <div
      onClick={onClick}
      className="group relative bg-white dark:bg-slate-900/60 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/30 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 card-hover overflow-hidden cursor-pointer"
    >
      {/* Decorative gradient glow on hover */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${getCategoryColor(api.Category)} opacity-0 group-hover:opacity-10 blur-[60px] transition-opacity duration-500 rounded-full`} />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
              {api.API}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gradient-to-r ${getCategoryColor(api.Category)} text-white text-[10px] font-bold uppercase tracking-wide`}>
                {api.Category}
              </span>
            </div>
          </div>

          <button
            onClick={toggleStar}
            className={`p-2 rounded-lg transition-all flex-shrink-0 ${isStarred
                ? 'text-amber-500 bg-amber-50 dark:bg-amber-500/10'
                : 'text-slate-300 dark:text-slate-600 hover:text-amber-500 hover:bg-slate-50 dark:hover:bg-white/5'
              }`}
            aria-label={isStarred ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star className={`w-5 h-5 ${isStarred ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Description */}
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2 h-10">
          {api.Description}
        </p>

        {/* Badges */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5">
            <Key className={`w-3.5 h-3.5 flex-shrink-0 ${api.Auth ? 'text-amber-500' : 'text-emerald-500'}`} />
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 truncate">
              {api.Auth || 'Open'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5">
            <ShieldCheck className={`w-3.5 h-3.5 flex-shrink-0 ${api.HTTPS ? 'text-blue-500' : 'text-rose-500'}`} />
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">
              {api.HTTPS ? 'HTTPS' : 'HTTP'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5">
            <Globe2 className="w-3.5 h-3.5 flex-shrink-0 text-purple-500" />
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">
              {api.Cors === 'yes' ? 'CORS' : api.Cors === 'no' ? 'No CORS' : '?'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={api.Link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleViewDocs}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all btn-shimmer"
          >
            View Docs <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={handleCopy}
            className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all ${copied
                ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500'
                : 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400'
              }`}
            title="Copy API URL"
            aria-label="Copy API URL"
          >
            {copied ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
