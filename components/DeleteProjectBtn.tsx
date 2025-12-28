'use client';

import { useState } from 'react';
import { deleteProject } from '@/app/actions';
import { Trash2, Loader2 } from 'lucide-react';

export default function DeleteProjectBtn({
  projectId,
  projectName,
}: {
  projectId: string;
  projectName: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (
      !confirm(
        `Are you sure you want to delete "${projectName}"? This action cannot be undone.`
      )
    ) {
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
      title="Delete Project"
      className="rounded-lg p-2 text-neutral-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Trash2 className="h-5 w-5" />
      )}
    </button>
  );
}
