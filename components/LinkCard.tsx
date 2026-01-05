'use client'; // Needed for Framer Motion

import {
  ExternalLink,
  FileText,
  Figma,
  Github,
  Video,
  Link as LinkIcon,
  Trash2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { deleteLinkAction } from '@/app/actions';

// 1. Map types to Icons and Colors
const iconMap = {
  figma: {
    icon: Figma,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'group-hover:border-purple-200',
    shadow: 'group-hover:shadow-purple-500/5',
  },
  github: {
    icon: Github,
    color: 'text-neutral-900',
    bg: 'bg-neutral-100',
    border: 'group-hover:border-neutral-300',
    shadow: 'group-hover:shadow-neutral-900/5',
  },
  invoice: {
    icon: FileText,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'group-hover:border-emerald-200',
    shadow: 'group-hover:shadow-emerald-500/5',
  },
  video: {
    icon: Video,
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    border: 'group-hover:border-pink-200',
    shadow: 'group-hover:shadow-pink-500/5',
  },
  default: {
    icon: LinkIcon,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'group-hover:border-blue-200',
    shadow: 'group-hover:shadow-blue-500/5',
  },
};

interface LinkCardProps {
  id: string;
  projectId: string;
  title: string;
  url: string;
  type: string;
  index: number;
  isEditable?: boolean;
}

export default function LinkCard({
  id,
  projectId,
  title,
  url,
  type,
  index,
  isEditable = false,
}: LinkCardProps) {
  const style = iconMap[type as keyof typeof iconMap] || iconMap.default;
  const Icon = style.icon;

  // Format URL for display (strip protocol and www)
  const displayUrl = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: index * 0.05,
      }}
      className="group relative"
    >
      <div
        className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-300 hover:border-neutral-300 hover:shadow-xl ${style.shadow}`}
      >
        <div className="flex items-start justify-between">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${style.bg}`}
          >
            <Icon className={`h-5 w-5 ${style.color}`} />
          </div>

          <div className="flex items-center gap-1">
            {isEditable && (
              <form
                action={async (formData: FormData) => {
                  await deleteLinkAction(formData);
                }}
              >
                <input type="hidden" name="linkId" value={id} />
                <input type="hidden" name="projectId" value={projectId} />
                <button className="rounded-lg p-2 text-neutral-300 transition-all hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100">
                  <Trash2 className="h-4 w-4" />
                </button>
              </form>
            )}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-neutral-300 transition-all hover:bg-neutral-50 hover:text-neutral-900 opacity-0 group-hover:opacity-100"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="line-clamp-1 font-semibold text-neutral-900 tracking-tight">
            {title}
          </h3>
          <p className="mt-1 truncate font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
            {displayUrl}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
