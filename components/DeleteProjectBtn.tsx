'use client';

import { useState } from 'react';
import { deleteProject } from '@/app/actions';
import { Trash2, Loader2 } from 'lucide-react';

export default function DeleteProjectBtn({ projectId, projectName }: { projectId: string, projectName: string }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete "${projectName}"? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    // Server action handles redirect on success
    const res = await deleteProject(projectId);
    
    if (res?.error) {
      alert(res.error);
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 hover:border-red-300 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
      Delete
    </button>
  );
}
