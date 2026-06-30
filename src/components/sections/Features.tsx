import { motion } from 'framer-motion';
import { ArrowRight, FileText, Mic, Route } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const featureItems = [
  {
    title: 'AI CV Optimizer',
    description:
      'Phân tích, chấm điểm và gợi ý tối ưu CV theo từng vị trí ứng tuyển để tăng độ phù hợp với JD.',
    icon: FileText,
  },
  {
    title: 'AI Mock Interview',
    description:
      'Mô phỏng phỏng vấn bằng AI, đưa ra câu hỏi sát thực tế và phản hồi giúp bạn trả lời tốt hơn.',
    icon: Mic,
  },
  {
    title: 'Career Roadmap AI',
    description:
      'Xây dựng lộ trình học tập và phát triển kỹ năng theo mục tiêu nghề nghiệp, có thứ tự ưu tiên rõ ràng.',
    icon: Route,
  },
];

const parentVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

export default function Features() {
  return (
    <section
      id="tinh-nang"
      className="relative bg-slate-50 py-20 dark:border-t dark:border-white/5 dark:bg-slate-950 sm:py-24 overflow-hidden"
    >
      {/* Background radial gradients */}
      <div className="absolute left-1/3 top-0 h-[350px] w-[350px] rounded-full bg-primary-purple/5 blur-[90px] pointer-events-none" />
      
      <div className="section-shell relative z-10">
        <SectionHeading
          badge="Giải pháp"
          title="HireVision Giúp Bạn Giải Quyết Tất Cả"
          description="Ba trụ cột cốt lõi giúp bạn tiến nhanh hơn từ giai đoạn chuẩn bị hồ sơ đến lúc bước vào phỏng vấn và phát triển nghề nghiệp lâu dài."
        />

        <motion.div
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={parentVariants}
        >
          {featureItems.map((item) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 shadow-soft transition-all duration-300 dark:border-white/5 dark:bg-slate-900/40"
              >
                {/* Glowing hover line on top */}
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary-blue/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-blue/[0.01] via-transparent to-primary-purple/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:from-primary-blue/[0.04] dark:to-primary-purple/[0.05]" />
                
                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.05 }}
                    className="inline-flex rounded-2xl bg-gradient-to-br from-primary-blue/10 to-primary-purple/10 p-3.5 text-primary-blue shadow-inner"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  
                  <h3 className="mt-6 font-display text-xl font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-secondary-text">
                    {item.description}
                  </p>
                  
                  <div className="mt-8 flex items-center gap-2 text-xs font-bold text-primary-blue dark:text-accent-glow">
                    <span>Tối ưu theo mục tiêu nghề nghiệp</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
