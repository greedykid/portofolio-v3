import type { IconType } from 'react-icons';
import { FiMail, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi';
import { FaTelegramPlane, FaDiscord } from 'react-icons/fa';
import { SiThreads } from 'react-icons/si';

type SocialMediaItem = {
  label: string;
  href: string;
  icon: IconType;
};

export const SOCIAL: SocialMediaItem[] = [
  { label: 'Github', href: 'https://github.com/greedykid', icon: FiGithub },
  { label: 'Linkedin', href: 'https://linkedin.com/in/rizkiarbiansyah', icon: FiLinkedin },
  { label: 'Threads', href: 'https://threads.net/@rizkiarbiansyah', icon: SiThreads },
  { label: 'Instagram', href: 'https://instagram.com/rizkiarbiansyah', icon: FiInstagram },
  { label: 'Telegram', href: 'https://t.me/rizkiarbiansyah', icon: FaTelegramPlane },
  { label: 'Discord', href: 'https://discord.com/users/greedykid', icon: FaDiscord },
  { label: 'Email', href: 'mailto:rizkiarbi65@gmail.com', icon: FiMail },
];

