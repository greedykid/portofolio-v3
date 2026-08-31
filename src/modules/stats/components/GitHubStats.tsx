import { getGithubStats } from '@/common/libs/github';
import SectionHeading from '@/common/components/elements/SectionHeading';
import Card from '@/common/components/elements/Card';

export default async function GitHubStats() {
  const stats = await getGithubStats();

  if (!stats) return null;

  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeading title="GitHub Stats" description="Aktivitas dan kontribusi GitHub saya." />
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="text-center">
            <div className="text-3xl font-brak text-white">{stats.publicRepos}</div>
            <div className="mt-2 text-sm text-neutral-400">Public Repositories</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-brak text-white">{stats.followers}</div>
            <div className="mt-2 text-sm text-neutral-400">Followers</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-brak text-white">{stats.totalStars}</div>
            <div className="mt-2 text-sm text-neutral-400">Total Stars</div>
          </Card>
        </div>
      </div>
    </section>
  );
}
