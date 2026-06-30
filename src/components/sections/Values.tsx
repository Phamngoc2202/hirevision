import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, GraduationCap, Target } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const valuePoints = [
  'Tối ưu hồ sơ ứng tuyển dựa trên vai trò và năng lực thực tế của bạn.',
  'Rèn kỹ năng phỏng vấn với phản hồi cá nhân hóa, dễ áp dụng ngay.',
  'Biến mục tiêu nghề nghiệp thành roadmap rõ ràng, có thể đo lường tiến độ.',
  'Luôn có AI career assistant hỗ trợ 24/7 trong từng giai đoạn chuẩn bị.',
];

const valueStats = [
  { value: '80%', label: 'tiết kiệm thời gian chuẩn bị CV' },
  { value: '3x', label: 'tự tin hơn khi phỏng vấn' },
  { value: '24/7', label: 'AI career assistant luôn sẵn sàng' },
];

const parentVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

// Counter component for animated stats
function Counter({ value }: { value: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  const numericPart = value.match(/\d+/);
  const isNumeric = numericPart && !value.includes('/');

  useEffect(() => {
    if (inView && isNumeric) {
      const target = parseInt(numericPart[0], 10);
      let start = 0;
      const duration = 1200;
      const increment = Math.ceil(target / (duration / 16));
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, isNumeric]);

  return (
    <span ref={ref} className="tabular-nums">
      {isNumeric ? value.replace(numericPart[0], count.toString()) : value}
    </span>
  );
}

// Progress Bar component that animates width when in view
function ProgressBar({ targetWidth }: { targetWidth: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: targetWidth } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="h-full rounded-full bg-gradient-to-r from-primary-blue to-primary-purple"
      />
    </div>
  );
}

export default function Values() {
  return (
    <section className="bg-white py-20 dark:border-t dark:border-white/5 dark:bg-slate-950 sm:py-24 overflow-hidden">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
        
        {/* Left Side: Copy and Points */}
        <div>
          <SectionHeading
            badge="Giá trị cốt lõi"
            title="Không chỉ tìm việc - Chúng tôi giúp bạn trở nên tốt hơn"
            description="HireVision không dừng ở việc giúp bạn ứng tuyển. Nền tảng còn hỗ trợ bạn cải thiện CV, kỹ năng phỏng vấn, tư duy nghề nghiệp và định hướng phát triển dài hạn."
            centered={false}
          />

          <motion.div
            className="mt-8 space-y-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={parentVariants}
          >
            {valuePoints.map((point) => (
              <motion.div
                key={point}
                variants={fadeUpVariants}
                className="flex items-start gap-3 rounded-2xl border border-slate-200/60 bg-slate-50 p-4 shadow-soft dark:border-white/5 dark:bg-slate-900/40"
              >
                <div className="mt-0.5 rounded-xl bg-gradient-to-br from-primary-blue/10 to-primary-purple/10 p-2 text-primary-blue shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{point}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Side: Stats Grid and Weekly growth card */}
        <motion.div
          className="grid gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={parentVariants}
        >
          {/* Numbers grid */}
          <motion.div variants={fadeUpVariants} className="grid gap-4 sm:grid-cols-3">
            {valueStats.map((stat) => (
              <div
                key={stat.value}
                className="rounded-2xl border border-slate-200/80 bg-slate-50 p-5 shadow-soft dark:border-white/5 dark:bg-slate-900/40"
              >
                <p className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
                  <Counter value={stat.value} />
                </p>
                <p className="mt-2 text-xs leading-normal text-slate-500 dark:text-secondary-text">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Double Card panel */}
          <motion.div
            variants={fadeUpVariants}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-soft dark:border-white/5 dark:bg-slate-900/30"
          >
            <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
              {/* Target / Focus Card */}
              <div className="rounded-2xl bg-slate-950 p-5 text-white dark:bg-slate-950/80 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white/10 p-2.5">
                    <Target className="h-5 w-5 text-accent-glow" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400">Career Focus</p>
                    <p className="text-sm font-bold truncate">Junior Product Designer</p>
                  </div>
                </div>
                
                <div className="mt-5 space-y-2.5">
                  {['Portfolio storytelling', 'Interview case practice', 'Cross-team communication'].map(
                    (item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 hover:bg-white/10 transition-colors"
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Success metrics / Snapshot */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/5 dark:bg-slate-950/60 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-400">Weekly growth snapshot</p>
                    <h4 className="mt-1 font-display text-base font-bold text-slate-900 dark:text-white leading-tight">
                      Tiến độ tăng trưởng
                    </h4>
                  </div>
                  <GraduationCap className="h-7 w-7 text-primary-purple shrink-0" />
                </div>
                
                <div className="mt-5 space-y-3">
                  {[
                    { title: 'CV readiness', value: '91%' },
                    { title: 'Interview readiness', value: '83%' },
                    { title: 'Skill alignment', value: '88%' },
                    { title: 'Application strategy', value: '76%' },
                  ].map((item) => (
                    <div key={item.title} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-secondary-text">{item.title}</span>
                        <span className="font-bold text-slate-800 dark:text-white">{item.value}</span>
                      </div>
                      <ProgressBar targetWidth={item.value} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
