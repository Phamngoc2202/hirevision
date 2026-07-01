import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, FileText, Mic, Sparkles, WalletCards } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Starter',
    credits: '100 Credits',
    price: '99.000 VNĐ',
    badge: 'Phù hợp để bắt đầu',
    accent:
      'border-slate-200/80 bg-white/92 text-slate-950 dark:border-white/10 dark:bg-slate-950/50 dark:text-white',
    button:
      'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800',
  },
  {
    name: 'Standard',
    credits: '250 Credits',
    price: '199.000 VNĐ',
    badge: 'Tiết kiệm phổ biến',
    accent:
      'border-primary-blue/30 bg-gradient-to-br from-primary-blue/10 via-white/95 to-primary-purple/10 text-slate-950 shadow-[0_20px_60px_rgba(37,99,235,0.14)] dark:border-accent-glow/30 dark:from-primary-blue/20 dark:via-slate-900/95 dark:to-primary-purple/20 dark:text-white',
    button:
      'bg-gradient-to-r from-primary-blue to-primary-purple text-white shadow-md shadow-primary-blue/20 hover:shadow-primary-purple/30',
  },
  {
    name: 'Professional',
    credits: '600 Credits',
    price: '399.000 VNĐ',
    badge: 'Dành cho luyện tập chuyên sâu',
    accent:
      'border-slate-200/80 bg-white/92 text-slate-950 dark:border-white/10 dark:bg-slate-950/50 dark:text-white',
    button:
      'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800',
  },
] as const;

const creditUsage = [
  {
    title: 'AI Interview Simulator',
    value: '2 Credits/phút',
    icon: Mic,
    tone:
      'border-primary-blue/15 bg-primary-blue/10 text-primary-blue dark:border-primary-blue/20 dark:bg-primary-blue/15 dark:text-accent-glow',
  },
  {
    title: 'AI CV Review',
    value: '20 Credits/lần đánh giá',
    icon: FileText,
    tone:
      'border-emerald-500/15 bg-emerald-500/10 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-300',
  },
] as const;

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
      className="relative overflow-hidden bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08),transparent_24%),linear-gradient(180deg,#eef4ff_0%,#e4ecff_100%)] py-20 dark:border-t dark:border-white/5 dark:bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.14),transparent_24%),linear-gradient(180deg,#030712_0%,#090d16_100%)] sm:py-24"
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-blue/15 blur-[100px]"
        animate={{ opacity: [0.45, 0.8, 0.45], scale: [1, 1.08, 1] }}
        transition={{ duration: 5.5, repeat: Infinity }}
      />

      <div className="section-shell relative z-10">
        <motion.div
          className="overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-white/75 px-6 py-12 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-gradient-to-br dark:from-slate-900/65 dark:via-slate-900/45 dark:to-slate-950/80 dark:shadow-[0_24px_100px_rgba(37,99,235,0.15)] sm:px-12 sm:py-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-blue/15 bg-primary-blue/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-primary-blue dark:border-white/10 dark:bg-white/5 dark:text-accent-glow">
              <Sparkles className="h-3.5 w-3.5 text-primary-purple" />
              Pricing & Credits
            </span>

            <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-[2.75rem] leading-tight">
              Bảng giá theo credit, rõ ràng và dễ nâng cấp
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-secondary-text sm:text-base">
              Chọn gói credit phù hợp với tần suất luyện phỏng vấn và tối ưu CV của bạn. Bạn chỉ trả đúng theo mức sử dụng của từng tính năng AI.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className={`relative rounded-[2rem] border p-6 ${plan.accent}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-bold">{plan.name}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      {plan.badge}
                    </p>
                  </div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white">
                    <WalletCards className="h-5 w-5" />
                  </span>
                </div>

                <div className="mt-8">
                  <p className="text-sm font-semibold text-primary-blue dark:text-accent-glow">{plan.credits}</p>
                  <p className="mt-2 text-3xl font-extrabold tracking-tight">{plan.price}</p>
                </div>

                <div className="mt-8 space-y-3 text-sm text-slate-600 dark:text-secondary-text">
                  <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                    Phù hợp cho sinh viên muốn chủ động phân bổ credit giữa luyện phỏng vấn và review CV.
                  </div>
                </div>

                <button
                  type="button"
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${plan.button}`}
                >
                  Chọn gói này
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 rounded-[2rem] border border-slate-200/80 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/5 sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-200">
                <Sparkles className="h-3.5 w-3.5 text-primary-blue" />
                Mức sử dụng credit
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {creditUsage.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-slate-200/80 bg-white/95 p-5 dark:border-white/10 dark:bg-slate-950/60"
                  >
                    <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border ${item.tone}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400">{item.title}</p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-950 dark:text-white">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10 max-w-md mx-auto">
            {subscribed ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-600 dark:text-emerald-400"
              >
                <CheckCircle className="h-5 w-5 shrink-0" />
                <span className="text-sm font-semibold">Đăng ký thành công! Chúng tôi đã gửi email kích hoạt.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 sm:flex-row">
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
                  className="shimmer-btn relative flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary-blue to-primary-purple px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-primary-blue/20 hover:shadow-primary-purple/30"
                >
                  {loading ? 'Đang gửi...' : 'Đăng ký ngay'}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-slate-500 dark:text-secondary-text">
            <span>✓ Không cần thẻ tín dụng</span>
            <span>✓ Mua credit theo nhu cầu</span>
            <span>✓ Hỗ trợ 24/7</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
