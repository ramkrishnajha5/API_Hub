
import React from 'react';
import { Rocket, Library, Code2, Globe2, ShieldCheck, Zap, TrendingUp, Sparkles, ArrowRight, CheckCircle2 } from '../constants';

export const AboutPage: React.FC = () => {
  const features = [
    {
      icon: <Library className="w-8 h-8" />,
      title: 'Extensive Library',
      description: 'Access curated endpoints spanning 50+ categories, from financial systems to niche animal facts and everything in between.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: 'Vetted Sources',
      description: 'We focus on APIs that are free, stable, and well-documented for seamless integration into your projects.',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Speed to Launch',
      description: 'Discover your data layer in minutes, not days. Spend more time coding and less time searching.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Developer First',
      description: 'Built by developers, for developers. Every feature is designed with productivity and ease of use in mind.',
      gradient: 'from-orange-500 to-red-500'
    },
  ];

  const stats = [
    { value: '320+', label: 'Public APIs', icon: <Globe2 className="w-5 h-5" /> },
    { value: '48', label: 'Categories', icon: <Library className="w-5 h-5" /> },
    { value: '100%', label: 'Free to Use', icon: <Zap className="w-5 h-5" /> },
    { value: '24/7', label: 'Available', icon: <TrendingUp className="w-5 h-5" /> },
  ];

  const techStack = [
    'React 19', 'TypeScript', 'Tailwind CSS v3', 'Vite', 'Lucide Icons', 'ES Modules'
  ];

  const values = [
    'Open source and community-driven',
    'Always free, no hidden costs',
    'Privacy-focused, no tracking',
    'Regular updates and maintenance',
    'Responsive and accessible design',
    'Fast and lightweight'
  ];

  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white dark:from-black dark:via-[#0a0f1a] dark:to-black min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 px-4 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-bl from-blue-500/20 to-transparent blur-[100px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-tr from-purple-500/15 to-transparent blur-[80px] rounded-full" />
        </div>

        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative z-10">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-[1.1]">
                Your One-Stop
                <span className="block text-gradient bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
                  API Directory
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg mb-8 font-medium">
                API Hub makes it easy to find free public APIs for your projects. Browse, search, and discover APIs across 48+ categories - all in one place.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a href="#/" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                  Explore APIs <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Decorative visual */}
            <div className="relative hidden lg:block">
              <div className="aspect-square bg-gradient-to-br from-blue-600/20 via-cyan-500/20 to-purple-600/20 rounded-[4rem] p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
                <div className="relative h-full border-2 border-dashed border-blue-500/30 rounded-[3rem] flex items-center justify-center">
                  <Globe2 className="w-32 h-32 text-blue-500/20 animate-spin-slow" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30 animate-float">
                      <Zap className="w-12 h-12 text-white fill-current" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-white/5 text-center group hover:border-blue-200 dark:hover:border-blue-500/20 transition-all hover:shadow-xl hover:shadow-blue-500/5">
                <div className="text-blue-500 mb-3 flex justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Why Choose <span className="text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">API Hub</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              We've built the API discovery platform we always wished existed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900/50 p-8 md:p-10 rounded-[2rem] border border-slate-100 dark:border-white/5 group hover:border-blue-200 dark:hover:border-blue-500/20 transition-all duration-500 card-hover">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                Built on
                <span className="text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Open Source</span> Values
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                API Hub is inspired by the public-apis project, one of the most comprehensive collections of free APIs available. We've curated and organized these resources to make them easily accessible.
              </p>

              <div className="space-y-4">
                {values.map((value, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 p-8 md:p-10 rounded-[2rem] text-white">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-cyan-400" />
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, idx) => (
                  <div key={idx} className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-sm font-bold hover:bg-white/20 transition-colors cursor-default">
                    {tech}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-slate-400 text-sm">Designed & Developed by</p>
                <p className="text-white font-bold text-lg mt-1">Ram Krishna</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 rounded-[2.5rem] animate-gradient bg-300%">
            <div className="bg-white dark:bg-[#0a0f1a] rounded-[2.4rem] p-10 md:p-16 text-center">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Start exploring our collection of 320+ free public APIs and bring your ideas to life.
              </p>
              <a href="#/" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-blue-500/30 transition-all text-lg">
                Start Exploring <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
