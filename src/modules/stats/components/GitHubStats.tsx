import { getGithubStats } from '@/common/libs/github';
import SectionHeading from '@/common/components/elements/SectionHeading';

export default async function GitHubStats() {
  const stats = await getGithubStats();

  if (!stats) return null;

  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeading title="GitHub Stats" description="Aktivitas dan kontribusi GitHub saya." />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border-2 border-neutral-200 bg-white p-6 text-center transition-all duration-300 hover:border-primary hover:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] dark:border-neutral-700 dark:bg-neutral-900">
            <div className="text-3xl font-brak text-primary">{stats.publicRepos}</div>
            <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Public Repositories</div>
          </div>
          <div className="rounded-3xl border-2 border-neutral-200 bg-white p-6 text-center transition-all duration-300 hover:border-primary hover:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] dark:border-neutral-700 dark:bg-neutral-900">
            <div className="text-3xl font-brak text-primary">{stats.followers}</div>
            <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Followers</div>
          </div>
          <div className="rounded-3xl border-2 border-neutral-200 bg-white p-6 text-center transition-all duration-300 hover:border-primary hover:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] dark:border-neutral-700 dark:bg-neutral-900">
            <div className="text-3xl font-brak text-primary">{stats.totalStars}</div>
            <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Total Stars</div>
          </div>
        </div>
      </div>
    </section>
  );
}
