import type { IconType } from 'react-icons';
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';

type SocialMediaItem = {
  label: string;
  href: string;
  icon: IconType;
};

export const SOCIAL: SocialMediaItem[] = [
  { label: 'Email', href: 'mailto:rizkiarbi65@gmail.com', icon: FiMail },
  { label: 'Github', href: 'https://github.com/greedykid', icon: FiGithub },
  { label: 'Linkedin', href: 'https://linkedin.com/in/rizkiarbiansyah', icon: FiLinkedin },
];
