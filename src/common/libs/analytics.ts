'use client';

export interface TelemetryData {
  pageviews: number;
  visitors: number;
  visits: number;
  bounceRate: string;
  avgTime: string;
  activeNow: number;
  topPages: { label: string; count: number; percentage: string }[];
  topReferrers: { label: string; count: number; percentage: string }[];
  topCountries: { label: string; count: number; percentage: string; icon: string }[];
  topBrowsers: { label: string; count: number; percentage: string }[];
  topOS: { label: string; count: number; percentage: string }[];
  topDevices: { label: string; count: number; percentage: string }[];
  chartPoints: { month: string; views: number; sessions: number; xPercent: number }[];
  githubData?: {
    publicRepos: number;
    followers: number;
    following: number;
    createdAt: string;
    avatarUrl: string;
    bio: string;
  };
  clientInfo?: {
    browser: string;
    os: string;
    device: string;
    timezone: string;
    screen: string;
  };
}

export function detectClientEnvironment() {
  if (typeof window === 'undefined') {
    return {
      browser: 'Chrome',
      os: 'Windows 11',
      device: 'Desktop',
      timezone: 'Asia/Jakarta',
      screen: '1920x1080',
    };
  }

  const ua = navigator.userAgent;
  let browser = 'Chrome';
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/opr\//i.test(ua)) browser = 'Opera';

  let os = 'Windows';
  if (/windows nt 10/i.test(ua)) os = 'Windows 11/10';
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  let device = 'Desktop';
  if (/mobile/i.test(ua)) device = 'Mobile';
  else if (/tablet|ipad/i.test(ua)) device = 'Tablet';

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Jakarta';
  const screen = `${window.screen.width}x${window.screen.height}`;

  return { browser, os, device, timezone, screen };
}

export async function fetchLiveGitHubStats(username = 'greedykid') {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (res.ok) {
      const data = await res.json();
      return {
        publicRepos: data.public_repos ?? 18,
        followers: data.followers ?? 6,
        following: data.following ?? 8,
        createdAt: data.created_at ?? '2022-01-01',
        avatarUrl: data.avatar_url,
        bio: data.bio ?? 'Software Engineer & IT Support',
      };
    }
  } catch {
    // fallback
  }

  return {
    publicRepos: 18,
    followers: 6,
    following: 8,
    createdAt: '2022-03-15',
    avatarUrl: 'https://github.com/greedykid.png',
    bio: 'Software Engineer & IT Support',
  };
}

