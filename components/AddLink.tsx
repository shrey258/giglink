'use client';

import { useState } from 'react';
import { createLink } from '@/app/actions';
import { Plus, Loader2, Link as LinkIcon } from 'lucide-react';

export default function AddLink({ projectId }: { projectId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    // Append the project ID so the server knows where this link belongs
    formData.append('projectId', projectId);
    await createLink(formData);
    setLoading(false);
    
    // Reset form (simple way)
    const form = document.getElementById('add-link-form') as HTMLFormElement;
    form.reset();
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 font-semibold text-neutral-900">Add Resource</h3>
      
      <form id="add-link-form" action={handleSubmit} className="flex flex-col gap-3">
        {/* Row 1: Title & Type */}
        <div className="flex gap-3">
          <input 
            name="title" 
            required 
            placeholder="Link Title (e.g. Figma File)" 
            className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white"
          />
          <select 
            name="type" 
            className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:bg-white"
          >
            <option value="figma">Figma</option>
            <option value="github">GitHub</option>
            <option value="drive">Drive</option>
            <option value="invoice">Invoice</option>
            <option value="video">Video</option>
            <option value="default">Website</option>
          </select>
        </div>

        {/* Row 2: URL & Submit */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
            <input 
              name="url" 
              required 
              type="url"
              placeholder="https://..." 
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2 pl-9 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
          <button 
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-black disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
