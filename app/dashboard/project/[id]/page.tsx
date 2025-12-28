import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, FolderOpen, Globe, Trash2 } from 'lucide-react';
import AddLink from '@/components/AddLink';
import DeleteProjectBtn from '@/components/DeleteProjectBtn';
import FadeIn from '@/components/FadeIn';
import { deleteLink } from '@/app/actions';
import { getProjectById, getProjectLinks } from '@/lib/queries/projects';

export default async function ProjectEditor({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params; // await params in Next.js 15
  const supabase = await createClient();

  // 1. Fetch Project
  const { data: project } = await getProjectById(id, supabase);

  if (!project) notFound();

  // 2. Fetch Links
  const { data: links } = await getProjectLinks(id, supabase);

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <FadeIn className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Link
              href="/dashboard"
              className="hover:text-neutral-900 transition-colors"
            >
              Dashboard
            </Link>
            <ChevronRight className="h-4 w-4 text-neutral-400" />
            <span className="font-medium text-neutral-900">
              {project.project_name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/p/${project.magic_slug}`}
              target="_blank"
              className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-all hover:border-neutral-300 hover:bg-neutral-50"
            >
              <Globe className="h-4 w-4" />
              View Live Page
            </Link>
            <div className="mx-1 h-4 w-px bg-neutral-200" />
            <DeleteProjectBtn
              projectId={project.id}
              projectName={project.project_name}
            />
          </div>
        </FadeIn>

        <div className="grid gap-8 lg:grid-cols-3 items-start">
          {/* Left Column: Link List */}
          <div className="space-y-6 lg:col-span-2">
            <FadeIn delay={0.1}>
              <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                Active Resources
              </h1>
            </FadeIn>

            {links?.length === 0 ? (
              <FadeIn delay={0.2}>
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 bg-white/50 p-12 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                    <FolderOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-neutral-900">
                    No resources yet
                  </h3>
                  <p className="mt-1 max-w-xs text-sm text-neutral-500">
                    Add your first link using the panel on the right to get
                    started.
                  </p>
                </div>
              </FadeIn>
            ) : (
              <div className="space-y-3">
                {links?.map((link, index) => (
                  <FadeIn key={link.id} delay={0.1 + index * 0.05}>
                    <div className="group flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:border-neutral-300 hover:shadow-md">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-w-0 flex-1 items-center gap-4"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-xs font-bold uppercase text-neutral-500 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                          {link.type.slice(0, 2)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-medium text-neutral-900 transition-colors group-hover:text-blue-600">
                            {link.title}
                          </h3>
                          <p className="truncate text-xs text-neutral-400">
                            {link.url}
                          </p>
                        </div>
                      </a>

                      {/* Delete Button (Wrapped in a Form for Server Action) */}
                      <form
                        action={async () => {
                          'use server';
                          await deleteLink(link.id, id);
                        }}
                        className="ml-4"
                      >
                        <button className="rounded-lg p-2 text-neutral-300 opacity-0 transition-all hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 focus:opacity-100">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Add Form */}
          <div className="lg:col-span-1 sticky top-8 self-start">
            <FadeIn delay={0.2}>
              <AddLink projectId={id} />
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