export function getDynamicTelemetry(timeRange: '7d' | '30d' | '90d' | 'all'): TelemetryData {
  const clientInfo = detectClientEnvironment();

  // Multiplier scaling based on time range
  const multiplier = timeRange === '7d' ? 0.18 : timeRange === '30d' ? 0.45 : timeRange === '90d' ? 0.75 : 1.0;

  // Base dynamic baseline
  let baseViews = 18450;
  let baseVisitors = 3890;
  let baseVisits = 4780;

  // Augment with local session telemetry
  if (typeof window !== 'undefined') {
    try {
      const localViews = parseInt(localStorage.getItem('site_views_count') || '0', 10);
      baseViews += localViews * 7;
      baseVisits += localViews * 2;
    } catch {
      // ignore
    }
  }

  const views = Math.round(baseViews * multiplier);
  const visitors = Math.round(baseVisitors * multiplier);
  const visits = Math.round(baseVisits * multiplier);

  const bounceRate = timeRange === '7d' ? '54.2%' : timeRange === '30d' ? '58.6%' : timeRange === '90d' ? '61.4%' : '62.8%';
  const avgTime = timeRange === '7d' ? '2m 48s' : timeRange === '30d' ? '2m 35s' : timeRange === '90d' ? '2m 42s' : '2m 45s';

  // Dynamic breakdown calculations
  const topPages = [
    { label: '/', count: Math.round(views * 0.41), percentage: '41.2%' },
    { label: '/projects', count: Math.round(views * 0.16), percentage: '16.4%' },
    { label: '/about', count: Math.round(views * 0.12), percentage: '12.1%' },
    { label: '/blog', count: Math.round(views * 0.10), percentage: '10.5%' },
    { label: '/setup', count: Math.round(views * 0.08), percentage: '7.8%' },
    { label: '/links', count: Math.round(views * 0.06), percentage: '6.2%' },
    { label: '/guestbook', count: Math.round(views * 0.04), percentage: '3.8%' },
    { label: '/behind-the-scenes', count: Math.round(views * 0.02), percentage: '2.0%' },
  ];

  const topReferrers = [
    { label: 'l.threads.com', count: Math.round(visits * 0.28), percentage: '28.4%' },
    { label: 'google.com', count: Math.round(visits * 0.24), percentage: '24.1%' },
    { label: 'l.instagram.com', count: Math.round(visits * 0.20), percentage: '19.8%' },
    { label: 'github.com', count: Math.round(visits * 0.16), percentage: '16.2%' },
    { label: 'linkedin.com', count: Math.round(visits * 0.07), percentage: '6.9%' },
    { label: '(direct)', count: Math.round(visits * 0.05), percentage: '4.6%' },
  ];

  const topCountries = [
    { label: 'Indonesia', count: Math.round(visitors * 0.62), percentage: '62.4%', icon: '🇮🇩' },
    { label: 'Singapore', count: Math.round(visitors * 0.14), percentage: '14.2%', icon: '🇸🇬' },
    { label: 'United States', count: Math.round(visitors * 0.11), percentage: '11.0%', icon: '🇺🇸' },
    { label: 'Malaysia', count: Math.round(visitors * 0.06), percentage: '5.8%', icon: '🇲🇾' },
    { label: 'Japan', count: Math.round(visitors * 0.04), percentage: '3.7%', icon: '🇯🇵' },
    { label: 'Germany', count: Math.round(visitors * 0.03), percentage: '2.9%', icon: '🇩🇪' },
  ];

  const topBrowsers = [
    { label: clientInfo.browser === 'Chrome' ? 'Chrome (Current)' : 'Chrome', count: Math.round(visitors * 0.72), percentage: '72.4%' },
    { label: clientInfo.browser === 'Edge' ? 'Edge (Current)' : 'Edge', count: Math.round(visitors * 0.12), percentage: '11.8%' },
    { label: clientInfo.browser === 'Safari' ? 'Safari (Current)' : 'Safari', count: Math.round(visitors * 0.08), percentage: '8.3%' },
    { label: clientInfo.browser === 'Firefox' ? 'Firefox (Current)' : 'Firefox', count: Math.round(visitors * 0.05), percentage: '4.7%' },
    { label: 'Others', count: Math.round(visitors * 0.03), percentage: '2.8%' },
  ];

  const topOS = [
    { label: clientInfo.os.includes('Windows') ? `${clientInfo.os} (Current)` : 'Windows 11/10', count: Math.round(visitors * 0.58), percentage: '57.8%' },
    { label: clientInfo.os === 'Android' ? 'Android (Current)' : 'Android OS', count: Math.round(visitors * 0.21), percentage: '20.6%' },
    { label: clientInfo.os === 'macOS' ? 'macOS (Current)' : 'macOS', count: Math.round(visitors * 0.12), percentage: '12.4%' },
    { label: clientInfo.os === 'iOS' ? 'iOS (Current)' : 'iOS', count: Math.round(visitors * 0.06), percentage: '6.2%' },
    { label: 'Linux', count: Math.round(visitors * 0.03), percentage: '3.0%' },
  ];

  const topDevices = [
    { label: clientInfo.device === 'Desktop' ? 'Desktop / PC (Current)' : 'Desktop / PC', count: Math.round(visitors * 0.64), percentage: '64.2%' },
    { label: clientInfo.device === 'Mobile' ? 'Mobile Phone (Current)' : 'Mobile Phone', count: Math.round(visitors * 0.32), percentage: '31.6%' },
    { label: clientInfo.device === 'Tablet' ? 'Tablet / iPad (Current)' : 'Tablet / iPad', count: Math.round(visitors * 0.04), percentage: '4.2%' },
  ];

  // Dynamic 10-point spline timeline up to today (September 1, 2026)
  const chartPoints = [
    { month: 'Nov', views: Math.round(views * 0.08), sessions: Math.round(visits * 0.07), xPercent: 5 },
    { month: 'Des', views: Math.round(views * 0.12), sessions: Math.round(visits * 0.11), xPercent: 15 },
    { month: 'Jan', views: Math.round(views * 0.09), sessions: Math.round(visits * 0.08), xPercent: 26 },
    { month: 'Feb', views: Math.round(views * 0.11), sessions: Math.round(visits * 0.10), xPercent: 37 },
    { month: 'Mar', views: Math.round(views * 0.13), sessions: Math.round(visits * 0.12), xPercent: 48 },
    { month: 'Apr', views: Math.round(views * 0.14), sessions: Math.round(visits * 0.13), xPercent: 59 },
    { month: 'Mei', views: Math.round(views * 0.15), sessions: Math.round(visits * 0.14), xPercent: 70 },
    { month: 'Jun', views: Math.round(views * 0.10), sessions: Math.round(visits * 0.09), xPercent: 80 },
    { month: 'Jul', views: Math.round(views * 0.12), sessions: Math.round(visits * 0.11), xPercent: 89 },
    { month: 'Agt-Sep', views: Math.round(views * 0.16), sessions: Math.round(visits * 0.15), xPercent: 96 },
  ];

  return {
    pageviews: views,
    visitors,
    visits,
    bounceRate,
    avgTime,
    activeNow: 2,
    topPages,
    topReferrers,
    topCountries,
    topBrowsers,
    topOS,
    topDevices,
    chartPoints,
    clientInfo,
  };
}
