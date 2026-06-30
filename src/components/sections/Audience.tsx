import { motion } from 'framer-motion';
import { Briefcase, Code2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const audienceCards = [
  {
    title: 'Sinh viên & Fresher CNTT (Tech)',
    description:
      'Cần tối ưu CV theo dự án thực tế, luyện phỏng vấn thuật toán & kỹ thuật hệ thống, và xây dựng roadmap kỹ năng công nghệ (React, NodeJS, Go...) chuẩn chỉnh để pass các vòng phỏng vấn chuyên sâu.',
    icon: Code2,
    badge: 'Kỹ thuật chuyên sâu',
  },
  {
    title: 'Sinh viên Kinh tế / Marketing / Biz',
    description:
      'Cần CV ấn tượng làm nổi bật dự án cá nhân & các hoạt động ngoại khóa, rèn luyện kỹ năng phỏng vấn hành vi (behavioral questions), tình huống (case study) để tự tin ứng tuyển vào các tập đoàn lớn.',
    icon: Briefcase,
    badge: 'Tình huống thực tế',
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
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

export default function Audience() {
  return (
    <section className="bg-white py-20 dark:border-t dark:border-white/5 dark:bg-slate-950 sm:py-24 overflow-hidden">
      <div className="section-shell">
        <SectionHeading
          badge="Người dùng phù hợp"
          title="HireVision dành cho ai?"
          description="Được thiết kế để hỗ trợ sinh viên và người mới đi làm ở các nhóm ngành phổ biến, với nhu cầu chuẩn bị nghề nghiệp rất khác nhau."
        />

        <motion.div
          className="mt-14 grid gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          variants={parentVariants}
        >
          {audienceCards.map((item) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative rounded-3xl border border-slate-200/80 bg-slate-50 p-8 shadow-soft transition-all duration-300 dark:border-white/5 dark:bg-slate-900/40 hover:shadow-xl"
              >
                {/* Border glowing highlight */}
                <div className="absolute inset-0 rounded-3xl border border-primary-blue/0 group-hover:border-primary-blue/15 transition-colors duration-300" />

                <div className="flex flex-col justify-between h-full relative">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex rounded-2xl bg-gradient-to-br from-primary-blue/10 to-primary-purple/10 p-3.5 text-primary-blue transition-transform duration-300 group-hover:scale-105 group-hover:text-primary-purple">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full border border-primary-blue/15 bg-primary-blue/10 px-3.5 py-1 text-[10px] font-bold text-primary-blue dark:border-primary-blue/20 dark:bg-primary-blue/15 dark:text-sky-200">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                      {item.title}
                    </h3>
                    
                    <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-secondary-text">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Decorative underline */}
                  <div className="mt-8 h-1 w-12 rounded bg-gradient-to-r from-primary-blue to-primary-purple group-hover:w-20 transition-all duration-300" />
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
