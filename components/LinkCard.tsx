'use client'; // Needed for Framer Motion

import { ExternalLink, FileText, Figma, Github, Video } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// 1. Map types to Icons and Colors
const iconMap = {
  figma: { icon: Figma, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'hover:border-purple-500' },
  github: { icon: Github, color: 'text-neutral-900', bg: 'bg-neutral-900/10', border: 'hover:border-neutral-900' },
  invoice: { icon: FileText, color: 'text-green-600', bg: 'bg-green-600/10', border: 'hover:border-green-600' },
  video: { icon: Video, color: 'text-pink-500', bg: 'bg-pink-500/10', border: 'hover:border-pink-500' },
  default: { icon: ExternalLink, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'hover:border-blue-500' },
};

interface LinkCardProps {
  title: string;
  url: string;
  type: string;
  index: number; // Added index for staggered animation
}

export default function LinkCard({ title, url, type, index }: LinkCardProps) {
  const style = iconMap[type as keyof typeof iconMap] || iconMap.default;
  const Icon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }} // The "Stagger" effect
    >
      <Link 
        href={url} 
        target="_blank"
        className={`group flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 transition-all hover:shadow-md ${style.border}`}
      >
        {/* Icon Box */}
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${style.bg}`}>
          <Icon className={`h-6 w-6 ${style.color}`} />
        </div>
        
        {/* Text Content */}
        <div className="flex-1">
          <h3 className="font-medium text-neutral-900 group-hover:text-black">
            {title}
          </h3>
          <p className="text-sm text-neutral-500">Opens in new tab</p>
        </div>

        {/* Arrow Icon */}
        <ExternalLink className="h-4 w-4 text-neutral-300 transition-transform group-hover:translate-x-1 group-hover:text-neutral-500" />
      </Link>
    </motion.div>
  );
}