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

  // Fallback illustrations based on type
  const renderFallback = () => {
    switch (type.toLowerCase()) {
      case 'figma':
        return (
          <div className="relative h-full w-full overflow-hidden bg-white">
            <div className="absolute inset-0 opacity-[0.4]" 
                 style={{ 
                   backgroundImage: 'radial-gradient(circle at 20% 20%, #F24E1E 0%, transparent 40%), radial-gradient(circle at 80% 80%, #A259FF 0%, transparent 40%), radial-gradient(circle at 50% 50%, #1ABCFE 0%, transparent 50%)' 
                 }} 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
                {style.icon}
              </div>
            </div>
          </div>
        );
      case 'github':
        return (
          <div className="relative h-full w-full overflow-hidden bg-[#24292F]">
            <div className="absolute inset-0 opacity-20" 
                 style={{ 
                   backgroundImage: 'linear-gradient(45deg, #0969DA 12.5%, transparent 12.5%, transparent 50%, #0969DA 50%, #0969DA 62.5%, transparent 62.5%, transparent 100%)',
                   backgroundSize: '40px 40px'
                 }} 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 drop-shadow-2xl transition-transform duration-700 group-hover:scale-110">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
            </div>
          </div>
        );
      case 'drive':
        return (
          <div className="relative h-full w-full overflow-hidden bg-neutral-50">
            <div className="absolute inset-0 opacity-[0.1]" 
                 style={{ 
                   backgroundImage: 'radial-gradient(circle at center, #4285F4 0%, transparent 70%)' 
                 }} 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-20 w-20 drop-shadow-xl transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.71 3.502L1.156 14.874L4.293 20.311L10.843 8.943L7.71 3.502Z" fill="#34A853" />
                  <path d="M16.29 3.502H9.71L12.843 8.943L19.426 8.943L16.29 3.502Z" fill="#4285F4" />
                  <path d="M12.843 14.874H22.844L19.707 9.432H9.71L12.843 14.874Z" fill="#FBBC05" />
                </svg>
              </div>
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="relative h-full w-full overflow-hidden bg-pink-50">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-pink-200/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-16 w-24 bg-white rounded-xl shadow-2xl flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                <div className="h-0 w-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-pink-600 border-b-[10px] border-b-transparent ml-1" />
                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center">
                   <div className="h-2 w-2 rounded-full bg-pink-600 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'invoice':
        return (
          <div className="relative h-full w-full overflow-hidden bg-emerald-50">
             <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent opacity-60" />
             <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-24 w-16 bg-white rounded shadow-2xl overflow-hidden transition-transform duration-700 group-hover:translate-y-[-8px]">
                <div className="p-2 space-y-1.5">
                  <div className="h-1.5 w-8 bg-emerald-100 rounded-full" />
                  <div className="h-1 w-full bg-neutral-50 rounded-full" />
                  <div className="h-1 w-full bg-neutral-50 rounded-full" />
                  <div className="h-1 w-2/3 bg-neutral-50 rounded-full" />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-6 bg-emerald-600 flex items-center justify-center">
                   <div className="h-2 w-8 bg-white/20 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="relative h-full w-full overflow-hidden bg-neutral-100">
            <div className="absolute inset-0 opacity-[0.05]" 
                 style={{ 
                   backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
                   backgroundSize: '20px 20px'
                 }} 
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity duration-500">
              <div className="h-16 w-16 grayscale">
                {style.icon}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col rounded-[32px] bg-neutral-100 p-3 transition-all duration-500 hover:bg-neutral-200 hover:shadow-xl"
    >
      {/* Search Bar / Browser Chrome (Decorative) */}
      <div className="mb-3 flex items-center justify-between px-3 pt-1">
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-neutral-300 group-hover:bg-red-400 transition-colors" />
          <div className="h-2 w-2 rounded-full bg-neutral-300 group-hover:bg-yellow-400 transition-colors" />
          <div className="h-2 w-2 rounded-full bg-neutral-300 group-hover:bg-green-400 transition-colors" />
        </div>
        <div className="h-1.5 w-12 rounded-full bg-neutral-200" />
      </div>

      {/* Preview Window (Inset) */}
      <div className="aspect-square w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm relative group-hover:shadow-md transition-shadow">
        {renderFallback()}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-neutral-900 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col px-2 pt-4 pb-2">
        <div className="flex items-center gap-2.5">
          <div className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px]", style.bg, style.color)}>
            {style.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-neutral-900">
              {title}
            </h3>
            <p className="truncate text-[10px] text-neutral-500 font-mono opacity-60">
              {displayUrl}
            </p>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
