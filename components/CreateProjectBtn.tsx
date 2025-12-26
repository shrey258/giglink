'use client';

import { FormEvent, useState } from 'react';
import { Plus, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createProject } from '@/app/actions'; // Import the server action

export default function CreateProjectBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    const form = event.currentTarget;
    setLoading(true);

    const formData = new FormData(form);
    const res = await createProject(formData);

    if (res?.success) {
      form.reset();
      setIsOpen(false); // Close modal on success
    } else {
      alert(res?.error || 'Something went wrong');
    }

    setLoading(false);
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
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl px-4 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating…
                      </>
                    ) : (
                      'Create Project'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
