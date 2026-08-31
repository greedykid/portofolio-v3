import { SOCIAL_MEDIA } from '@/common/constant/data';

export interface GithubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
}

export async function getGithubStats(): Promise<GithubStats | null> {
  const username = (SOCIAL_MEDIA.github ?? 'https://github.com/').replace('https://github.com/', '').replace('/', '');

  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const user = await res.json();
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      next: { revalidate: 3600 },
    });
    let totalStars = 0;
    if (reposRes.ok) {
      const repos = await reposRes.json();
      totalStars = repos.reduce((sum: number, repo: { stargazers_count: number }) => sum + (repo.stargazers_count || 0), 0);
    }

    return {
      publicRepos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      totalStars,
    };
  } catch {
    return null;
  }
}
