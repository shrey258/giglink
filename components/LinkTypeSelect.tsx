'use client';

import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ChevronDown, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type LinkTypeValue = 'figma' | 'github' | 'drive' | 'invoice' | 'video' | 'default';

export type LinkTypeOption = {
  value: LinkTypeValue;
  label: string;
  description: string;
  icon: LucideIcon;
};

interface LinkTypeSelectProps {
  value: LinkTypeOption;
  options: LinkTypeOption[];
  onChange: (option: LinkTypeOption) => void;
}

export default function LinkTypeSelect({ value, options, onChange }: LinkTypeSelectProps) {
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
          className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-left text-sm outline-none transition-all focus-visible:border-neutral-900 focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-neutral-900"
        >
          <div className="flex items-center gap-3">
            {(() => {
              const Icon = value.icon;
              return <Icon className="h-4 w-4 text-neutral-500" />;
            })()}
            <div>
              <p className="font-medium text-neutral-900">{value.label}</p>
              <p className="text-xs text-neutral-500">{value.description}</p>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-neutral-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={6}
        className="p-1"
        style={menuWidth ? { width: menuWidth } : undefined}
      >
        {options.map((option) => {
          const Icon = option.icon;
          const isActive = value.value === option.value;

          return (
            <DropdownMenuItem
              key={option.value}
              onSelect={() => onChange(option)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-700 data-highlighted:bg-neutral-100"
            >
              <Icon className="h-4 w-4 text-neutral-500" />
              <div className="flex-1 text-left">
                <p className="font-medium text-neutral-900">{option.label}</p>
                <p className="text-xs text-neutral-500">{option.description}</p>
              </div>
              {isActive && <Check className="h-4 w-4 text-neutral-900" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
