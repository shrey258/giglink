import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import PortalLinkCard from '@/components/PortalLinkCard';
import FadeIn from '@/components/FadeIn';
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
    <div className="relative min-h-screen bg-neutral-50 text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Premium Background Layering */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Ambient Glows */}
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-[0.08] blur-[120px] bg-gradient-to-b from-blue-600 via-indigo-500 to-transparent rounded-full" />
        <div className="absolute top-[20%] -left-[10%] w-[600px] h-[600px] opacity-[0.05] blur-[100px] bg-blue-400 rounded-full" />
        <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] opacity-[0.04] blur-[100px] bg-purple-400 rounded-full" />

        {/* Subtle Grid or Noise Pattern could go here if needed, keeping it clean for now */}
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 sm:py-32">
        {/* Header Section */}
        <header className="mb-24 flex flex-col items-center text-center">
          <FadeIn delay={0.2} className="flex flex-col items-center gap-6">
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-neutral-900 sm:text-7xl lg:text-8xl">
              {project.project_name}
            </h1>

            <p className="text-lg font-medium text-neutral-500">
              for {project.client_name}
            </p>
          </FadeIn>
        </header>

        {/* Links Grid Section */}
        <div className="space-y-8">
          <FadeIn delay={0.4}>
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                Project Deliverables ({links?.length || 0})
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {links?.map((link, index) => (
              <FadeIn key={link.id} delay={0.5 + index * 0.05}>
                <PortalLinkCard
                  title={link.title}
                  url={link.url}
                  type={link.type}
                  index={index}
                />
              </FadeIn>
            ))}
          </div>

          {links?.length === 0 && (
            <FadeIn delay={0.5}>
              <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed border-neutral-200 bg-neutral-50/50">
                <p className="text-neutral-400 font-medium italic">
                  No links shared yet.
                </p>
              </div>
            </FadeIn>
          )}
        </div>

        {/* Footer Section */}
        <footer className="mt-32">
          <FadeIn delay={0.8}>
            <div className="flex flex-col items-center gap-6">
              <div className="h-px w-24 bg-neutral-200" />
              <div className="group flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white/80 p-1 pr-4 backdrop-blur-sm transition-all hover:border-neutral-300 hover:shadow-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-900 text-white font-bold text-xs">
                  G
                </div>
                <span className="text-xs font-medium text-neutral-500">
                  Powered by{' '}
                  <span className="text-neutral-900 font-semibold">
                    GigLink
                  </span>
                </span>
              </div>
            </div>
          </FadeIn>
        </footer>
      </div>
    </div>
  );
}
