import React, { useState } from 'react';
import { Menu, Zap, X, User, Lock, Mail, Eye, EyeOff, LogIn } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const IdentityModal = ({ onClose }) => {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    setStatus('loading');
    setErrorMsg('');

    // Simulate auth (Firebase integration placeholder)
    await new Promise(r => setTimeout(r, 1200));
    // In prod: call Firebase Auth SDK here
    // For now, mock success
    if (form.email.includes('@')) {
      setStatus('success');
      setTimeout(() => onClose(), 1500);
    } else {
      setStatus('error');
      setErrorMsg('Invalid email format.');
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Modal */}
      <motion.div
        className="relative glass-card w-full max-w-md p-8 space-y-6 z-10"
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/20 border border-[var(--primary)]/30 flex items-center justify-center mx-auto">
            <Zap className="w-6 h-6 text-[var(--primary)]" />
          </div>
          <h2 className="font-display text-4xl uppercase italic">Connect Identity</h2>
          <p className="text-white/40 text-xs">Access your personal ballot and voting timeline</p>
        </div>

        {/* Tabs */}
        <div className="flex glass rounded-xl p-1">
          {['login', 'register'].map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setStatus(null); setErrorMsg(''); }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                tab === t ? 'bg-[var(--primary)] text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              {t === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="popLayout">
            {tab === 'register' && (
              <motion.div
                key="name"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full bg-[#100d16] border border-neutral-800 rounded-xl py-3 pl-9 pr-4 text-sm text-white focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
                className="w-full bg-[#100d16] border border-neutral-800 rounded-xl py-3 pl-9 pr-4 text-sm text-white focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
                className="w-full bg-[#100d16] border border-neutral-800 rounded-xl py-3 pl-9 pr-10 text-sm text-white focus:ring-1 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <p className="text-red-400 text-xs font-bold">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="w-full py-3.5 rounded-xl font-display text-xl uppercase italic flex items-center justify-center gap-2 transition-all disabled:opacity-60"
            style={{
              background: status === 'success' ? 'var(--secondary)' : 'var(--primary)',
              boxShadow: `0 0 20px ${status === 'success' ? 'var(--secondary-glow)' : 'var(--primary-glow)'}`,
            }}
          >
            {status === 'loading' ? (
              <span className="animate-pulse">Syncing...</span>
            ) : status === 'success' ? (
              <>Synced ✓</>
            ) : (
              <>{tab === 'login' ? 'Sign In' : 'Create Identity'} <LogIn className="w-5 h-5" /></>
            )}
          </button>
        </form>

        <p className="text-center text-white/20 text-[10px] leading-relaxed">
          Your identity is used to save your personal ballot and election timeline. We never sell your data.
        </p>
      </motion.div>
    </motion.div>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [identityOpen, setIdentityOpen] = useState(false);

  return (
    <>
      <nav className="glass sticky top-0 z-[100] border-x-0 border-t-0 border-b border-white/10">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group cursor-pointer">
            <div className="bg-[var(--primary)] p-2.5 rounded-xl neon-glow-primary transform group-hover:rotate-12 transition-transform">
              <Zap className="w-7 h-7 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-display tracking-tighter leading-none italic">
                INFORMED <span className="text-[var(--primary)]">POLL</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase leading-none mt-1">
                Decentralized Consensus V4.2
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-12 text-sm font-bold uppercase tracking-widest">
            {[
              { label: 'Candidates', path: '/candidates' },
              { label: 'Protocols', path: '/protocols' },
              { label: 'Neural-Sync', path: '/neural-sync' },
            ].map(({ label, path }) => (
              <NavLink
                key={label}
                to={path}
                className={({ isActive }) =>
                  `relative transition-colors group ${
                    isActive ? 'text-[var(--primary)]' : 'text-white/70 hover:text-[var(--primary)]'
                  }`
                }
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--primary)] transition-all group-hover:w-full" />
              </NavLink>
            ))}

            <button
              onClick={() => setIdentityOpen(true)}
              className="relative overflow-hidden bg-white text-black px-8 py-3 rounded-none font-display text-xl uppercase italic hover:bg-[var(--primary)] hover:text-white transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(110,0,255,0.3)]"
            >
              Connect Identity
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMenuOpen(v => !v)}
          >
            {menuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass border-t border-white/5 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {[
                  { label: 'Candidates', path: '/candidates' },
                  { label: 'Protocols', path: '/protocols' },
                  { label: 'Neural-Sync', path: '/neural-sync' },
                ].map(({ label, path }) => (
                  <NavLink
                    key={label}
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-sm font-bold uppercase tracking-widest py-2 ${
                        isActive ? 'text-[var(--primary)]' : 'text-white/70'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
                <button
                  onClick={() => { setMenuOpen(false); setIdentityOpen(true); }}
                  className="w-full bg-[var(--primary)] text-white py-3 font-display text-xl uppercase italic"
                >
                  Connect Identity
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Identity Modal */}
      <AnimatePresence>
        {identityOpen && <IdentityModal onClose={() => setIdentityOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
