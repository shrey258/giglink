import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, FolderOpen, Globe } from 'lucide-react';
import AddLink from '@/components/AddLink';
import PreviewCard from '@/components/PreviewCard';
import DeleteProjectBtn from '@/components/DeleteProjectBtn';
import FadeIn from '@/components/FadeIn';
import LinkCard from '@/components/LinkCard';
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
          <div className="lg:col-span-2 flex flex-col space-y-6">
            <FadeIn delay={0.1}>
              <h1 className="text-2xl font-bold tracking-tight text-neutral-900 h-[38px] flex items-center">
                Active Resources
              </h1>
            </FadeIn>
            {links?.length === 0 ? (
              <FadeIn delay={0.2}>
                <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 bg-white/50 p-12 text-center">
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
              <div className="grid gap-4 sm:grid-cols-2">
                {links?.map((link, index) => (
                  <LinkCard
                    key={link.id}
                    id={link.id}
                    projectId={id}
                    title={link.title}
                    url={link.url}
                    type={link.type}
                    index={index}
                    isEditable={true}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Add Form */}
          <div className="lg:col-span-1 sticky top-8 space-y-6 self-start pt-[62px]">
            <FadeIn delay={0.2}>
              <AddLink projectId={id} />
            </FadeIn>

            {/* <FadeIn delay={0.3}>
              <PreviewCard />
            </FadeIn> */}
          </div>
        </div>
      </div>
    </div>
  );
}
