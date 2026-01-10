'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PortalLinkCardProps {
  title: string;
  url: string;
  type: string;
  index: number;
}

const iconMap: Record<
  string,
  { color: string; bg: string; icon: React.ReactNode }
> = {
  figma: {
    color: 'text-[#F24E1E]',
    bg: 'bg-[#F24E1E]/10',
    icon: (
      <div className="relative h-4 w-4">
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
          alt="Figma"
          fill
          className="object-contain"
          unoptimized // SVGs often need this or specific config, but remote pattern should handle it. Actually for external SVGs unoptimized might be safer if next/image has trouble resizing them. But let's try standard first.
        />
      </div>
    ),
  },
  github: {
    color: 'text-neutral-900',
    bg: 'bg-neutral-900/5',
    icon: (
      <div className="relative h-4 w-4">
        <Image
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          alt="GitHub"
          fill
          className="object-contain"
        />
      </div>
    ),
  },
  invoice: {
    color: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 text-emerald-600"
      >
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
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-pink-600"
      >
        <path d="m22 8-6 4 6 4V8Z" />
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
      </svg>
    ),
  },
  drive: {
    color: 'text-blue-600',
    bg: 'bg-blue-500/10',
    icon: (
      <div className="relative h-4 w-4">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg"
          alt="Google Drive"
          fill
          className="object-contain"
        />
      </div>
    ),
  },
  default: {
    color: 'text-neutral-500',
    bg: 'bg-neutral-500/10',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 text-neutral-500"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
};

