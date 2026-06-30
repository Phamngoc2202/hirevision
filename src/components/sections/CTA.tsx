import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

export default function CTA() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1500);
  };

  return (
    <section
      id="gia-ca"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.06),transparent_28%),linear-gradient(180deg,#eef4ff_0%,#e4ecff_100%)] py-20 dark:border-t dark:border-white/5 dark:bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.12),transparent_28%),linear-gradient(180deg,#030712_0%,#090d16_100%)] sm:py-24"
    >
      {/* Background glowing blob */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-blue/15 blur-[90px] pointer-events-none"
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      
      <div className="section-shell relative z-10">
        <motion.div
          className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white/70 px-6 py-12 text-center shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-gradient-to-br dark:from-slate-900/60 dark:via-slate-900/40 dark:to-slate-950/80 dark:shadow-[0_24px_100px_rgba(37,99,235,0.15)] sm:px-12 sm:py-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-blue/15 bg-primary-blue/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-primary-blue dark:border-white/10 dark:bg-white/5 dark:text-accent-glow">
            <Sparkles className="h-3.5 w-3.5 text-primary-purple animate-spin" />
            Free to start
          </span>
          
          <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-[2.75rem] leading-tight">
            Sẵn sàng nâng cấp hành trình sự nghiệp của bạn?
          </h2>
          
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-secondary-text sm:text-base">
            Bắt đầu miễn phí hôm nay, tham gia cùng hàng ngàn sinh viên tự tin chinh phục nhà tuyển dụng nhờ sự trợ giúp của AI.
          </p>

          <div className="mt-10 max-w-md mx-auto">
            {subscribed ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500/10 p-4 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
              >
                <CheckCircle className="h-5 w-5 shrink-0" />
                <span className="text-sm font-semibold">Đăng ký thành công! Chúng tôi đã gửi email kích hoạt.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn..."
                  className="flex-1 rounded-full border border-slate-200/80 bg-white/90 px-5 py-3.5 text-sm focus:border-primary-blue focus:bg-white focus:outline-none dark:border-white/10 dark:bg-slate-950/90 dark:text-white dark:focus:border-accent-glow"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="shimmer-btn relative overflow-hidden rounded-full bg-gradient-to-r from-primary-blue to-primary-purple px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-primary-blue/20 hover:shadow-primary-purple/30 shrink-0 flex items-center justify-center gap-2"
                >
                  {loading ? 'Đang gửi...' : 'Đăng ký ngay'}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            )}
          </div>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-slate-500 dark:text-secondary-text">
            <span>✓ Không cần thẻ tín dụng</span>
            <span>✓ Bản dùng thử miễn phí đầy đủ</span>
            <span>✓ Hỗ trợ 24/7</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
