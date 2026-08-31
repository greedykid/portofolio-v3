import Container from '@/common/components/elements/Container';
import SectionHeading from '@/common/components/elements/SectionHeading';
import ProjectsGrid from '@/modules/projects/components/Projects';

export const metadata = {
  title: 'Projects',
  description: 'Proyek-proyek yang telah saya bangun.',
};

export default function ProjectsPage() {
  return (
    <Container>
      <ProjectsGrid />
    </Container>
  );
}
