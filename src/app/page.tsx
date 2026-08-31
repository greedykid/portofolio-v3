import { getAllPosts } from '@/common/libs/blog';

import Introduction from '@/modules/home/components/Introduction';
import TechStack from '@/modules/home/components/TechStack';
import Services from '@/modules/home/components/Services';
import Projects from '@/modules/projects/components/Projects';
import BlogSection from '@/modules/blog/components/BlogSection';
import Statistics from '@/modules/stats/components/Statistics';
import GitHubStats from '@/modules/stats/components/GitHubStats';
import AboutSection from '@/modules/about/components/AboutSection';
import Experiences from '@/modules/about/components/Experiences';
import Education from '@/modules/about/components/Education';
import Contact from '@/modules/contact/components/Contact';

const HomePage = async () => {
  const posts = await getAllPosts();

  return (
    <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 pt-3 md:pt-5">
      <Introduction />
      <TechStack />
      <AboutSection />
      <Projects limit={6} />
      <BlogSection posts={posts} />
      <Statistics />
      <GitHubStats />
      <Experiences />
      <Education />
      <Services />
      <Contact />
    </div>
  );
};

export default HomePage;
