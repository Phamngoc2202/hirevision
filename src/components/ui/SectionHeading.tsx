import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

type SectionHeadingProps = {
  badge: string;
  title: string;
  description: string;
  centered?: boolean;
};

const parentVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

export default function SectionHeading({ badge, title, description, centered = true }: SectionHeadingProps) {
  return (
    <motion.div
      className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={parentVariants}
    >
      <motion.span
        className="inline-flex items-center gap-1.5 rounded-full border border-primary-blue/15 bg-primary-blue/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-blue dark:border-primary-blue/25 dark:bg-primary-blue/15 dark:text-sky-200"
        variants={fadeUpVariants}
      >
        <Sparkles className="h-3.5 w-3.5 animate-pulse text-primary-purple" />
        {badge}
      </motion.span>
      
      <motion.h2
        className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-[2.5rem] leading-tight"
        variants={fadeUpVariants}
      >
        {title}
      </motion.h2>
      
      <motion.p
        className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base"
        variants={fadeUpVariants}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