export default function PortalLinkCard({
  title,
  url,
  type,
}: PortalLinkCardProps) {
  const style = iconMap[type.toLowerCase()] || iconMap.default;
  const displayUrl = url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

  // Premium illustrations based on type
  const renderFallback = () => {
    switch (type.toLowerCase()) {
      case 'figma':
        return (
          <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#1E1E1E] to-[#2C2C2C]">
            {/* Noise texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              }}
            />

            {/* Layered geometric shapes */}
            <div className="absolute top-[15%] left-[10%] h-20 w-20 rounded-2xl bg-[#F24E1E]/80 blur-[1px] transform rotate-12 transition-transform duration-700 group-hover:rotate-6" />
            <div className="absolute top-[25%] left-[20%] h-16 w-16 rounded-xl bg-[#A259FF]/70 blur-[0.5px] transform -rotate-6 transition-transform duration-700 group-hover:rotate-0" />
            <div className="absolute bottom-[20%] right-[15%] h-14 w-14 rounded-lg bg-[#1ABCFE]/60 blur-[0.5px] transform rotate-45 transition-transform duration-700 group-hover:rotate-[50deg]" />
            <div className="absolute bottom-[30%] right-[25%] h-12 w-12 rounded-md bg-[#0ACF83]/50 blur-[0.5px] transition-transform duration-700 group-hover:scale-110" />

            {/* Connection lines (design nodes metaphor) */}
            <svg
              className="absolute inset-0 h-full w-full opacity-30"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line
                x1="25"
                y1="30"
                x2="75"
                y2="70"
                stroke="white"
                strokeWidth="0.3"
                strokeDasharray="2,2"
              />
              <line
                x1="20"
                y1="60"
                x2="80"
                y2="40"
                stroke="white"
                strokeWidth="0.3"
                strokeDasharray="2,2"
              />
              <circle cx="25" cy="30" r="2" fill="white" opacity="0.5" />
              <circle cx="75" cy="70" r="2" fill="white" opacity="0.5" />
            </svg>

            {/* Central logo with glass effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-110">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
                  alt="Figma"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
              </div>
            </div>
          </div>
        );
      case 'github':
        return (
          <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#0D1117] via-[#161B22] to-[#21262D]">
            {/* Contribution graph pattern */}
            <div className="absolute inset-0 grid grid-cols-7 gap-1 p-4 opacity-40">
              {[...Array(49)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-sm transition-all duration-500"
                  style={{
                    backgroundColor: `rgba(57, 211, 83, ${Math.random() * 0.8})`,
                    transitionDelay: `${i * 20}ms`,
                  }}
                />
              ))}
            </div>

            {/* Radial glow */}
            <div
              className="absolute inset-0 bg-gradient-radial from-[#238636]/20 via-transparent to-transparent"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(35, 134, 54, 0.15) 0%, transparent 60%)',
              }}
            />

            {/* Code brackets decoration */}
            <div className="absolute top-4 left-4 text-[#8B949E]/30 font-mono text-2xl">
              {'{'}
            </div>
            <div className="absolute bottom-4 right-4 text-[#8B949E]/30 font-mono text-2xl">
              {'}'}
            </div>

            {/* Central Octocat logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-white/10">
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                  alt="GitHub"
                  width={40}
                  height={40}
                  className="h-10 w-10 invert"
                />
              </div>
            </div>
          </div>
        );
      case 'drive':
        return (
          <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100">
            {/* Layered folder planes */}
            <div className="absolute top-[20%] left-[15%] h-24 w-32 rounded-lg bg-white shadow-lg border border-slate-200/50 transform -rotate-6 transition-transform duration-500 group-hover:-rotate-3" />
            <div className="absolute top-[25%] left-[20%] h-24 w-32 rounded-lg bg-white shadow-xl border border-slate-200/50 transform rotate-3 transition-transform duration-500 group-hover:rotate-6" />

            {/* Tri-color accent bar */}
            <div className="absolute bottom-[25%] left-[10%] right-[10%] h-1 flex gap-1 rounded-full overflow-hidden">
              <div className="flex-1 bg-[#4285F4]" />
              <div className="flex-1 bg-[#34A853]" />
              <div className="flex-1 bg-[#FBBC05]" />
            </div>

            {/* Decorative dots */}
            <div className="absolute top-4 right-4 flex gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[#4285F4]/40" />
              <div className="h-2 w-2 rounded-full bg-[#34A853]/40" />
              <div className="h-2 w-2 rounded-full bg-[#FBBC05]/40" />
            </div>

            {/* Central Drive logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-2xl border border-slate-200/80 transition-all duration-500 group-hover:scale-110 group-hover:shadow-3xl">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg"
                  alt="Google Drive"
                  width={36}
                  height={36}
                  className="h-9 w-9"
                />
              </div>
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#F9A8D4] via-[#EC4899] to-[#BE185D]">
            {/* Noise texture */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              }}
            />

            {/* Waveform bars */}
            <div className="absolute bottom-[30%] left-[15%] right-[15%] flex items-end justify-center gap-1 h-12">
              {[0.4, 0.7, 1, 0.5, 0.8, 0.6, 0.9, 0.5, 0.7, 0.4].map((h, i) => (
                <div
                  key={i}
                  className="w-2 bg-white/40 rounded-full transition-all duration-300"
                  style={{
                    height: `${h * 100}%`,
                    animationDelay: `${i * 100}ms`,
                  }}
                />
              ))}
            </div>

            {/* Record indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-white animate-pulse" />
              <span className="text-white/80 text-xs font-medium">REC</span>
            </div>

            {/* Central play button with glass effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-white/30">
                <div className="h-0 w-0 border-t-[14px] border-t-transparent border-l-[22px] border-l-white border-b-[14px] border-b-transparent ml-1.5" />
              </div>
            </div>
          </div>
        );
      case 'invoice':
        return (
          <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#D1FAE5] via-[#6EE7B7] to-[#10B981]">
            {/* Subtle pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
              }}
            />

            {/* Dollar watermark */}
            <div className="absolute -right-4 -bottom-4 text-white/10 text-[120px] font-bold leading-none">
              $
            </div>

            {/* Receipt shape */}
            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-24 bg-white rounded-lg shadow-2xl overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
              <div className="p-3 space-y-2">
                <div className="h-2 w-12 bg-emerald-200 rounded-full" />
                <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                <div className="h-1.5 w-full bg-slate-100 rounded-full" />
                <div className="h-1.5 w-3/4 bg-slate-100 rounded-full" />
                <div className="pt-2 border-t border-dashed border-slate-200">
                  <div className="h-2 w-16 bg-emerald-400 rounded-full" />
                </div>
              </div>
            </div>

            {/* Checkmark badge */}
            <div className="absolute bottom-[20%] right-[20%] flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-500 group-hover:scale-110">
              <svg
                className="h-5 w-5 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        );
      default:
        return (
          <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300">
            {/* Abstract grid */}
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Connection dots */}
            <svg
              className="absolute inset-0 h-full w-full opacity-30"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line
                x1="20"
                y1="20"
                x2="50"
                y2="50"
                stroke="#64748b"
                strokeWidth="0.5"
              />
              <line
                x1="50"
                y1="50"
                x2="80"
                y2="30"
                stroke="#64748b"
                strokeWidth="0.5"
              />
              <line
                x1="50"
                y1="50"
                x2="70"
                y2="80"
                stroke="#64748b"
                strokeWidth="0.5"
              />
              <circle cx="20" cy="20" r="3" fill="#64748b" />
              <circle cx="50" cy="50" r="4" fill="#475569" />
              <circle cx="80" cy="30" r="3" fill="#64748b" />
              <circle cx="70" cy="80" r="3" fill="#64748b" />
            </svg>

            {/* Central link icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl border border-slate-200 transition-all duration-500 group-hover:scale-110 group-hover:bg-white">
                <svg
                  className="h-7 w-7 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
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
          <div
            className={cn(
              'flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px]',
              style.bg,
              style.color
            )}
          >
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
