'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Define the type based on usage
interface Project {
  id: string;
  client_name: string;
  magic_slug: string;
  project_name: string;
  status: string;
  created_at: string;
  user_id: string; // Including other fields that might be present
}

export default function ProjectCard({ project }: { project: Project }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Link
      href={`/dashboard/project/${project.id}`}
      onClick={() => setIsLoading(true)}
      className="group relative flex h-52 flex-col justify-between overflow-hidden rounded-[32px] border border-neutral-200/60 bg-white/60 p-7 shadow-sm transition-all duration-500 hover:shadow-premium glass hover:scale-[1.02] active:scale-[0.98]"
    >
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-sm"
          >
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600">
            {project.client_name}
          </div>
          {/* Link to the public page */}
          <object className="relative z-10" onClick={e => e.stopPropagation()}>
            <Link
              href={`/p/${project.magic_slug}`}
              target="_blank"
              aria-label={`View ${project.project_name} public page`}
              className="text-neutral-400 hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm"
              onClick={e => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          </object>
        </div>
        <h3 className="font-semibold text-neutral-900">
          {project.project_name}
        </h3>
      </div>
      <div className="flex items-center justify-between border-t border-neutral-100/50 pt-4 mt-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 opacity-60">
          Created {new Date(project.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
    </Link>

  );
}
