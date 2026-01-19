'use client';

import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ChevronDown,
  Check,
  Figma,
  Github,
  Folder,
  FileText,
  Video,
  Globe,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';


export type LinkTypeValue =
  | 'figma'
  | 'github'
  | 'drive'
  | 'invoice'
  | 'video'
  | 'default';

export type LinkTypeOption = {
  value: LinkTypeValue;
  label: string;
  description: string;
  icon: LucideIcon;
};

export const linkTypeOptions: LinkTypeOption[] = [
  {
    value: 'figma',
    label: 'Figma',
    description: 'Design files & prototypes',
    icon: Figma,
  },
  {
    value: 'github',
    label: 'GitHub',
    description: 'Repositories & PRs',
    icon: Github,
  },
  {
    value: 'drive',
    label: 'Drive',
    description: 'Google Drive folders',
    icon: Folder,
  },
  {
    value: 'invoice',
    label: 'Invoice',
    description: 'Billing docs & PDFs',
    icon: FileText,
  },
  {
    value: 'video',
    label: 'Video',
    description: 'Demos & walkthroughs',
    icon: Video,
  },
  {
    value: 'default',
    label: 'Website',
    description: 'Any external link',
    icon: Globe,
  },
];

export const defaultLinkType = linkTypeOptions[0];

interface LinkTypeSelectProps {
  value: LinkTypeOption;
  options: LinkTypeOption[];
  onChange: (option: LinkTypeOption) => void;
}

export default function LinkTypeSelect({
  value,
  options,
  onChange,
}: LinkTypeSelectProps) {
  const [menuWidth, setMenuWidth] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const syncWidth = () => {
      if (triggerRef.current) {
        setMenuWidth(triggerRef.current.offsetWidth);
      }
    };

    syncWidth();
    window.addEventListener('resize', syncWidth);
    return () => window.removeEventListener('resize', syncWidth);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          ref={triggerRef}
          className="flex w-full items-center justify-between rounded-xl border border-neutral-200/60 bg-white/50 px-4 py-3 text-left text-sm outline-none transition-all hover:bg-white/80 focus-visible:border-neutral-900/30 focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-neutral-900/20 shadow-sm hover:shadow-md backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            {(() => {
              const Icon = value.icon;
              return (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 group-hover:bg-neutral-200 transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
              );
            })()}
            <div>
              <p className="font-semibold text-neutral-900 leading-tight">{value.label}</p>
              <p className="text-[11px] text-neutral-500 font-medium">{value.description}</p>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-neutral-400 transition-transform group-hover:translate-y-0.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={8}
        className="glass p-1.5 shadow-premium border-neutral-200/50 rounded-2xl min-w-[200px]"
        style={menuWidth ? { width: menuWidth } : undefined}
      >
        {options.map(option => {
          const Icon = option.icon;
          const isActive = value.value === option.value;

          return (
            <DropdownMenuItem
              key={option.value}
              onSelect={() => onChange(option)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-700 data-highlighted:bg-neutral-900/5 data-highlighted:text-neutral-900 transition-colors cursor-pointer mb-0.5 last:mb-0"
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isActive ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 text-left">
                <p className={`font-semibold leading-tight ${isActive ? 'text-neutral-900' : 'text-neutral-700'}`}>{option.label}</p>
                <p className="text-[11px] text-neutral-500 font-medium">{option.description}</p>
              </div>
              {isActive && (
                <motion.div layoutId="active-check">
                  <Check className="h-4 w-4 text-neutral-900" />
                </motion.div>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>

    </DropdownMenu>
  );
}
