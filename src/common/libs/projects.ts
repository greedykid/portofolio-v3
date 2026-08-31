import { PROJECTS, type Project } from '@/common/constant/projects';

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(id: string): Project | null {
  return PROJECTS.find((project) => project.id === id) ?? null;
}
