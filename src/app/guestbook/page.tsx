'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Container from '@/common/components/elements/Container';
import { useLanguage } from '@/common/context/LanguageContext';
import {
  FiSend,
  FiMessageSquare,
  FiHeart,
  FiUser,
  FiLogOut,
  FiTrash2,
  FiShield,
  FiInfo,
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { cn } from '@/lib/utils';
import {
  auth,
  db,
  googleProvider,
  isFirebaseConfigured,
} from '@/common/libs/firebase';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  increment,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Timestamp,
} from 'firebase/firestore';

interface GuestMessage {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  message: string;
  date: string;
  avatarBg: string;
  likes: number;
  userId?: string;
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

function formatFirebaseDate(ts: Timestamp | null | undefined, locale: string): string {
  if (!ts) {
    return locale === 'id' ? 'Baru saja' : 'Just now';
  }
  const date = ts.toDate();
  return date.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function GuestbookPage() {
  const { locale } = useLanguage();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [messages, setMessages] = useState<GuestMessage[]>(INITIAL_MESSAGES);
  const [guestName, setGuestName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Monitor Auth state
  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setAuthLoading(false);
      });
      return () => unsubscribe();
    } catch {
      setAuthLoading(false);
    }
  }, []);

  // Monitor Firestore real-time messages
  useEffect(() => {
    if (!isFirebaseConfigured) {
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
      return;
    }

    try {
      const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const list: GuestMessage[] = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
              return {
                id: docSnap.id,
                name: data.name || 'Anonymous',
                email: data.email || '',
                avatarUrl: data.avatarUrl || '',
                message: data.message || '',
                date: formatFirebaseDate(data.createdAt, locale),
                avatarBg: data.avatarBg || 'bg-indigo-500',
                likes: data.likes || 0,
                userId: data.userId || '',
              };
            });
            setMessages(list);
          } else {
            setMessages(INITIAL_MESSAGES);
          }
        },
        (error) => {
          console.warn('Firestore snapshot error (check security rules / offline):', error);
        }
      );
      return () => unsubscribe();
    } catch (err) {
      console.warn('Firestore init error:', err);
    }
  }, [locale]);

  // Load liked items from localStorage
  useEffect(() => {
    try {
      const savedLikes = localStorage.getItem('guestbook_liked_map_v3');
      if (savedLikes) {
        setLikedMap(JSON.parse(savedLikes));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSignInGoogle = async () => {
    setErrorMessage(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user' || err?.code === 'auth/cancelled-popup-request') {
        return; // User cancelled / closed popup manually
      }
      console.error('Google Sign-In Error:', err);
      setErrorMessage(
        err?.code === 'auth/configuration-not-found'
          ? 'Google Sign-In belum diaktifkan di Firebase Console.'
          : err.message || 'Gagal login dengan Google.'
      );
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign Out Error:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = currentUser?.displayName || guestName.trim();
    const finalMsg = message.trim();

    if (!finalName || !finalMsg) return;

    setSubmitting(true);
    setErrorMessage(null);

    const randomBg = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

    if (isFirebaseConfigured) {
      try {
        await addDoc(collection(db, 'guestbook'), {
          name: finalName,
          email: currentUser?.email || '',
          avatarUrl: currentUser?.photoURL || '',
          message: finalMsg,
          avatarBg: randomBg,
          likes: 1,
          userId: currentUser?.uid || null,
          createdAt: serverTimestamp(),
        });
        setMessage('');
        setGuestName('');
      } catch (err: any) {
        console.error('Firestore addDoc error:', err);
        setErrorMessage(err.message || 'Gagal mengirim pesan. Pastikan aturan (Security Rules) Firestore mengizinkan penulisan.');
      } finally {
        setSubmitting(false);
      }
    } else {
      // Fallback local storage
      const newMsg: GuestMessage = {
        id: `msg-${Date.now()}`,
        name: finalName,
        avatarUrl: currentUser?.photoURL || undefined,
        message: finalMsg,
        date: new Date().toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        avatarBg: randomBg,
        likes: 1,
        userId: currentUser?.uid || undefined,
      };
      const updated = [newMsg, ...messages];
      setMessages(updated);
      setMessage('');
      setGuestName('');
      setSubmitting(false);
      try {
        localStorage.setItem('guestbook_messages_v3', JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
  };

  const handleLike = async (id: string) => {
    const isAlreadyLiked = likedMap[id];
    const newLikedMap = { ...likedMap, [id]: !isAlreadyLiked };
    setLikedMap(newLikedMap);

    try {
      localStorage.setItem('guestbook_liked_map_v3', JSON.stringify(newLikedMap));
    } catch {
      // ignore
    }

    if (isFirebaseConfigured && !id.startsWith('msg-')) {
      try {
        const docRef = doc(db, 'guestbook', id);
        await updateDoc(docRef, {
          likes: increment(isAlreadyLiked ? -1 : 1),
        });
      } catch (err) {
        console.error('Like error:', err);
      }
    } else {
      setMessages((prev) =>
        prev.map((m) => {
          if (m.id === id) {
            return { ...m, likes: isAlreadyLiked ? Math.max(0, m.likes - 1) : m.likes + 1 };
          }
          return m;
        })
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(locale === 'id' ? 'Apakah Anda yakin ingin menghapus pesan ini?' : 'Are you sure you want to delete this message?')) {
      return;
    }

    if (isFirebaseConfigured && !id.startsWith('msg-')) {
      try {
        await deleteDoc(doc(db, 'guestbook', id));
      } catch (err: any) {
        alert(err.message || 'Gagal menghapus pesan.');
      }
    } else {
      const updated = messages.filter((m) => m.id !== id);
      setMessages(updated);
      try {
        localStorage.setItem('guestbook_messages_v3', JSON.stringify(updated));
      } catch {
        // ignore
      }
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

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-500 flex items-start gap-3">
            <FiInfo className="h-5 w-5 shrink-0 mt-0.5" />
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Input Form Card */}
        <div className="relative rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#121622] p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] mb-10 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-200 dark:border-white/10">
            <h2 className="text-lg md:text-xl font-brak font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <FiMessageSquare className="text-primary" />
              <span>{locale === 'id' ? 'Tulis Pesan Baru' : 'Write a Note'}</span>
            </h2>

            {/* Auth status or Sign-in button */}
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {currentUser.photoURL ? (
                    <Image
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'User'}
                      width={28}
                      height={28}
                      className="rounded-full ring-2 ring-primary/40"
                    />
                  ) : (
                    <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                      {currentUser.displayName?.charAt(0) || 'U'}
                    </div>
                  )}
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    {currentUser.displayName || currentUser.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  title="Sign out"
                  className="flex items-center gap-1 text-xs text-neutral-500 hover:text-rose-500 transition-colors cursor-pointer"
                >
                  <FiLogOut className="h-3.5 w-3.5" />
                  <span>{locale === 'id' ? 'Keluar' : 'Logout'}</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignInGoogle}
                type="button"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-white/5 hover:bg-neutral-100 dark:hover:bg-white/10 text-xs font-bold text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <FcGoogle className="h-4 w-4" />
                <span>{locale === 'id' ? 'Login Google' : 'Sign in with Google'}</span>
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* If NOT logged in, allow typing guest name */}
            {!currentUser && (
              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1.5">
                  {locale === 'id' ? 'Nama Anda' : 'Your Name'}
                </label>
                <div className="relative flex items-center">
                  <FiUser className="absolute left-3.5 text-neutral-400 h-4 w-4" />
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder={locale === 'id' ? 'Nama atau alias Anda (atau login dengan Google di atas)...' : 'Your name or alias...'}
                    required
                    className="w-full rounded-2xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-[#1a202c] pl-10 pr-4 py-3 text-sm text-neutral-900 dark:text-white outline-none transition-all placeholder:text-neutral-500 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            )}

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
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 px-6 py-3 text-sm font-bold shadow-md transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <span>{submitting ? (locale === 'id' ? 'Mengirim...' : 'Sending...') : (locale === 'id' ? 'Kirim Pesan' : 'Submit Note')}</span>
              <FiSend className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Message Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              {locale === 'id' ? `Pesan Komunitas (${messages.length})` : `Community Notes (${messages.length})`}
            </h3>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
              <FiShield className="h-3.5 w-3.5 text-emerald-500" />
              <span>Realtime sync</span>
            </span>
          </div>

          {messages.map((item) => {
            const isOwner = currentUser && item.userId && currentUser.uid === item.userId;

            return (
              <div
                key={item.id}
                className="group rounded-2xl border-2 border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0f1422] p-5 shadow-sm transition-all hover:border-indigo-400/50 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {item.avatarUrl ? (
                      <Image
                        src={item.avatarUrl}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 shrink-0 rounded-2xl object-cover shadow-sm ring-1 ring-neutral-200 dark:ring-white/10"
                      />
                    ) : (
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${item.avatarBg} font-brak font-bold text-white shadow-sm`}
                      >
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-white leading-tight flex items-center gap-1.5">
                        <span>{item.name}</span>
                        {isOwner && (
                          <span className="px-1.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-500 text-[10px] font-bold">
                            You
                          </span>
                        )}
                      </h4>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        {item.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLike(item.id)}
                      aria-label="Like message"
                      className="flex items-center gap-1.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 px-2.5 py-1 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-rose-500 transition-colors cursor-pointer"
                    >
                      <FiHeart
                        className={cn(
                          'h-3.5 w-3.5 transition-transform group-hover:scale-110',
                          likedMap[item.id] ? 'fill-rose-500 text-rose-500' : ''
                        )}
                      />
                      <span>{item.likes}</span>
                    </button>

                    {isOwner && (
                      <button
                        onClick={() => handleDelete(item.id)}
                        aria-label="Delete message"
                        title={locale === 'id' ? 'Hapus pesan saya' : 'Delete my note'}
                        className="p-1.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 text-neutral-400 hover:text-rose-500 transition-colors cursor-pointer"
                      >
                        <FiTrash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed pl-13">
                  {item.message}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
