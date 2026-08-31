'use client';

import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-primary bg-white text-primary shadow-[4px_4px_0px_0px_rgba(99,102,241,0.4)] transition-all duration-300 hover:bg-primary hover:text-white ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <FiArrowUp className="h-5 w-5" />
    </button>
  );
}
