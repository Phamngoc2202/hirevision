import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

const steps = [
  {
    step: '01',
    title: 'Tạo tài khoản miễn phí',
    description:
      'Khởi tạo hồ sơ trong vài phút để lưu trữ hành trình nghề nghiệp của bạn trên một nền tảng.',
  },
  {
    step: '02',
    title: 'Tải CV hoặc nhập mục tiêu',
    description:
      'Đưa CV hiện tại hoặc mô tả công việc mong muốn để AI hiểu rõ bối cảnh và mục tiêu phát triển.',
  },
  {
    step: '03',
    title: 'Nhận gợi ý từ AI',
    description:
      'Nhận điểm CV, đề xuất cải thiện, mock interview và roadmap kỹ năng được cá nhân hóa.',
  },
  {
    step: '04',
    title: 'Luyện tập và ứng tuyển',
    description:
      'Theo dõi tiến độ, cải thiện liên tục và bước vào quy trình tuyển dụng với sự tự tin cao hơn.',
  },
];

const parentVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

export default function Steps() {
  return (
    <section
      id="roadmap"
      className="bg-slate-50 py-20 dark:border-t dark:border-white/5 dark:bg-slate-950 sm:py-24 overflow-hidden"
    >
      <div className="section-shell">
        <SectionHeading
          badge="How it works"
          title="Bắt đầu với HireVision chỉ trong 4 bước"
          description="Quy trình gọn, rõ ràng và thân thiện để bạn sớm nhận được phân tích từ AI, sau đó cải thiện từng phần theo đúng mục tiêu nghề nghiệp."
        />

        <motion.div
          className="relative mt-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          variants={parentVariants}
        >
          {/* Glowing connecting line in desktop */}
          <div className="absolute left-8 top-12 hidden h-0.5 w-[calc(100%-4rem)] bg-gradient-to-r from-primary-blue/20 via-primary-purple/30 to-primary-blue/20 lg:block dark:from-primary-blue/10 dark:via-primary-purple/20 dark:to-primary-blue/10" />
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item) => (
              <motion.article
                key={item.step}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft dark:border-white/5 dark:bg-slate-900/40"
              >
                {/* Number badge */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-blue to-primary-purple font-display text-base font-bold text-white shadow-lg shadow-primary-blue/25 transition-transform duration-300 group-hover:scale-105">
                  {item.step}
                </div>
                
                <h3 className="mt-6 text-base font-bold text-slate-900 dark:text-white leading-tight">
                  {item.title}
                </h3>
                
                <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-secondary-text">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
