'use client';

import { useState, useRef, useEffect } from 'react';
import { deleteProject } from '@/app/actions';
import { Trash2, Loader2, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { useOnClickOutside } from 'usehooks-ts';

export default function DeleteProjectBtn({
  projectId,
  projectName,
}: {
  projectId: string;
  projectName: string;
}) {
  const [mode, setMode] = useState<'idle' | 'confirming'>('idle');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useOnClickOutside(containerRef as React.RefObject<HTMLElement>, () => {
    if (mode === 'confirming' && !loading) {
      setMode('idle');
    }
  });

  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mode === 'confirming') {
        setMode('idle');
      }
    };
    if (mode === 'confirming') {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [mode]);

  async function handleDelete() {
    setLoading(true);
    const res = await deleteProject(projectId);

    if (res?.error) {
      alert(res.error);
      setLoading(false);
      setMode('idle');
    }
    // Success will be handled by redirect in server action
  }

  return (
    <MotionConfig transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}>
      <div className="relative isolate z-50">
        <div ref={containerRef} className="relative">
          <AnimatePresence mode="popLayout" initial={false}>
            {mode === 'idle' ? (
              <motion.button
                layoutId={`delete-container-${projectId}`}
                key="idle"
                onClick={() => setMode('confirming')}
                aria-label="Delete project"
                className="group relative flex h-9 w-9 items-center justify-center rounded-lg border border-transparent bg-transparent text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-red-500 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 outline-none"
              >
                <motion.div
                  layoutId={`delete-icon-${projectId}`}
                  className="relative z-10"
                >
                  <Trash2 className="h-4 w-4" />
                </motion.div>
              </motion.button>
            ) : (
              <motion.div
                layoutId={`delete-container-${projectId}`}
                key="confirming"
                className="absolute right-0 top-0 z-50 flex w-[320px] flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl"
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <motion.div
                      layoutId={`delete-icon-${projectId}`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600"
                    >
                      {loading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <AlertTriangle className="h-5 w-5" />
                      )}
                    </motion.div>
                    <div className="flex-1 space-y-1">
                      <motion.h3
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-semibold text-neutral-900 text-sm leading-tight"
                      >
                        Delete Project?
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xs text-neutral-500 leading-normal"
                      >
                        Are you sure you want to delete{' '}
                        <span className="font-medium text-neutral-900">
                          &quot;{projectName}&quot;
                        </span>
                        ? This action cannot be undone.
                      </motion.p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      autoFocus
                      disabled={loading}
                      onClick={() => setMode('idle')}
                      className="rounded-lg px-3 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 transition-colors focus-visible:ring-2 focus-visible:ring-neutral-200 outline-none"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={loading}
                      onClick={handleDelete}
                      className="rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700 transition-colors focus-visible:ring-2 focus-visible:ring-red-200 outline-none disabled:opacity-50"
                    >
                      {loading ? 'Deleting...' : 'Delete Project'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}
