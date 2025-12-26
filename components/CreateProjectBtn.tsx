'use client';

import { FormEvent, useMemo, useState } from 'react';
import { Plus, Loader2, X, Check } from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { createProject } from '@/app/actions'; // Import the server action

export default function CreateProjectBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'loading' | 'success'>('idle');

  const { loading, success } = useMemo(
    () => ({
      loading: phase === 'loading',
      success: phase === 'success',
    }),
    [phase]
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phase !== 'idle') return;

    const form = event.currentTarget;
    setPhase('loading');

    // --- Simulation mode for animation work ---

    // await new Promise(resolve => setTimeout(resolve, 2000));
    // setPhase('success');

    // // Wait for success animation
    // await new Promise(resolve => setTimeout(resolve, 1500));
    // setPhase('idle');
    // setIsOpen(false);

    // --- Real submission (restore when ready) ---

    const formData = new FormData(form);
    const res = await createProject(formData);

    if (res?.success) {
      setPhase('success');

      setTimeout(() => {
        setPhase('idle');
        setIsOpen(false);
        form.reset();
      }, 1000);
    } else {
      setPhase('idle');
      alert(res?.error || 'Something went wrong');
    }
  }

  return (
    <>
      {/* 1. The Trigger Button (Dashed Border) */}
      <button
        onClick={() => setIsOpen(true)}
        disabled={loading}
        className="group relative flex h-48 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-neutral-200 bg-transparent transition-all hover:border-blue-500 hover:bg-blue-50/50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-transform group-hover:scale-110">
          <Plus className="h-5 w-5" />
        </div>
        <p className="font-medium text-neutral-900">Create Project</p>
      </button>

      {/* 2. The Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral-100 p-6">
                <h2 className="text-xl font-bold text-neutral-900">
                  New Project
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 pt-4">
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-neutral-600">
                      Client Name
                    </label>
                    <input
                      name="clientName"
                      required
                      placeholder="e.g. Acme Corp"
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-neutral-600">
                      Project Name
                    </label>
                    <input
                      name="projectName"
                      required
                      placeholder="e.g. Website Redesign"
                      className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                  <motion.button
                    layout
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    layout
                    type="submit"
                    disabled={loading || success}
                    /* Use framer-motion to animate the background color change too */
                    animate={{
                      backgroundColor: success
                        ? 'rgb(34 197 94)'
                        : 'rgb(23 23 23)',
                    }}
                    className="relative flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed overflow-hidden"
                  >
                    {/* LayoutGroup ensures the icon and text coordinate their movement */}
                    <LayoutGroup>
                      <AnimatePresence mode="popLayout" initial={false}>
                        {success ? (
                          <motion.span
                            key="success-icon"
                            layout
                            initial={{ opacity: 0, x: -10, scale: 0.5 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -10, scale: 0.5 }}
                            transition={{
                              type: 'spring',
                              bounce: 0,
                              duration: 0.3,
                            }}
                          >
                            <Check className="h-4 w-4" />
                          </motion.span>
                        ) : loading ? (
                          <motion.span
                            key="loading-icon"
                            layout
                            initial={{
                              opacity: 0,
                              x: -10,
                              scale: 0.5,
                              filter: 'blur(4px)',
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                              scale: 1,
                              filter: 'blur(0px)',
                            }}
                            exit={{
                              opacity: 0,
                              x: -10,
                              scale: 0.5,
                              filter: 'blur(4px)',
                            }}
                            transition={{
                              type: 'spring',
                              bounce: 0.2,
                              duration: 0.3,
                            }}
                          >
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </motion.span>
                        ) : null}
                      </AnimatePresence>

                      <div className="relative">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={
                              success
                                ? 'success-text'
                                : loading
                                  ? 'loading-text'
                                  : 'idle-text'
                            }
                            layout
                            initial={{
                              opacity: 0,
                              x: 20,
                              scale: 0.6,
                              filter: 'blur(4px)',
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                              scale: 1,
                              filter: 'blur(0px)',
                            }}
                            exit={{
                              opacity: 0,
                              x: -20,
                              scale: 0.6,
                              filter: 'blur(4px)',
                            }}
                            transition={{
                              type: 'spring',
                              bounce: 0,
                              duration: 0.3,
                            }}
                            className="block whitespace-nowrap"
                          >
                            {success
                              ? 'Created!'
                              : loading
                                ? 'Creating...'
                                : 'Create Project'}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </LayoutGroup>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
