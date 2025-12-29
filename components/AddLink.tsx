'use client';

import { useEffect, useRef, useState } from 'react';
import { createLink } from '@/app/actions';
import type { LucideIcon } from 'lucide-react';
import {
  Plus,
  Loader2,
  Link as LinkIcon,
  ChevronDown,
  Figma,
  Github,
  Folder,
  FileText,
  Video,
  Globe,
  Check,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type LinkTypeValue = 'figma' | 'github' | 'drive' | 'invoice' | 'video' | 'default';

type LinkTypeOption = {
  value: LinkTypeValue;
  label: string;
  description: string;
  icon: LucideIcon;
};

const linkTypeOptions: LinkTypeOption[] = [
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

const defaultType = linkTypeOptions[0];

export default function AddLink({ projectId }: { projectId: string }) {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<LinkTypeOption>(defaultType);
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

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    // Append the project ID so the server knows where this link belongs
    formData.append('projectId', projectId);
    await createLink(formData);
    setLoading(false);

    // Reset form (simple way)
    const form = document.getElementById('add-link-form') as HTMLFormElement | null;
    form?.reset();
    setSelectedType(defaultType);
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold tracking-tight text-neutral-900">
        Add New Resource
      </h3>

      <form
        id="add-link-form"
        action={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-500">URL</label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
            <input
              name="url"
              required
              type="url"
              placeholder="https://..."
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2.5 pl-9 pr-3 text-sm outline-none transition-all focus:border-neutral-900 focus:bg-white focus:ring-1 focus:ring-neutral-900"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-500">Title</label>
          <input
            name="title"
            required
            placeholder="e.g. Figma File"
            className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-neutral-900 focus:bg-white focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-500">Type</label>
          <input type="hidden" name="type" value={selectedType.value} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                ref={triggerRef}
                className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-left text-sm outline-none transition-all focus-visible:border-neutral-900 focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-neutral-900"
              >
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = selectedType.icon;
                    return <Icon className="h-4 w-4 text-neutral-500" />;
                  })()}
                  <div>
                    <p className="font-medium text-neutral-900">{selectedType.label}</p>
                    <p className="text-xs text-neutral-500">{selectedType.description}</p>
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
              {linkTypeOptions.map((option) => {
                const Icon = option.icon;
                const isActive = selectedType.value === option.value;

                return (
                  <DropdownMenuItem
                    key={option.value}
                    onSelect={() => setSelectedType(option)}
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
        </div>

        <button
          disabled={loading}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 py-2.5 text-sm font-medium text-white transition-all hover:bg-black disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          Add Resource
        </button>
      </form>
    </div>
  );
}
