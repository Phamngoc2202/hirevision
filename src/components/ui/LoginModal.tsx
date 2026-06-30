import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, AlertCircle, Bot } from 'lucide-react';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
};

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email.trim() === 'demo1@gmail.com' && password === 'admin') {
      onLoginSuccess();
      onClose();
      setEmail('');
      setPassword('');
    } else {
      setError('Tài khoản hoặc mật khẩu không chính xác.');
      setShakeTrigger(prev => !prev); // Toggle to trigger animation
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            key="login-modal-box"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={shakeTrigger
              ? { opacity: 1, scale: 1, y: 0, x: [0, -10, 10, -10, 10, -5, 5, 0] }
              : { opacity: 1, scale: 1, y: 0, x: 0 }
            }
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-slate-200 bg-white/95 p-6 shadow-2xl dark:border-white/10 dark:bg-slate-900/95"
          >
            {/* Corner Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/5 dark:hover:text-white"
              aria-label="Đóng cửa sổ"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header logo/title */}
            <div className="flex flex-col items-center text-center mt-3 mb-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-blue to-primary-purple shadow-lg shadow-primary-blue/20">
                <Bot className="h-6 w-6 text-white" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-slate-950 dark:text-white">
                Đăng nhập HireVision
              </h3>
              <p className="mt-1.5 text-xs text-slate-500 dark:text-secondary-text">
                Nhập tài khoản được cấp để sử dụng các chức năng của hệ thống
              </p>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mb-4 flex items-start gap-2 rounded-xl bg-rose-500/10 p-3.5 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300" htmlFor="email-input">
                  Email đăng nhập
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-10 pr-4 text-xs focus:border-primary-blue focus:bg-white focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:border-accent-glow"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300" htmlFor="password-input">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    id="password-input"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-10 pr-4 text-xs focus:border-primary-blue focus:bg-white focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:border-accent-glow"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="shimmer-btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary-blue to-primary-purple py-3.5 text-xs font-semibold text-white shadow-lg shadow-primary-blue/20 hover:shadow-primary-purple/35 transition duration-300"
              >
                Đăng nhập hệ thống
              </button>
            </form>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(modalContent, document.body);
}
