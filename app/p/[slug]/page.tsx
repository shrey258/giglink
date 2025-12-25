import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import LinkCard from '@/components/LinkCard';
import { getProjectBySlug, getProjectLinks } from '@/lib/queries/projects';

// Force dynamic rendering so we always get fresh data
export const dynamic = 'force-dynamic';

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
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
    <div className="min-h-screen bg-neutral-50 py-24 px-4">
      <div className="mx-auto max-w-xl space-y-12">
        
        {/* Header Section */}
        <div className="space-y-2 text-center">
          <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold tracking-wider text-blue-700 uppercase">
            {project.client_name}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
            {project.project_name}
          </h1>
        </div>

        {/* Links Grid */}
        <div className="flex flex-col gap-4">
          {links?.map((link, index) => (
            <LinkCard 
              key={link.id}
              index={index} // Pass index for animation delay
              title={link.title}
              url={link.url}
              type={link.type}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center opacity-60">
          <p className="text-xs text-neutral-400">
            Securely shared via <span className="font-semibold text-neutral-600">GigLink</span>
          </p>
        </div>

      </div>
    </div>
  );
}