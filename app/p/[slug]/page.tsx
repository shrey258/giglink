import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import PortalLinkCard from '@/components/PortalLinkCard';
import { getProjectBySlug, getProjectLinks } from '@/lib/queries/projects';
import { FolderOpen } from 'lucide-react';

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
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-white selection:text-neutral-950">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        {/* Primary gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900" />
        
        {/* Animated mesh orbs */}
        <div 
          className="absolute -top-1/4 -right-1/4 h-[800px] w-[800px] rounded-full opacity-30 animate-pulse-slow"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute -bottom-1/4 -left-1/4 h-[600px] w-[600px] rounded-full opacity-20 animate-pulse-slow-reverse"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)',
          }}
        />
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 sm:py-28">
        {/* Hero Section */}
        <header className="mb-16 text-center">
          {/* Client badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium text-neutral-300">
              {project.client_name}
            </span>
          </div>
          
          {/* Project name */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {project.project_name}
          </h1>
          
          {/* Subtitle */}
          <p className="mt-4 text-lg text-neutral-400">
            Project resources & deliverables
          </p>
        </header>

        {/* Links Section */}
        <section>
          {links && links.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {links.map((link, index) => (
                <PortalLinkCard
                  key={link.id}
                  index={index}
                  title={link.title}
                  url={link.url}
                  type={link.type}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-16 text-center backdrop-blur-sm">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                <FolderOpen className="h-7 w-7 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-200">
                No resources yet
              </h3>
              <p className="mt-2 max-w-sm text-sm text-neutral-400">
                Resources and deliverables will appear here once they're added.
              </p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-20 flex justify-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-neutral-400 backdrop-blur-sm transition-colors hover:border-white/20 hover:text-neutral-300">
            <span>Powered by</span>
            <span className="font-semibold text-white">GigLink</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
