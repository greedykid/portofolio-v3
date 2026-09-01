import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/common/libs/blog';

export const runtime = 'edge';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post?.title || 'Artikel Blog & Catatan Teknis';
  const description = post?.description || 'Catatan teknis, dokumentasi sistem, dan eksplorasi pemrograman.';
  const tags = post?.tags || ['Tech', 'Code'];

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0c1017',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.04) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(99, 102, 241, 0.12) 2%, transparent 0%)',
          backgroundSize: '80px 80px',
          padding: '60px 70px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#ffffff',
              }}
            >
              R
            </div>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
              rizkiarbi<span style={{ color: '#6366f1' }}>.</span>blog
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '8px',
            }}
          >
            {tags.slice(0, 3).map((tag) => (
              <div
                key={tag}
                style={{
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  borderRadius: '999px',
                  padding: '6px 14px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#818cf8',
                }}
              >
                #{tag}
              </div>
            ))}
          </div>
        </div>

        {/* Middle Article Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              fontSize: '48px',
              fontWeight: 900,
              letterSpacing: '-1px',
              lineHeight: 1.18,
              color: '#ffffff',
              maxWidth: '1000px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '20px',
              color: '#94a3b8',
              lineHeight: 1.4,
              maxWidth: '900px',
            }}
          >
            {description}
          </div>
        </div>

        {/* Bottom Author Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff' }}>
              Rizki Arbiansyah
            </div>
            <div style={{ fontSize: '15px', color: '#64748b' }}>•</div>
            <div style={{ fontSize: '15px', color: '#94a3b8' }}>Web Developer & IT Support</div>
          </div>

          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#6366f1' }}>
            rizkiarbiansyah.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
