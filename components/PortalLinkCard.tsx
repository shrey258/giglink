'use client';

import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PortalLinkCardProps {
  title: string;
  url: string;
  type: string;
  index: number;
}

const iconMap: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  figma: {
    color: 'text-[#F24E1E]',
    bg: 'bg-[#F24E1E]/10',
    icon: (
      <svg width="24" height="24" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
        <path d="M19 28.5C19 25.0192 21.8192 22.2 25.3 22.2C28.7808 22.2 31.6 25.0192 31.6 28.5C31.6 31.9808 28.7808 34.8 25.3 34.8C21.8192 34.8 19 31.9808 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.7C0 44.2192 2.8192 41.4 6.3 41.4H19V54C19 55.4912 18.3942 56.9213 17.3127 57.9715C16.2312 59.0217 14.7643 59.6117 13.2343 59.6117C11.7043 59.6117 10.2374 59.0217 9.1559 57.9715C8.07439 56.9213 7.46857 55.4912 7.46857 54C7.46857 52.5088 8.07439 51.0787 9.1559 50.0285C10.2374 48.9783 11.7043 48.3883 13.2343 48.3883L12.7 47.7H6.3V47.7Z" fill="#0ACF83"/>
        <path d="M0 28.5C0 25.0192 2.8192 22.2 6.3 22.2H19V34.8H6.3C2.8192 34.8 0 31.9808 0 28.5Z" fill="#A259FF"/>
        <path d="M0 9.3C0 5.8192 2.8192 3 6.3 3H19V15.6H6.3C2.8192 15.6 0 12.7808 0 9.3Z" fill="#F24E1E"/>
        <path d="M19 3H31.6C35.0808 3 37.9 5.8192 37.9 9.3C37.9 12.7808 35.0808 15.6 31.6 15.6H19V3Z" fill="#FF7262"/>
      </svg>
    ),
  },
  github: {
    color: 'text-neutral-900',
    bg: 'bg-neutral-900/5',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-900">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  invoice: {
    color: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-emerald-600">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
  },
  video: {
    color: 'text-pink-600',
    bg: 'bg-pink-500/10',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-pink-600">
        <path d="m22 8-6 4 6 4V8Z" />
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
      </svg>
    ),
  },
  drive: {
    color: 'text-blue-600',
    bg: 'bg-blue-500/10',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
        <path d="M7.71 3.502L1.156 14.874L4.293 20.311L10.843 8.943L7.71 3.502Z" fill="#0066DA" />
        <path d="M16.29 3.502H9.71L12.843 8.943L19.426 8.943L16.29 3.502Z" fill="#0066DA" />
        <path d="M12.843 14.874H22.844L19.707 9.432H9.71L12.843 14.874Z" fill="#0066DA" />
      </svg>
    ),
  },
  default: {
    color: 'text-neutral-500',
    bg: 'bg-neutral-500/10',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-neutral-500">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
};

export default function PortalLinkCard({ title, url, type, index }: PortalLinkCardProps) {
  const style = iconMap[type.toLowerCase()] || iconMap.default;
  const displayUrl = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-neutral-200 bg-white/70 p-6 backdrop-blur-xl transition-all duration-300 hover:border-neutral-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
      <div className="flex items-start justify-between">
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3", style.bg)}>
          {style.icon}
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-50 text-neutral-300 transition-all duration-300 group-hover:bg-neutral-900 group-hover:text-white">
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-neutral-900 tracking-tight group-hover:text-neutral-900">
            {title}
          </h3>
        </div>
        <p className="mt-1 line-clamp-1 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">
          {displayUrl}
        </p>
      </div>

      {/* Subtle Glow Effect on Hover */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/5 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />
    </motion.a>
  );
}
