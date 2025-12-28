'use client'; // Needed for Framer Motion

import { ExternalLink, FileText, Figma, Github, Video, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// 1. Map types to Icons and Colors
const iconMap = {
  figma: {
    icon: Figma,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'group-hover:border-purple-500',
    shadow: 'group-hover:shadow-purple-500/10',
  },
  github: {
    icon: Github,
    color: 'text-neutral-900',
    bg: 'bg-neutral-100',
    border: 'group-hover:border-neutral-900',
    shadow: 'group-hover:shadow-neutral-900/10',
  },
  invoice: {
    icon: FileText,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'group-hover:border-emerald-500',
    shadow: 'group-hover:shadow-emerald-500/10',
  },
  video: {
    icon: Video,
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    border: 'group-hover:border-pink-500',
    shadow: 'group-hover:shadow-pink-500/10',
  },
  default: {
    icon: LinkIcon,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'group-hover:border-blue-500',
    shadow: 'group-hover:shadow-blue-500/10',
  },
};

interface LinkCardProps {
  title: string;
  url: string;
  type: string;
  index: number;
}

export default function LinkCard({ title, url, type, index }: LinkCardProps) {
  const style = iconMap[type as keyof typeof iconMap] || iconMap.default;
  const Icon = style.icon;

  // Format URL for display (strip protocol and www)
  const displayUrl = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: index * 0.05,
      }}
    >
      <Link
        href={url}
        target="_blank"
        className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${style.border} ${style.shadow}`}
      >
        <div className="flex items-start justify-between">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${style.bg}`}
          >
            <Icon className={`h-5 w-5 ${style.color}`} />
          </div>
          <ExternalLink className="h-4 w-4 text-neutral-300 transition-colors group-hover:text-neutral-500" />
        </div>

        <div className="mt-6 space-y-1">
          <h3 className="font-semibold text-neutral-900">{title}</h3>
          <p className="truncate font-mono text-xs text-neutral-400">
            {displayUrl}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
