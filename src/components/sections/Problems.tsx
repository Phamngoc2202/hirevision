import { motion } from 'framer-motion';
import { Brain, Clock3, FileText, Mic, Route } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const problemItems = [
  {
    title: 'CV chưa chuyên nghiệp',
    description:
      'Khó gây ấn tượng với nhà tuyển dụng khi kinh nghiệm còn ít và cách trình bày chưa đủ thuyết phục.',
    icon: FileText,
  },
  {
    title: 'Sợ phỏng vấn',
    description:
      'Thiếu tự tin khi trả lời câu hỏi và chưa biết cách kể câu chuyện nghề nghiệp của chính mình.',
    icon: Mic,
  },
  {
    title: 'Mơ hồ về kỹ năng cần học',
    description:
      'Không rõ nên tập trung vào kỹ năng nào để phù hợp với vị trí công việc mong muốn.',
    icon: Brain,
  },
  {
    title: 'Chưa có lộ trình rõ ràng',
    description:
      'Khó xác định các bước phát triển nghề nghiệp ngắn hạn và dài hạn một cách thực tế.',
    icon: Route,
  },
  {
    title: 'Tìm việc tốn nhiều thời gian',
    description:
      'Ứng tuyển nhiều nhưng chưa có kết quả tốt vì thiếu chiến lược và chuẩn bị chưa đúng trọng tâm.',
    icon: Clock3,
  },
];

const parentVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

export default function Problems() {
  return (
    <section className="relative bg-white py-20 dark:border-t dark:border-white/5 dark:bg-slate-950 sm:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary-blue/5 blur-[80px] pointer-events-none" />
      
      <div className="section-shell relative z-10">
        <SectionHeading
          badge="Thách thức"
          title="Bạn đang gặp khó khăn khi tìm việc?"
          description="HireVision tập trung đúng vào những điểm nghẽn phổ biến nhất mà sinh viên và người mới đi làm thường gặp trong quá trình chuẩn bị ứng tuyển."
        />

        <motion.div
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={parentVariants}
        >
          {problemItems.map((item) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative rounded-2xl border border-slate-200/80 bg-slate-50 p-6 shadow-soft transition-all duration-300 hover:shadow-lg dark:border-white/5 dark:bg-slate-900/60"
              >
                {/* Border glow on hover */}
                <div className="absolute inset-0 rounded-2xl border border-primary-blue/0 group-hover:border-primary-blue/20 transition-colors duration-300" />
                
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-blue/10 to-primary-purple/10 text-primary-blue transition-transform duration-300 group-hover:scale-105 group-hover:text-primary-purple">
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <h3 className="mt-5 text-base font-bold text-slate-900 dark:text-white leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-secondary-text">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
