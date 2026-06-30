import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Mic, Route, Sparkles, CheckCircle2, AlertTriangle, 
  Send, Bot, ChevronRight, Play, RefreshCw, Trophy, BookOpen, Clock, Lock 
} from 'lucide-react';

type TabType = 'cv' | 'interview' | 'roadmap';

type InteractiveDemoProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
};

export default function InteractiveDemo({ isLoggedIn, setIsLoggedIn }: InteractiveDemoProps) {
  const [activeTab, setActiveTab] = useState<TabType>('cv');

  // Inline Login States
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlinePassword, setInlinePassword] = useState('');
  const [inlineError, setInlineError] = useState('');

  const handleInlineLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setInlineError('');

    if (inlineEmail.trim() === 'demo1@gmail.com' && inlinePassword === 'admin') {
      setIsLoggedIn(true);
      setInlineEmail('');
      setInlinePassword('');
    } else {
      setInlineError('Tài khoản hoặc mật khẩu không chính xác.');
    }
  };

  // --- TAB 1: CV STATES ---
  const [cvStep, setCvStep] = useState<'idle' | 'scanning' | 'results'>('idle');
  const [cvScore, setCvScore] = useState(0);
  const [selectedCvType, setSelectedCvType] = useState<'dev' | 'marketing'>('dev');

  const cvSamples = {
    dev: {
      original: "Đã làm website bán hàng bằng React. Sửa lỗi CSS và code thêm tính năng giỏ hàng.",
      optimized: "Phát triển E-commerce Web App (React/Redux), tối ưu re-render giúp tăng tốc độ tải trang lên 35% và giảm tỷ lệ thoát trang (bounce rate) của giỏ hàng đi 12%.",
      feedback: "Thiếu các chỉ số đo lường (metrics) và động từ hành động mạnh mẽ.",
      score: 88,
    },
    marketing: {
      original: "Viết bài fanpage cho câu lạc bộ trường. Đăng bài và trả lời tin nhắn của các bạn học sinh.",
      optimized: "Xây dựng chiến lược nội dung Fanpage đạt +145% lượng tiếp cận tự nhiên (organic reach), trực tiếp quản lý phản hồi và nâng cao mức độ tương tác (engagement rate) thêm 18%.",
      feedback: "Nội dung mô tả quá chung chung, chưa làm rõ kết quả cụ thể đạt được.",
      score: 85,
    }
  };

  const handleCvOptimize = () => {
    setCvStep('scanning');
    setCvScore(0);
    setTimeout(() => {
      setCvStep('results');
    }, 2500);
  };

  // Score counter animation
  useEffect(() => {
    if (cvStep === 'results') {
      const targetScore = cvSamples[selectedCvType].score;
      const interval = setInterval(() => {
        setCvScore((prev) => {
          if (prev >= targetScore) {
            clearInterval(interval);
            return targetScore;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [cvStep, selectedCvType]);

  // --- TAB 2: INTERVIEW STATES ---
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();
  const [interviewRole, setInterviewRole] = useState<'frontend' | 'pm'>('frontend');
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; feedback?: any }>>([
    { sender: 'ai', text: 'Xin chào! Tôi là AI Mock Interviewer. Bạn đã sẵn sàng chạy thử buổi phỏng vấn vị trí Frontend Developer Intern chưa?' }
  ]);
  const [interviewState, setInterviewState] = useState<'intro' | 'answering' | 'analyzed'>('intro');
  const [userAnswer, setUserAnswer] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const missingGeminiKeyMessage = 'Chưa cấu hình Gemini API key. Hãy thêm VITE_GEMINI_API_KEY vào file .env để dùng tính năng phỏng vấn AI.';

  const callGeminiAPI = async (
    history: Array<{ sender: 'ai' | 'user'; text: string }>,
    role: 'frontend' | 'pm'
  ) => {
    if (!geminiApiKey) {
      throw new Error('Missing Gemini API key');
    }

    // Format history for Gemini contents parameter (skip the first greeting message at index 0):
    const formattedContents = history.slice(1).map(item => ({
      role: item.sender === 'user' ? 'user' : 'model',
      parts: [{ text: item.text }]
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`;
    
    const systemInstructionText = `
Bạn là một AI phỏng vấn thử (Mock Interviewer) chuyên nghiệp của HireVision.
Nhiệm vụ của bạn là phỏng vấn ứng viên ứng tuyển vào vị trí: ${role === 'frontend' ? 'Frontend Developer Intern' : 'Product Manager Intern'}.

Hãy đóng vai là một nhà tuyển dụng/Tech Lead/Trưởng phòng sản phẩm nhiều kinh nghiệm.
Quy trình phỏng vấn:
1. Đọc tin nhắn/câu trả lời mới nhất từ ứng viên.
2. Nếu đây là câu trả lời của ứng viên cho câu hỏi chuyên môn bạn đặt ra trước đó, bạn phải phân tích câu trả lời theo mô hình STAR (Situation, Task, Action, Result) và trả về một đánh giá chi tiết (feedback) gồm điểm số (0 - 100), ưu điểm, nhược điểm/gợi ý.
3. Luôn đưa ra câu hỏi tiếp theo (nextQuestion) có tính chất thực tế và chuyên sâu hơn dựa trên câu trả lời hoặc định hướng của họ.

BẮT BUỘC: Câu trả lời của bạn CHỈ ĐƯỢC CHỨA duy nhất một chuỗi JSON thuần túy (không bọc trong khối code markdown \`\`\`json ... \`\`\`). Cấu trúc JSON bắt buộc như sau:
{
  "feedback": {
    "score": 85,
    "positives": ["Nêu bật được giải pháp kỹ thuật chính"],
    "suggestions": ["Cần bổ sung thêm chỉ số kết quả cụ thể (ví dụ: tốc độ tải trang tăng bao nhiêu %)"]
  },
  "nextQuestion": "Câu hỏi tiếp theo của bạn đặt ra ở đây..."
}

Lưu ý:
- Nếu ứng viên vừa bắt đầu phỏng vấn (không phải trả lời câu hỏi chuyên môn của bạn), hãy đặt trường "feedback" là null, và đặt "nextQuestion" là câu hỏi phỏng vấn đầu tiên (ví dụ: yêu cầu tự giới thiệu hoặc hỏi về dự án gần nhất).
- Toàn bộ nội dung trả về phải bằng Tiếng Việt tự nhiên, chuyên nghiệp.
`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: formattedContents,
        systemInstruction: {
          parts: [{ text: systemInstructionText }]
        },
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textResponse) {
      throw new Error("Không nhận được phản hồi văn bản từ Gemini.");
    }

    // Clean up potentially wrapped JSON in markdown code blocks:
    let cleanedText = textResponse.trim();
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.substring(7);
    }
    if (cleanedText.endsWith("```")) {
      cleanedText = cleanedText.substring(0, cleanedText.length - 3);
    }
    cleanedText = cleanedText.trim();

    return JSON.parse(cleanedText);
  };

  const startInterview = async () => {
    setInterviewState('answering');
    const startMsg = { sender: 'user' as const, text: 'Sẵn sàng, bắt đầu thôi!' };
    const updatedMessages = [...messages, startMsg];
    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      // Ask Gemini for the first question
      const result = await callGeminiAPI(updatedMessages, interviewRole);
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: result.nextQuestion }
      ]);
    } catch (error) {
      console.error("Lỗi khi kết nối Gemini khởi động:", error);
      setIsTyping(false);

      if (error instanceof Error && error.message === 'Missing Gemini API key') {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: missingGeminiKeyMessage
          }
        ]);
        return;
      }

      // Fallback:
      setMessages(prev => [
        ...prev,
        { 
          sender: 'ai', 
          text: interviewRole === 'frontend'
            ? 'Câu hỏi: Hãy giới thiệu về bản thân và một dự án React/Next.js gần đây mà bạn tâm đắc nhất?'
            : 'Câu hỏi: Hãy giới thiệu về bản thân và chia sẻ về một sản phẩm bạn từng tham gia phát triển?' 
        }
      ]);
    }
  };

  const submitAnswer = async () => {
    if (!userAnswer.trim()) return;
    const ans = userAnswer;
    const userMsg = { sender: 'user' as const, text: ans };
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages);
    setUserAnswer('');
    setIsTyping(true);

    try {
      const result = await callGeminiAPI(updatedMessages, interviewRole);
      setIsTyping(false);
      
      // If we got feedback, we can show it alongside the next question
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: result.nextQuestion,
          feedback: result.feedback || undefined
        }
      ]);
      setInterviewState('analyzed');
    } catch (error) {
      console.error("Lỗi khi gửi câu trả lời lên Gemini:", error);
      setIsTyping(false);

      if (error instanceof Error && error.message === 'Missing Gemini API key') {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: missingGeminiKeyMessage
          }
        ]);
        return;
      }

      // Fallback to static mock answer:
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'Cảm ơn câu trả lời của bạn! Bạn xử lý việc bất đồng ý kiến về giải pháp kỹ thuật với đồng nghiệp trong nhóm như thế nào?',
          feedback: {
            score: 82,
            positives: ['Cung cấp lời giải thích trực tiếp', 'Nhắc đến tính năng giỏ hàng'],
            suggestions: ['Hãy chia sẻ sâu hơn về khó khăn kỹ thuật cụ thể bạn gặp phải bằng mô hình STAR.']
          }
        }
      ]);
      setInterviewState('analyzed');
    }
  };

  // --- TAB 3: ROADMAP STATES ---
  const [roadmapRole, setRoadmapRole] = useState<'frontend' | 'pm'>('frontend');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const roadmapData = {
    frontend: [
      { id: '1', title: 'HTML, CSS & JS Cơ bản', status: 'completed', desc: 'Nắm vững DOM, Event Loop, Flexbox, Grid.', resources: 'MDN Web Docs, freeCodeCamp', duration: '2 tuần' },
      { id: '2', title: 'ReactJS & State Management', status: 'learning', desc: 'Hooks, Context API, Redux Toolkit.', resources: 'React Official Docs, Codecademy', duration: '3 tuần' },
      { id: '3', title: 'Tailwind CSS & UI Library', status: 'planned', desc: 'Xây dựng UI responsive nhanh chóng và nhất quán.', resources: 'TailwindCSS Docs, Headless UI', duration: '1 tuần' },
      { id: '4', title: 'Next.js & SEO Optimization', status: 'planned', desc: 'Server-side Rendering, Static Site Gen.', resources: 'Next.js Learn Dashboard', duration: '2 tuần' }
    ],
    pm: [
      { id: '1', title: 'Cơ bản về Agile & Scrum', status: 'completed', desc: 'Quy trình chạy sprint, viết User Story.', resources: 'Scrum Alliance, Coursera', duration: '2 tuần' },
      { id: '2', title: 'Phân tích số liệu (SQL & GA)', status: 'learning', desc: 'Viết câu lệnh SQL cơ bản, đọc phễu chuyển đổi.', resources: 'W3Schools, Google Analytics Academy', duration: '3 tuần' },
      { id: '3', title: 'Thiết kế Wireframe & Prototype', status: 'planned', desc: 'Sử dụng Figma vẽ User Flow nhanh.', resources: 'Figma Youtube channel', duration: '1 tuần' },
      { id: '4', title: 'Phỏng vấn Product Case Study', status: 'planned', desc: 'Cách phân tích vấn đề và đề xuất tính năng.', resources: 'Product School articles', duration: '2 tuần' }
    ]
  };

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white/95 p-5 shadow-[0_20px_50px_rgba(148,163,184,0.12)] dark:border-white/10 dark:bg-slate-900/95 dark:shadow-[0_20px_60px_rgba(3,7,18,0.6)]">
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary-blue/50 to-transparent" />
      
      {!isLoggedIn ? (
        <motion.div
          key="widget-login"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="min-h-[380px] flex flex-col justify-center max-w-sm mx-auto w-full space-y-4 py-4"
        >
          <div className="text-center space-y-1">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-blue/10 text-primary-blue dark:bg-primary-blue/20 dark:text-accent-glow">
              <Lock className="h-4.5 w-4.5" />
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">Đăng nhập tài khoản</h3>
            <p className="text-[10px] text-slate-500 dark:text-secondary-text">Bạn cần đăng nhập tài khoản nội bộ để sử dụng HireVision</p>
          </div>

          {inlineError && (
            <div className="flex items-start gap-1.5 rounded-lg bg-rose-500/10 p-2.5 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-[10px]">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              <span>{inlineError}</span>
            </div>
          )}

          <form onSubmit={handleInlineLogin} className="space-y-3">
            <div>
              <input
                type="email"
                required
                value={inlineEmail}
                onChange={(e) => setInlineEmail(e.target.value)}
                placeholder="Email đăng nhập"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3.5 text-xs focus:border-primary-blue focus:bg-white focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:border-accent-glow"
              />
            </div>
            <div>
              <input
                type="password"
                required
                value={inlinePassword}
                onChange={(e) => setInlinePassword(e.target.value)}
                placeholder="Mật khẩu"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3.5 text-xs focus:border-primary-blue focus:bg-white focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:border-accent-glow"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-primary-blue to-primary-purple py-2.5 text-xs font-semibold text-white shadow shadow-primary-blue/20 hover:opacity-90 animate-pulse-glow"
            >
              Đăng nhập hệ thống
            </button>
          </form>
        </motion.div>
      ) : (
        <>
          {/* Tabs Header */}
          <div className="flex border-b border-slate-200/60 pb-4 dark:border-white/10">
        <div className="grid w-full grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-950/60">
          {(['cv', 'interview', 'roadmap'] as TabType[]).map((tab) => {
            const isActive = activeTab === tab;
            const labels = { cv: 'CV Optimizer', interview: 'Interview', roadmap: 'Roadmap AI' };
            const icons = { cv: FileText, interview: Mic, roadmap: Route };
            const Icon = icons[tab];

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-semibold transition-all duration-300 ${
                  isActive 
                    ? 'bg-white text-primary-blue shadow-sm dark:bg-slate-900 dark:text-accent-glow'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{labels[tab]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabs Content */}
      <div className="mt-5 min-h-[360px]">
        <AnimatePresence mode="wait">
          {/* TAB 1: CV OPTIMIZER */}
          {activeTab === 'cv' && (
            <motion.div
              key="cv"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Demo tối ưu CV</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setSelectedCvType('dev'); setCvStep('idle'); }}
                    className={`rounded-full px-3 py-1 text-xs font-medium border transition ${
                      selectedCvType === 'dev' 
                        ? 'border-primary-blue/30 bg-primary-blue/10 text-primary-blue dark:border-accent-glow/30 dark:bg-accent-glow/10 dark:text-accent-glow' 
                        : 'border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Tech CV
                  </button>
                  <button 
                    onClick={() => { setSelectedCvType('marketing'); setCvStep('idle'); }}
                    className={`rounded-full px-3 py-1 text-xs font-medium border transition ${
                      selectedCvType === 'marketing' 
                        ? 'border-primary-blue/30 bg-primary-blue/10 text-primary-blue dark:border-accent-glow/30 dark:bg-accent-glow/10 dark:text-accent-glow' 
                        : 'border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Biz CV
                  </button>
                </div>
              </div>

              {cvStep === 'idle' && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/5 dark:bg-slate-950/40">
                    <p className="text-xs font-semibold text-rose-500 dark:text-rose-400 flex items-center gap-1.5 mb-2">
                      <AlertTriangle className="h-3.5 w-3.5" /> Mô tả gốc trong CV của bạn:
                    </p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 italic">
                      "{cvSamples[selectedCvType].original}"
                    </p>
                  </div>
                  <button
                    onClick={handleCvOptimize}
                    className="shimmer-btn relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary-blue to-primary-purple py-3 text-sm font-semibold text-white shadow-lg shadow-primary-blue/20"
                  >
                    Tối ưu bằng AI ngay
                  </button>
                </div>
              )}

              {cvStep === 'scanning' && (
                <div className="relative flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-16 dark:border-white/10 dark:bg-slate-950/20">
                  <div className="laser-scanner" />
                  <RefreshCw className="h-10 w-10 text-primary-blue animate-spin dark:text-accent-glow" />
                  <p className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300 animate-pulse">
                    AI đang chấm điểm và cấu trúc lại câu cú...
                  </p>
                </div>
              )}

              {cvStep === 'results' && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="grid items-center gap-4 sm:grid-cols-[100px_1fr]">
                    {/* Radial Progress */}
                    <div className="relative mx-auto h-24 w-24">
                      <svg className="h-24 w-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="transparent"
                          className="text-slate-200 dark:text-slate-800"
                        />
                        <motion.circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="url(#grad)"
                          strokeWidth="6"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 40}
                          strokeDashoffset={2 * Math.PI * 40 * (1 - cvScore / 100)}
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#2563eb" />
                            <stop offset="100%" stopColor="#7c3aed" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-slate-900 dark:text-white">{cvScore}%</span>
                        <span className="text-[9px] uppercase tracking-wider text-slate-400">Score</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Sparkles className="h-4 w-4" /> AI Suggestion
                      </h4>
                      <p className="mt-1 text-xs text-slate-500 dark:text-secondary-text">
                        Tăng điểm nhờ tối ưu hóa từ khóa và bổ sung chỉ số định lượng.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-xl bg-rose-50/70 p-3 border border-rose-100 dark:bg-rose-950/10 dark:border-rose-950/20">
                      <p className="text-[11px] font-bold text-rose-500 uppercase tracking-wider">Hạn chế phát hiện:</p>
                      <p className="mt-1 text-xs text-slate-700 dark:text-slate-300">{cvSamples[selectedCvType].feedback}</p>
                    </div>

                    <div className="rounded-xl bg-emerald-50/70 p-3 border border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-950/20">
                      <p className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider">Phiên bản tối ưu từ AI:</p>
                      <p className="mt-1 text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        "{cvSamples[selectedCvType].optimized}"
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCvStep('idle')}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900/60"
                  >
                    Thử lại với nội dung khác
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* TAB 2: INTERVIEW */}
          {activeTab === 'interview' && (
            <motion.div
              key="interview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col h-[380px]"
            >
              <div className="flex items-center justify-between mb-3 shrink-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Phỏng vấn thử AI</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      if (interviewState === 'intro') {
                        setInterviewRole('frontend');
                        setMessages([{ sender: 'ai', text: 'Xin chào! Tôi là AI Mock Interviewer. Bạn đã sẵn sàng chạy thử buổi phỏng vấn vị trí Frontend Developer Intern chưa?' }]);
                      }
                    }}
                    disabled={interviewState !== 'intro'}
                    className={`rounded-full px-3 py-1 text-[10px] font-medium border transition ${
                      interviewRole === 'frontend' 
                        ? 'border-primary-blue/30 bg-primary-blue/10 text-primary-blue dark:border-accent-glow/30 dark:bg-accent-glow/10 dark:text-accent-glow' 
                        : 'border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 opacity-60'
                    }`}
                  >
                    Tech (Frontend)
                  </button>
                  <button 
                    onClick={() => {
                      if (interviewState === 'intro') {
                        setInterviewRole('pm');
                        setMessages([{ sender: 'ai', text: 'Xin chào! Tôi là AI Mock Interviewer. Bạn đã sẵn sàng chạy thử buổi phỏng vấn vị trí Product Manager Intern chưa?' }]);
                      }
                    }}
                    disabled={interviewState !== 'intro'}
                    className={`rounded-full px-3 py-1 text-[10px] font-medium border transition ${
                      interviewRole === 'pm' 
                        ? 'border-primary-blue/30 bg-primary-blue/10 text-primary-blue dark:border-accent-glow/30 dark:bg-accent-glow/10 dark:text-accent-glow' 
                        : 'border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 opacity-60'
                    }`}
                  >
                    Biz (PM)
                  </button>
                </div>
              </div>

              {/* Chat box body */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                {messages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-blue to-primary-purple text-white">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-primary-blue text-white rounded-tr-none'
                        : 'bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-200 rounded-tl-none border border-slate-200/50 dark:border-white/5'
                    }`}>
                      <p>{msg.text}</p>
                      
                      {/* Analysis feedback popup inside chat */}
                      {msg.feedback && (
                        <div className="mt-3 border-t border-slate-200/60 pt-3 dark:border-white/10 space-y-2">
                          <div className="flex items-center gap-1.5">
                            <Trophy className="h-4 w-4 text-amber-500" />
                            <span className="font-bold text-slate-900 dark:text-white">Điểm tự tin: {msg.feedback.score}/100</span>
                          </div>
                          <div>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400 block">Ưu điểm:</span>
                            <ul className="list-disc pl-4 space-y-0.5 mt-0.5 text-slate-600 dark:text-secondary-text">
                              {msg.feedback.positives.map((pos: string, idx: number) => (
                                <li key={idx}>{pos}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="font-semibold text-rose-500 block">AI Gợi ý bổ sung:</span>
                            <ul className="list-disc pl-4 space-y-0.5 mt-0.5 text-slate-600 dark:text-secondary-text">
                              {msg.feedback.suggestions.map((sug: string, idx: number) => (
                                <li key={idx}>{sug}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-2.5 justify-start">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-blue to-primary-purple text-white">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-2xl bg-slate-100 px-3.5 py-2.5 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5">
                      <span className="inline-flex gap-1 items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input panel */}
              <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-white/10">
                {interviewState === 'intro' ? (
                  <button
                    onClick={startInterview}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-blue to-primary-purple py-3 text-sm font-semibold text-white shadow shadow-primary-blue/15"
                  >
                    <Play className="h-4 w-4" /> Bắt đầu phỏng vấn thử
                  </button>
                ) : interviewState === 'answering' ? (
                  <div className="space-y-2">
                    {/* Quick answers for testing convenience */}
                    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      <button 
                        onClick={() => setUserAnswer("Tôi đã làm một ứng dụng React. Tôi dùng useMemo để cache kết quả tính toán đắt đỏ, tránh re-render không đáng có.")}
                        className="shrink-0 rounded-full border border-slate-200 px-3 py-1 text-[10px] text-slate-600 hover:bg-slate-50 dark:border-white/5 dark:text-slate-400 dark:hover:bg-slate-800"
                      >
                        ⚡ Câu trả lời mẫu (Tốt)
                      </button>
                      <button 
                        onClick={() => setUserAnswer("Dự án của tôi là web phim. Tôi gặp lỗi giật lag khi tải nhiều ảnh.")}
                        className="shrink-0 rounded-full border border-slate-200 px-3 py-1 text-[10px] text-slate-600 hover:bg-slate-50 dark:border-white/5 dark:text-slate-400 dark:hover:bg-slate-800"
                      >
                        ⚠️ Câu trả lời ngắn (Cần cải thiện)
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && submitAnswer()}
                        placeholder="Nhập câu trả lời của bạn..."
                        className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs focus:border-primary-blue focus:bg-white focus:outline-none dark:border-white/10 dark:bg-slate-950 dark:text-white dark:focus:border-accent-glow"
                      />
                      <button
                        onClick={submitAnswer}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-blue text-white shadow shadow-primary-blue/20 hover:bg-blue-600"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMessages([{ 
                        sender: 'ai', 
                        text: interviewRole === 'frontend' 
                          ? 'Xin chào! Tôi là AI Mock Interviewer. Bạn đã sẵn sàng chạy thử buổi phỏng vấn vị trí Frontend Developer Intern chưa?'
                          : 'Xin chào! Tôi là AI Mock Interviewer. Bạn đã sẵn sàng chạy thử buổi phỏng vấn vị trí Product Manager Intern chưa?'
                      }]);
                      setInterviewState('intro');
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300"
                  >
                    Reset & Làm phỏng vấn mới
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 3: CAREER ROADMAP */}
          {activeTab === 'roadmap' && (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Mô phỏng Lộ trình AI</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setRoadmapRole('frontend'); setSelectedNode(null); }}
                    className={`rounded-full px-3 py-1 text-xs font-medium border transition ${
                      roadmapRole === 'frontend' 
                        ? 'border-primary-blue/30 bg-primary-blue/10 text-primary-blue dark:border-accent-glow/30 dark:bg-accent-glow/10 dark:text-accent-glow' 
                        : 'border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Frontend Dev
                  </button>
                  <button
                    onClick={() => { setRoadmapRole('pm'); setSelectedNode(null); }}
                    className={`rounded-full px-3 py-1 text-xs font-medium border transition ${
                      roadmapRole === 'pm' 
                        ? 'border-primary-blue/30 bg-primary-blue/10 text-primary-blue dark:border-accent-glow/30 dark:bg-accent-glow/10 dark:text-accent-glow' 
                        : 'border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Product Manager
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                {/* Node Tree list */}
                <div className="relative space-y-3 pl-4">
                  {/* Glowing vertical line */}
                  <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-emerald-500 via-primary-blue to-slate-200 dark:to-slate-800" />
                  
                  {roadmapData[roadmapRole].map((node, index) => {
                    const isSelected = selectedNode === node.id;
                    return (
                      <motion.div
                        key={node.id}
                        onClick={() => setSelectedNode(node.id)}
                        whileHover={{ x: 3 }}
                        className={`relative flex items-center gap-3 cursor-pointer rounded-xl border p-2.5 transition ${
                          isSelected
                            ? 'border-primary-blue/50 bg-primary-blue/[0.03] dark:border-accent-glow/50 dark:bg-accent-glow/[0.04]'
                            : 'border-slate-100 bg-white hover:border-slate-200 dark:border-white/5 dark:bg-slate-950/40 dark:hover:border-white/10'
                        }`}
                      >
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                          node.status === 'completed' 
                            ? 'bg-emerald-500' 
                            : node.status === 'learning' 
                              ? 'bg-primary-blue' 
                              : 'bg-slate-300 dark:bg-slate-700'
                        }`}>
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">{node.title}</p>
                          <span className={`text-[9px] uppercase font-bold ${
                            node.status === 'completed' 
                              ? 'text-emerald-500' 
                              : node.status === 'learning' 
                                ? 'text-primary-blue dark:text-accent-glow animate-pulse' 
                                : 'text-slate-400'
                          }`}>
                            {node.status === 'completed' ? 'Hoàn thành' : node.status === 'learning' ? 'Đang học' : 'Lên kế hoạch'}
                          </span>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                      </motion.div>
                    );
                  })}
                </div>

                {/* Node details card */}
                <div className="flex items-center justify-center rounded-2xl border border-slate-200/60 bg-slate-50/50 p-4 dark:border-white/5 dark:bg-slate-950/20">
                  <AnimatePresence mode="wait">
                    {selectedNode ? (
                      (() => {
                        const node = roadmapData[roadmapRole].find(n => n.id === selectedNode);
                        if (!node) return null;
                        return (
                          <motion.div
                            key={node.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-3 w-full"
                          >
                            <h4 className="text-xs font-bold text-primary-blue dark:text-accent-glow flex items-center gap-1.5">
                              <BookOpen className="h-4 w-4" /> Chi tiết chặng học
                            </h4>
                            <p className="text-sm font-semibold text-slate-950 dark:text-white leading-tight">{node.title}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{node.desc}</p>
                            
                            <div className="border-t border-slate-200/60 dark:border-white/5 pt-2 space-y-1.5 text-[11px]">
                              <p className="text-slate-500 dark:text-secondary-text">
                                <strong className="text-slate-700 dark:text-slate-300">Tài liệu khuyên học:</strong> {node.resources}
                              </p>
                              <p className="text-slate-500 dark:text-secondary-text flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5 text-slate-400" />
                                <strong className="text-slate-700 dark:text-slate-300">Thời gian dự kiến:</strong> {node.duration}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })()
                    ) : (
                      <div className="text-center p-3 text-xs text-slate-400 dark:text-slate-500">
                        <Sparkles className="h-5 w-5 mx-auto mb-2 text-primary-blue/30 dark:text-accent-glow/30" />
                        Chọn một chặng học ở cột trái để xem lộ trình học tập, tài nguyên tự học và bài tập lớn.
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
        </>
      )}
    </div>
  );
}
