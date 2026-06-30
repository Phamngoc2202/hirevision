import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Menu, MoonStar, SunMedium, X } from 'lucide-react';

type ThemeMode = 'light' | 'dark';

type NavbarProps = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isScrolled: boolean;
  isLoggedIn: boolean;
  handleLogout: () => void;
  setShowLoginModal: (val: boolean) => void;
};

const navItems = [
  { label: 'Trang chủ', href: '#trang-chu' },
  { label: 'Tính năng', href: '#tinh-nang' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Blog', href: '#blog' },
  { label: 'Giá cả', href: '#gia-ca' },
];

export default function Navbar({ theme, setTheme, isScrolled, isLoggedIn, handleLogout, setShowLoginModal }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  return (
    <motion.header
      className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
    >
      <nav
        className={`mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 sm:px-6 ${
          isScrolled
            ? 'border-slate-200/80 bg-white/80 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 dark:shadow-glow'
            : 'border-transparent bg-transparent'
        }`}
      >
        {/* Logo */}
        <a href="#trang-chu" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-blue to-primary-purple shadow-lg shadow-primary-blue/20 transition-transform duration-300 group-hover:scale-105">
            <Bot className="h-5 w-5 text-white" />
          </span>
          <div>
            <p className="font-display text-lg font-bold tracking-tight text-slate-950 dark:text-white">
              HireVision
            </p>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-secondary-text">
              AI Career Assistant
            </p>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
            >
              {item.label}
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary-blue to-primary-purple"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.2 }}
              />
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            aria-label="Chuyển giao diện sáng tối"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDark ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            >
              {isDark ? <SunMedium className="h-5 w-5 text-amber-400" /> : <MoonStar className="h-5 w-5 text-indigo-600" />}
            </motion.div>
          </motion.button>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 pl-3 pr-1 py-1 dark:border-white/10 dark:bg-white/5">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">demo1@gmail.com</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary-blue to-primary-purple text-xs font-bold text-white uppercase">
                  d
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-white/10 dark:bg-transparent dark:text-slate-200 dark:hover:bg-white/5"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-white/10 dark:bg-transparent dark:text-slate-200 dark:hover:bg-white/5"
            >
              Đăng nhập
            </button>
          )}
          
          <motion.a
            href="#gia-ca"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-full bg-gradient-to-r from-primary-blue to-primary-purple px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-blue/30 transition-all duration-300 hover:shadow-primary-purple/40"
          >
            <span className="relative z-10">Bắt đầu miễn phí</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-primary-purple to-primary-blue transition-transform duration-500 hover:translate-x-0" />
          </motion.a>
        </div>

        {/* Mobile Menu & Theme Toggles */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white"
            aria-label="Chuyển giao diện sáng tối"
          >
            {isDark ? <SunMedium className="h-5 w-5 text-amber-400" /> : <MoonStar className="h-5 w-5 text-indigo-600" />}
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label="Mở menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-3 max-w-7xl rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95 dark:shadow-glow md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-3">
                {isLoggedIn ? (
                  <>
                    <div className="rounded-2xl border border-slate-200 py-3 text-center text-xs font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300 truncate px-2 bg-slate-50 dark:bg-white/5">
                      demo1@gmail.com
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="rounded-2xl bg-slate-600 py-3 text-center text-sm font-semibold text-white"
                    >
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setShowLoginModal(true);
                        setIsMenuOpen(false);
                      }}
                      className="rounded-2xl border border-slate-200 py-3 text-center text-sm font-semibold text-slate-800 dark:border-white/10 dark:text-white"
                    >
                      Đăng nhập
                    </button>
                    <a
                      href="#gia-ca"
                      onClick={() => setIsMenuOpen(false)}
                      className="rounded-2xl bg-gradient-to-r from-primary-blue to-primary-purple py-3 text-center text-sm font-semibold text-white shadow-md shadow-primary-blue/20"
                    >
                      Bắt đầu miễn phí
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
