import Link from 'next/link';
import Container from '@/common/components/elements/Container';

export default function NotFound() {
  return (
    <Container>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-brak text-primary">404</h1>
        <p className="mt-4 text-neutral-500 dark:text-neutral-400">Halaman tidak ditemukan.</p>
        <Link
          href="/"
          className="mt-8 rounded-xl border-2 border-primary bg-primary px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-[4px_4px_0px_0px_rgba(99,102,241,0.4)]"
        >
          Kembali ke Home
        </Link>
      </div>
    </Container>
  );
}
