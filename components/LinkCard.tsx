'use client'; // Needed for Framer Motion

import {
  ExternalLink,
  FileText,
  Figma,
  Github,
  Video,
  Link as LinkIcon,
  Trash2,
  Loader2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { deleteLinkAction } from '@/app/actions';
import { cn } from '@/lib/utils';

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
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const confirmTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const style = iconMap[type as keyof typeof iconMap] || iconMap.default;
  const Icon = style.icon;

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showConfirm) {
      setShowConfirm(true);
      if (confirmTimeoutRef.current) clearTimeout(confirmTimeoutRef.current);
      confirmTimeoutRef.current = setTimeout(() => setShowConfirm(false), 3000);
      return;
    }

    setIsDeleting(true);
    const formData = new FormData();
    formData.append('linkId', id);
    formData.append('projectId', projectId);
    await deleteLinkAction(formData);
    // Component will unmount after deletion usually, but reset just in case
    setIsDeleting(false);
    setShowConfirm(false);
  };

  useEffect(() => {
    return () => {
      if (confirmTimeoutRef.current) clearTimeout(confirmTimeoutRef.current);
    };
  }, []);

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
              <form onSubmit={handleDelete} className="relative">
                <button
                  type="submit"
                  disabled={isDeleting}
                  aria-label={showConfirm ? 'Confirm delete' : 'Delete link'}
                  className={cn(
                    'relative flex items-center justify-center rounded-lg px-2 py-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2',
                    showConfirm
                      ? 'bg-red-500 px-3 text-white opacity-100'
                      : 'text-neutral-300 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500'
                  )}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    {isDeleting ? (
                      <motion.div
                        key="deleting"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                      >
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </motion.div>
                    ) : showConfirm ? (
                      <motion.span
                        key="confirm"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-[10px] font-bold uppercase tracking-wider"
                      >
                        Sure?
                      </motion.span>
                    ) : (
                      <motion.div
                        key="trash"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </form>
            )}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${title} in new tab`}
              className="rounded-lg p-2 text-neutral-300 transition-all hover:bg-neutral-50 hover:text-neutral-900 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
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
