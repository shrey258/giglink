'use client';

import { useState } from 'react';
import { createLink } from '@/app/actions';
import {
  Plus,
  Loader2,
  Link as LinkIcon,
  Type,
  MousePointer2,
} from 'lucide-react';
import LinkTypeSelect, {
  linkTypeOptions,
  defaultLinkType,
  type LinkTypeOption,
} from '@/components/LinkTypeSelect';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface FieldIdentityBadgeProps {
  icon: LucideIcon;
  className?: string;
}

function FieldIdentityBadge({
  icon: Icon,
  className,
}: FieldIdentityBadgeProps) {
  return (
    <div
      className={cn(
        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white shadow-sm transition-transform hover:scale-105',
        className
      )}
    >
      <Icon className="h-4 w-4" />
    </div>
  );
}

export default function AddLink({ projectId }: { projectId: string }) {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] =
    useState<LinkTypeOption>(defaultLinkType);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    // Append the project ID so the server knows where this link belongs
    formData.append('projectId', projectId);
    await createLink(formData);
    setLoading(false);

    // Reset form (simple way)
    const form = document.getElementById(
      'add-link-form'
    ) as HTMLFormElement | null;
    form?.reset();
    setSelectedType(defaultLinkType);
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      {/* <h3 className="mb-4 text-sm font-semibold tracking-tight text-neutral-900">
        Add New Resource
      </h3> */}

      <div className="mb-6 flex items-center justify-center">
        <div className="flex -space-x-3">
          <FieldIdentityBadge icon={LinkIcon} className="ring-4 ring-white" />
          <FieldIdentityBadge icon={Type} className="ring-4 ring-white" />
          <FieldIdentityBadge
            icon={MousePointer2}
            className="ring-4 ring-white"
          />
        </div>
      </div>

      <form
        id="add-link-form"
        action={handleSubmit}
        className="flex flex-col gap-4"
      >
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-500">URL</label>
          <div className="flex items-center gap-2">
            <FieldIdentityBadge icon={LinkIcon} />
            <div className="relative flex-1">
              <input
                name="url"
                required
                type="url"
                placeholder="https://..."
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 py-2.5 px-3 text-sm outline-none transition-all focus:border-neutral-900 focus:bg-white focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-500">Title</label>
          <div className="flex items-center gap-2">
            <FieldIdentityBadge icon={Type} />
            <input
              name="title"
              required
              placeholder="e.g. Figma File"
              className="flex-1 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm outline-none transition-all focus:border-neutral-900 focus:bg-white focus:ring-1 focus:ring-neutral-900"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-500">Type</label>
          <div className="flex items-center gap-2">
            <FieldIdentityBadge icon={MousePointer2} />
            <div className="flex-1">
              <input type="hidden" name="type" value={selectedType.value} />
              <LinkTypeSelect
                value={selectedType}
                options={linkTypeOptions}
                onChange={setSelectedType}
              />
            </div>
          </div>
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
