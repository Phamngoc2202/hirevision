import { Bot } from 'lucide-react';

const footerGroups = [
  {
    title: 'Sản phẩm',
    links: ['Tính năng', 'Giá cả', 'Roadmap'],
  },
  {
    title: 'Tài nguyên',
    links: ['Blog', 'Hướng dẫn', 'FAQ'],
  },
  {
    title: 'Công ty',
    links: ['Giới thiệu', 'Liên hệ'],
  },
];

export default function Footer() {
  return (
    <footer
      id="blog"
      className="border-t border-slate-200 bg-white py-12 text-slate-600 dark:border-white/5 dark:bg-slate-950 dark:text-slate-400"
    >
      <div className="section-shell">
        <div className="grid gap-10 border-b border-slate-200 pb-10 dark:border-white/10 lg:grid-cols-[1.15fr_0.85fr_0.85fr_0.85fr]">
          <div>
            <a href="#trang-chu" className="group flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-blue to-primary-purple transition-transform duration-300 group-hover:scale-105">
                <Bot className="h-5 w-5 text-white" />
              </span>
              <div>
                <p className="font-display text-lg font-bold text-slate-950 dark:text-white">HireVision</p>
                <p className="text-xs text-slate-500 dark:text-secondary-text">AI Career Assistant</p>
              </div>
            </a>
            <p className="mt-5 max-w-sm text-xs leading-relaxed text-slate-600 dark:text-secondary-text">
              Nền tảng AI hỗ trợ tối ưu CV, luyện phỏng vấn và xây dựng roadmap nghề nghiệp cho sinh viên và người mới đi làm.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-slate-950 dark:text-white">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-3 text-xs text-slate-600 dark:text-secondary-text">
                {group.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#trang-chu" 
                      className="transition-colors duration-200 hover:text-slate-950 dark:hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-6 text-xs text-slate-500 dark:text-secondary-text sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 HireVision. All rights reserved.</p>
          <p>Built for students, fresher talent and career growth.</p>
        </div>
      </div>
    </footer>
  );
}
