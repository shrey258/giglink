'use client';

import { useState } from 'react';
import { createLink } from '@/app/actions';
import {
  Plus,
  Loader2,
  Link as LinkIcon,
  Figma,
  Github,
  Folder,
  FileText,
  Video,
  Globe,
} from 'lucide-react';
import LinkTypeSelect, { type LinkTypeOption } from '@/components/LinkTypeSelect';

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
          <LinkTypeSelect
            value={selectedType}
            options={linkTypeOptions}
            onChange={setSelectedType}
          />
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
