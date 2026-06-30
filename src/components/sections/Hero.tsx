import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, Sparkles } from 'lucide-react';
import InteractiveDemo from './InteractiveDemo';

const heroTitleLines = ['AI Đồng Hành Cùng', 'Hành Trình Sự Nghiệp Của Bạn'];

const heroStats = [
  { label: 'CV score tăng rõ rệt', value: '91/100' },
  { label: 'Phiên mock interview', value: '24+' },
  { label: 'Roadmap cập nhật', value: 'Theo tuần' },
];

const parentVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as any, // Custom cubic-bezier for premium feel
    },
  },
};

type HeroProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
};

export default function Hero({ isLoggedIn, setIsLoggedIn }: HeroProps) {
  return (
    <section
      id="trang-chu"
      className="relative overflow-hidden border-b border-slate-200/70 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.06),transparent_34%),radial-gradient(circle_at_top_right,rgba(124,58,237,0.05),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)] pb-20 pt-10 dark:border-white/5 dark:bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_34%),radial-gradient(circle_at_top_right,rgba(124,58,237,0.08),transparent_30%),linear-gradient(180deg,#030712_0%,#090d16_100%)] sm:pb-24 sm:pt-16"
    >
      <div className="absolute inset-0 dark:bg-hero-radial opacity-70" />
      
      {/* Floating Animated Background Blobs */}
      <motion.div
        className="absolute left-[-10%] top-20 h-96 w-96 rounded-full bg-primary-blue/10 blur-[100px] dark:bg-primary-blue/15"
        animate={{ x: [0, 20, -15, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-10%] top-10 h-[400px] w-[400px] rounded-full bg-primary-purple/10 blur-[100px] dark:bg-primary-purple/12"
        animate={{ x: [0, -30, 25, 0], y: [0, 25, -20, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="section-shell relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* Left Content */}
        <motion.div className="max-w-2xl text-left" initial="hidden" animate="show" variants={parentVariants}>
          <motion.div
            variants={fadeUpVariants}
            className="inline-flex items-center gap-2 rounded-full border border-primary-blue/15 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary-blue shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-accent-glow"
          >
            <Sparkles className="h-4 w-4 text-primary-purple animate-pulse" />
            AI Career Assistant cho sinh viên & fresher
          </motion.div>

          <div className="mt-6 space-y-3">
            {heroTitleLines.map((line, index) => (
              <motion.h1
                key={index}
                variants={fadeUpVariants}
                className="font-display text-4xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem]"
              >
                {line}
              </motion.h1>
            ))}
          </div>

          <motion.p
            variants={fadeUpVariants}
            className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 dark:text-secondary-text sm:text-lg"
          >
            Nền tảng giúp bạn bứt phá: Tối ưu CV theo JD chuẩn xác, luyện phỏng vấn cá nhân hóa và tự động vẽ lộ trình học kỹ năng trong vài giây.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={fadeUpVariants} className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <motion.a
              href="#gia-ca"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="shimmer-btn relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-blue to-primary-purple px-6.5 py-4 text-sm font-semibold text-white shadow-lg shadow-primary-blue/30"
            >
              Thử ngay miễn phí
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="#tinh-nang"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/90 px-6.5 py-4 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              <PlayCircle className="h-4 w-4 text-primary-blue dark:text-accent-glow" />
              Xem video demo
            </motion.a>
          </motion.div>

          {/* Stats widgets */}
          <motion.div variants={fadeUpVariants} className="mt-10 grid gap-4 grid-cols-3">
            {heroStats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 shadow-soft backdrop-blur-sm dark:border-white/5 dark:bg-white/5"
              >
                <p className="text-lg font-extrabold text-slate-950 dark:text-white sm:text-xl">{item.value}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-secondary-text">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Interactive Demo Widget */}
        <motion.div 
          className="relative w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
        >
          <div className="absolute -inset-1 rounded-[2.1rem] bg-gradient-to-r from-primary-blue/30 to-primary-purple/30 opacity-40 blur-xl dark:opacity-55" />
          <InteractiveDemo isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </motion.div>
      </div>
    </section>
  );
}
