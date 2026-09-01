'use client';

import { useState, useEffect } from 'react';
import Container from '@/common/components/elements/Container';
import { useLanguage } from '@/common/context/LanguageContext';
import { FiSend, FiMessageSquare, FiHeart, FiUser } from 'react-icons/fi';

interface GuestMessage {
  id: string;
  name: string;
  message: string;
  date: string;
  avatarBg: string;
  likes: number;
}

const INITIAL_MESSAGES: GuestMessage[] = [
  {
    id: 'msg-1',
    name: 'Andi Saputra',
    message: 'Portofolionya keren banget Mas Rizki! Animasinya sangat responsif dan informatif. Sukses terus!',
    date: '31 Agustus 2026',
    avatarBg: 'bg-emerald-500',
    likes: 5,
  },
  {
    id: 'msg-2',
    name: 'Sarah Wijaya',
    message: 'Great work on the GEGARES platform and Berkah Mulia catalog! Clean UI and solid Laravel backend architecture.',
    date: '28 Agustus 2026',
    avatarBg: 'bg-indigo-500',
    likes: 8,
  },
  {
    id: 'msg-3',
    name: 'Budi Kurniawan',
    message: 'Sangat terinspirasi dengan dedikasi IT Support & Web Engineering-nya. Semoga makin sukses karirnya!',
    date: '24 Agustus 2026',
    avatarBg: 'bg-purple-500',
    likes: 3,
  },
];

const AVATAR_COLORS = [
  'bg-emerald-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-amber-500',
  'bg-cyan-500',
  'bg-rose-500',
];

export default function GuestbookPage() {
  const { locale } = useLanguage();
  const [messages, setMessages] = useState<GuestMessage[]>(INITIAL_MESSAGES);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('guestbook_messages_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newMsg: GuestMessage = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      avatarBg: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
      likes: 1,
    };

    const updated = [newMsg, ...messages];
    setMessages(updated);
    setName('');
    setMessage('');

    try {
      localStorage.setItem('guestbook_messages_v3', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleLike = (id: string) => {
    const isAlreadyLiked = likedMap[id];
    setLikedMap((prev) => ({ ...prev, [id]: !isAlreadyLiked }));

    const updated = messages.map((m) => {
      if (m.id === id) {
        return { ...m, likes: isAlreadyLiked ? m.likes - 1 : m.likes + 1 };
      }
      return m;
    });
    setMessages(updated);

    try {
      localStorage.setItem('guestbook_messages_v3', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full py-4 md:py-8">
      <Container className="max-w-[960px]">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-neutral-900 dark:text-white text-3xl md:text-5xl font-brak font-bold tracking-tight mb-2">
            {locale === 'id' ? 'Buku Tamu' : 'Guestbook'}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-xl">
            {locale === 'id'
              ? 'Tinggalkan pesan, salam perkenalan, saran, atau sekadar menyapa di buku tamu saya!'
              : 'Leave a note, feedback, greeting, or just say hello in my guestbook!'}
          </p>
        </div>

        {/* Input Form Card */}
        <div className="relative rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#121622] p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] mb-10 overflow-hidden">
          <h2 className="text-lg md:text-xl font-brak font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
            <FiMessageSquare className="text-primary" />
            <span>{locale === 'id' ? 'Tulis Pesan Baru' : 'Write a Note'}</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                {locale === 'id' ? 'Nama Anda' : 'Your Name'}
              </label>
              <div className="relative flex items-center">
                <FiUser className="absolute left-3.5 text-neutral-400 h-4 w-4" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={locale === 'id' ? 'Nama atau username Anda...' : 'Your name or alias...'}
                  required
                  className="w-full rounded-2xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-[#1a202c] pl-10 pr-4 py-3 text-sm text-neutral-900 dark:text-white outline-none transition-all placeholder:text-neutral-500 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                {locale === 'id' ? 'Pesan / Catatan' : 'Message / Note'}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={locale === 'id' ? 'Tuliskan pesan ramah Anda di sini...' : 'Type your friendly note here...'}
                rows={3}
                required
                className="w-full rounded-2xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-[#1a202c] p-3.5 text-sm text-neutral-900 dark:text-white outline-none transition-all placeholder:text-neutral-500 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 px-6 py-3 text-sm font-bold shadow-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{locale === 'id' ? 'Kirim Pesan' : 'Submit Note'}</span>
              <FiSend className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Message Feed */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">
            {locale === 'id' ? `Pesan Komunitas (${messages.length})` : `Community Notes (${messages.length})`}
          </h3>

          {messages.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border-2 border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0f1422] p-5 shadow-sm transition-all hover:border-indigo-400/50 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${item.avatarBg} font-brak font-bold text-white shadow-sm`}>
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white leading-tight">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      {item.date}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleLike(item.id)}
                  aria-label="Like message"
                  className="flex items-center gap-1.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 px-2.5 py-1 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-rose-500 transition-colors cursor-pointer"
                >
                  <FiHeart className={cn('h-3.5 w-3.5', likedMap[item.id] ? 'fill-rose-500 text-rose-500' : '')} />
                  <span>{item.likes}</span>
                </button>
              </div>

              <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed pl-13">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
