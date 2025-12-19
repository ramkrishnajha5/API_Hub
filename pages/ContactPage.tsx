
import React, { useState } from 'react';
import { Mail, Github, CheckCircle2, Zap, ArrowRight, MessageSquare, Sparkles, Instagram } from '../constants';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '04ee3a02-3920-49c7-b16c-88811a92035e',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: 'API Hub Contact Form'
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      description: 'For technical support or general inquiries',
      link: 'mailto:ram03krishna@gmail.com',
      linkText: 'ram03krishna@gmail.com',
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: 'GitHub',
      description: 'Check out my projects and contributions',
      link: 'https://github.com/ramkrishnajha5',
      linkText: '@ramkrishnajha5',
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      title: 'Instagram',
      description: 'Follow for updates and behind the scenes',
      link: 'https://instagram.com/ramkrishnajha5',
      linkText: '@ramkrishnajha5',
    }
  ];

  const faqItems = [
    {
      q: 'How do I suggest a new API?',
      a: 'You can reach out via email or the contact form below with your API suggestion. Include the API name, description, and documentation link.'
    },
    {
      q: 'Are all APIs on this site free?',
      a: 'Most APIs listed are free to use, though some may have rate limits or require API keys. Check individual API documentation for details.'
    },
    {
      q: 'How often is the API list updated?',
      a: 'The list is regularly updated to add new APIs and remove deprecated ones. Check back often for new additions!'
    },
    {
      q: 'Can I contribute to this project?',
      a: 'Absolutely! Feel free to reach out via the contact form or GitHub to discuss contributions, whether it\'s adding APIs, fixing bugs, or suggesting features.'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white via-slate-50 to-white dark:from-black dark:via-[#0a0f1a] dark:to-black min-h-screen pt-28 md:pt-36 pb-20 md:pb-32 px-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-bl from-blue-500/10 to-transparent blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[30%] bg-gradient-to-tr from-purple-500/10 to-transparent blur-[80px] rounded-full" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <span className="text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider uppercase">Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Let's <span className="text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Connect</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Have questions, suggestions, or want to collaborate? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Methods + CTA */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, idx) => (
                <a
                  key={idx}
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : undefined}
                  className="block bg-white dark:bg-slate-900/50 p-5 md:p-6 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/20 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                      {method.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 dark:text-white mb-1">{method.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{method.description}</p>
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                        {method.linkText} <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick Start CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-6 md:p-8 rounded-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <Zap className="w-10 h-10 mb-4 fill-current" />
                <h3 className="text-xl font-black mb-2">Explore APIs Now</h3>
                <p className="text-blue-100 text-sm mb-4">Browse our collection of 430+ free public APIs for your next project.</p>
                <a href="#/" className="flex items-center gap-2 font-bold text-sm uppercase tracking-wide hover:gap-3 transition-all">
                  Start Exploring <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl border border-slate-100 dark:border-white/5 rounded-[2rem] p-6 md:p-10 shadow-xl shadow-slate-100/50 dark:shadow-black/20">
              {submitted ? (
                <div className="text-center py-16 md:py-20">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black mb-3 text-slate-900 dark:text-white">Message Sent!</h2>
                  <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg max-w-md mx-auto">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                    className="text-blue-600 font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">Send a Message</h2>
                    <p className="text-slate-500 dark:text-slate-400">Fill out the form below and I'll respond as soon as possible.</p>
                  </div>

                  {error && (
                    <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-xl text-rose-600 dark:text-rose-400 text-sm font-medium">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
                          Your Name *
                        </label>
                        <input
                          required
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
                          Email Address *
                        </label>
                        <input
                          required
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
                        Subject *
                      </label>
                      <select
                        required
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white font-medium cursor-pointer"
                      >
                        <option value="">Select a subject...</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="API Suggestion">API Suggestion</option>
                        <option value="Bug Report">Bug Report</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="Collaboration">Collaboration</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 ml-1">
                        Message *
                      </label>
                      <textarea
                        required
                        name="message"
                        rows={6}
                        placeholder="Tell me about your inquiry, project, or feedback..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white font-medium resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-xl hover:shadow-blue-500/25 disabled:opacity-60 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 text-lg btn-shimmer"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section - Full Width */}
        <div className="mt-16 md:mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-3">
              <Sparkles className="w-6 h-6 text-blue-500" />
              Frequently Asked Questions
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/20 transition-all"
              >
                <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-3">{item.q}</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
