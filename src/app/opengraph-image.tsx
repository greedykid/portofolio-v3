import { ImageResponse } from 'next/og';
import { SITE, PROFILE } from '@/common/constant/data';

export const runtime = 'edge';
export const alt = SITE.title;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#090d16',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(99, 102, 241, 0.15) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
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
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#ffffff',
              }}
            >
              R
            </div>
            <span style={{ fontSize: '28px', fontWeight: 'bold', letterSpacing: '-0.5px' }}>
              rizkiarbi<span style={{ color: '#6366f1' }}>.</span>
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '999px',
              padding: '8px 18px',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#4ade80',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '999px',
                backgroundColor: '#22c55e',
              }}
            />
            {PROFILE.workType}
          </div>
        </div>

        {/* Middle Hero Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#818cf8',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
            }}
          >
            {PROFILE.role}
          </div>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 900,
              letterSpacing: '-1.5px',
              lineHeight: 1.15,
              color: '#ffffff',
            }}
          >
            {PROFILE.name}
          </div>
          <div
            style={{
              fontSize: '22px',
              color: '#94a3b8',
              lineHeight: 1.4,
              maxWidth: '900px',
            }}
          >
            Lulusan S1 Sistem Informasi Universitas Gunadarma (IPK 3.58) • Spesialisasi IT Support & Laravel Web Development.
          </div>
        </div>

        {/* Bottom Tag Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex', gap: '12px' }}>
            {['Laravel', 'MySQL', 'Next.js', 'Tailwind CSS', 'IT Support'].map((tag) => (
              <div
                key={tag}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  padding: '6px 14px',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#e2e8f0',
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#6366f1' }}>
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
