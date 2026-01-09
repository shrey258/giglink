'use client';

import { ExternalLink, Figma, Github, FileText, Video, Link as LinkIcon, Play, Terminal, MousePointer2 } from 'lucide-react';
import { motion } from 'framer-motion';

const portalConfigs = {
  figma: {
    icon: Figma,
    label: 'Design File',
    gradient: 'from-[#1e1e1e] to-[#2c2033]',
    borderGlow: 'shadow-[0_0_40px_-10px_rgba(168,85,247,0.6)]',
    accentColor: 'text-purple-400',
    iconColor: 'text-white',
    iconBg: 'bg-[#0ACF83]', // Figma brand color
    // Complex radial gradient for that "portal" depth look
    bgStyle: {
      background: `
        radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
        linear-gradient(180deg, rgba(40, 30, 50, 0.8) 0%, rgba(20, 20, 20, 1) 100%)
      `
    },
    decor: 'grid',
  },
  github: {
    icon: Github,
    label: 'Repository',
    gradient: 'from-[#0d1117] to-[#161b22]',
    borderGlow: 'shadow-[0_0_40px_-10px_rgba(46,160,67,0.6)]',
    accentColor: 'text-green-400',
    iconColor: 'text-white',
    iconBg: 'bg-[#2ea44f]', // GitHub green
    bgStyle: {
      background: `
        radial-gradient(circle at 50% 0%, rgba(46, 160, 67, 0.15) 0%, transparent 60%),
        linear-gradient(180deg, #0d1117 0%, #010409 100%)
      `
    },
    decor: 'code',
  },
  video: {
    icon: Play, // Using Play for video to match concept
    label: 'Watch Record',
    gradient: 'from-[#1a1015] to-[#251015]',
    borderGlow: 'shadow-[0_0_40px_-10px_rgba(244,63,94,0.6)]',
    accentColor: 'text-rose-400',
    iconColor: 'text-white',
    iconBg: 'bg-[#e11d48]',
    bgStyle: {
      background: `
        radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.1) 0%, transparent 60%),
        linear-gradient(180deg, #1a1015 0%, #000000 100%)
      `
    },
    decor: 'scanline',
  },
  default: {
    icon: LinkIcon,
    label: 'External Link',
    gradient: 'from-[#10151a] to-[#101825]',
    borderGlow: 'shadow-[0_0_40px_-10px_rgba(56,189,248,0.6)]',
    accentColor: 'text-sky-400',
    iconColor: 'text-white',
    iconBg: 'bg-[#0ea5e9]',
    bgStyle: {
      background: `
        radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.15) 0%, transparent 60%),
        linear-gradient(180deg, #0f172a 0%, #020617 100%)
      `
    },
    decor: 'dots',
  },
};

interface PortalLinkCardProps {
  title: string;
  url: string;
  type: string;
  index: number;
}

export default function PortalLinkCard({ title, url, type, index }: PortalLinkCardProps) {
  const config = portalConfigs[type as keyof typeof portalConfigs] || portalConfigs.default;
  const Icon = config.icon;

  // Domain for display
  const domain = url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0];

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
      className={`
        group relative flex aspect-[4/3] w-full flex-col overflow-hidden rounded-3xl border border-white/10
        transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 hover:border-white/20
        ${config.borderGlow}
      `}
      style={config.bgStyle}
    >
      {/* --- Decorative Background Elements --- */}
      
      {/* 1. Grid Pattern (Figma) */}
      {config.decor === 'grid' && (
        <div className="absolute inset-0 z-0 opacity-20"
          style={{
             backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
             backgroundSize: '40px 40px',
             maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
          }}
        />
      )}

      {/* 2. Code Matrix (GitHub) */}
      {config.decor === 'code' && (
        <div className="absolute inset-0 z-0 opacity-10 font-mono text-[10px] leading-3 text-green-500 overflow-hidden p-4 select-none pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
             <div key={i} className="whitespace-nowrap opacity-50">
               {`import { ${String.fromCharCode(97+i)} } from 'module-${i}'; const x = ${Math.random().toString(36).substring(7)};`}
             </div>
          ))}
        </div>
      )}

      {/* 3. Scanlines (Video) */}
      {config.decor === 'scanline' && (
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 3px)',
             backgroundSize: '100% 4px',
          }}
        />
      )}

      {/* 4. Dots (Default) */}
      {config.decor === 'dots' && (
        <div className="absolute inset-0 z-0 opacity-10"
           style={{
              backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
              backgroundSize: '20px 20px'
           }}
        />
      )}

      {/* --- Main Content --- */}
      <div className="relative z-10 flex h-full flex-col p-6">
        
        {/* Top: Icon & Label */}
        <div className="flex items-start justify-between">
          <div className={`
             flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg
             ${config.iconBg}
             transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6
          `}>
             <Icon className="h-7 w-7 text-white" strokeWidth={2} />
          </div>
          
          <div className={`
            rounded-full border border-white/10 bg-black/20 px-3 py-1 
            text-[10px] font-bold uppercase tracking-widest backdrop-blur-md
            ${config.accentColor}
          `}>
            {config.label}
          </div>
        </div>

        {/* Middle: Decorative 'Cursor' or Graphics */}
        <div className="flex-1 relative">
           {config.decor === 'grid' && (
             <motion.div 
               className="absolute right-4 top-4"
               animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
             >
                <MousePointer2 className="h-6 w-6 text-purple-400 fill-purple-400/20" />
                <div className="ml-4 -mt-1 rounded-md bg-purple-500 px-2 py-0.5 text-[10px] text-white font-bold">You</div>
             </motion.div>
           )}
        </div>

        {/* Bottom: Title & URL */}
        <div className="space-y-1">
          <h3 className="line-clamp-2 text-2xl font-bold leading-tight text-white group-hover:text-white/90">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-xs font-medium text-white/40 group-hover:text-white/60 transition-colors">
            <span className="truncate max-w-[200px]">{domain}</span>
            <ExternalLink className="h-3 w-3" />
          </div>
        </div>
      </div>
      
      {/* Hover Light Sweep Overlay */}
      <div 
         className="pointer-events-none absolute inset-0 z-20 
                    bg-gradient-to-r from-transparent via-white/5 to-transparent
                    -translate-x-full transition-transform duration-1000 group-hover:translate-x-full"
      />
    </motion.a>
  );
}
