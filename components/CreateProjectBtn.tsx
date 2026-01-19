'use client';

import { FormEvent, useMemo, useState, useEffect } from 'react';
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
    //setIsOpen(false);

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

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  return (
    <>
      {/* 1. The Trigger Button (Dashed Border) */}
      <button
        onClick={() => setIsOpen(true)}
        disabled={loading}
        className="group relative flex h-52 flex-col items-center justify-center gap-3 rounded-[32px] border-2 border-dashed border-neutral-200/60 bg-white/40 transition-all duration-500 hover:border-blue-500/50 hover:bg-blue-50/30 hover:shadow-premium hover:scale-[1.02] active:scale-[0.98] glass disabled:cursor-not-allowed disabled:opacity-60"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-blue-100 text-blue-600 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-200">
          <Plus className="h-6 w-6" />
        </div>
        <p className="font-bold text-neutral-900 tracking-tight">Create Project</p>
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
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md overflow-hidden rounded-[40px] border border-neutral-200/50 bg-white/80 p-2 shadow-premium glass"
            >
              <div className="bg-white rounded-[32px] border border-neutral-100/50 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 p-8">
                  <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
                    New Project
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-2.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 pt-4">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="clientName" className="mb-1 block text-sm font-medium text-neutral-600">
                        Client Name
                      </label>
                      <input
                        id="clientName"
                        name="clientName"
                        required
                        placeholder="e.g. Acme Corp"
                        className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    <div>
                      <label htmlFor="projectName" className="mb-1 block text-sm font-medium text-neutral-600">
                        Project Name
                      </label>
                      <input
                        id="projectName"
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
                                bounce: 0,
                                duration: 0.4,
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
                                duration: 0.4,
                              }}
                            >
                              <Loader2 className="h-4 w-4 animate-spin" />
                            </motion.span>
                          ) : null}
                        </AnimatePresence>

                        <motion.div layout className="flex items-center">
                          <motion.span
                            layout
                            className="font-medium"
                            transition={{
                              type: 'spring',
                              bounce: 0,
                              duration: 0.4,
                            }}
                          >
                            Creat
                          </motion.span>
                          <div className="relative min-w-[4px]">
                            <AnimatePresence mode="popLayout" initial={false}>
                              <motion.span
                                key={
                                  success
                                    ? 'suffix-success'
                                    : loading
                                      ? 'suffix-loading'
                                      : 'suffix-idle'
                                }
                                layout
                                initial={{
                                  opacity: 0,
                                  x: 10,
                                  filter: 'blur(4px)',
                                }}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                  filter: 'blur(0px)',
                                }}
                                exit={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
                                transition={{
                                  type: 'spring',
                                  bounce: 0,
                                  duration: 0.4,
                                }}
                                className="block whitespace-nowrap"
                              >
                                {success ? 'ed!' : loading ? 'ing…' : 'e Project'}
                              </motion.span>
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      </LayoutGroup>
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
