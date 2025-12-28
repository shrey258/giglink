import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import LinkCard from '@/components/LinkCard';
import { getProjectBySlug, getProjectLinks } from '@/lib/queries/projects';

// Force dynamic rendering so we always get fresh data
export const dynamic = 'force-dynamic';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  // 1. Fetch Project Details
  const { data: project } = await getProjectBySlug(slug, supabase);

  if (!project) {
    notFound();
  }

  // 2. Fetch Links associated with this project
  const { data: links } = await getProjectLinks(project.id, supabase);

  return (
    <div className="min-h-screen bg-neutral-50 selection:bg-neutral-900 selection:text-white">
      {/* Radial Gradient Glow */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 sm:py-32">
        {/* Header */}
        <div className="mb-16 text-center space-y-4">
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">
            {project.client_name}
          </p>
          <h1 className="text-5xl font-bold tracking-tighter text-neutral-900 sm:text-6xl">
            {project.project_name}
          </h1>
          <p className="text-lg text-neutral-500 font-medium">
            Project Deliverables & Resources
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {links?.map((link, index) => (
            <LinkCard
              key={link.id}
              index={index}
              title={link.title}
              url={link.url}
              type={link.type}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-24 flex justify-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white/80 px-4 py-1.5 text-xs font-medium text-neutral-500 backdrop-blur-sm transition-colors hover:border-neutral-300 hover:text-neutral-900">
            <span>Powered by</span>
            <span className="font-semibold text-neutral-900">GigLink</span>
          </div>
        </div>
      </div>
    </div>
  );
}
