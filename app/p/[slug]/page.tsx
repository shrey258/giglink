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
    <div className="relative min-h-screen bg-neutral-50/50 text-neutral-900 selection:bg-neutral-900 selection:text-white overflow-x-hidden">
      {/* Premium Background Layering */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Animated Ambient Glows */}
        <div className="absolute -top-[20%] left-1/2 w-[1200px] h-[800px] blur-[140px] bg-gradient-to-b from-blue-500 via-indigo-400 to-transparent rounded-full animate-breathe" />

        <div
          className="absolute top-[10%] -left-[15%] w-[700px] h-[700px] opacity-[0.08] blur-[120px] bg-sky-400 rounded-full animate-float"
        />
        <div
          className="absolute bottom-[10%] -right-[15%] w-[600px] h-[600px] opacity-[0.06] blur-[100px] bg-purple-400 rounded-full animate-float-reverse"
        />

        {/* Dot Grid Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#e5e5e5_1.5px,transparent_0)] bg-[size:32px_32px] opacity-40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 sm:py-40">
        {/* Header Section */}
        <header className="mb-32 flex flex-col items-center text-center">
          <FadeIn delay={0.2} className="flex flex-col items-center gap-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-blue-600 ring-1 ring-inset ring-blue-600/10">
              Project Portal
            </div>
            <h1 className="max-w-4xl text-6xl font-black tracking-tight text-neutral-900 sm:text-8xl lg:text-9xl leading-[0.9]">
              {project.project_name.split(' ').map((word: string, i: number) => (
                <span key={i} className="inline-block mr-[0.2em] last:mr-0">
                  {word}
                </span>
              ))}
            </h1>


            <p className="text-xl font-medium text-neutral-500 max-w-lg">
              Secure resource hub curated for <span className="text-neutral-900 font-bold underline decoration-blue-500/30 underline-offset-4">{project.client_name}</span>.
            </p>
          </FadeIn>
        </header>

        {/* Links Grid Section */}
        <div className="space-y-12">
          <FadeIn delay={0.4}>
            <div className="flex items-center justify-between border-b border-neutral-200/60 pb-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                Deliverables & Resources — {links?.length || 0}
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
              <div className="flex flex-col items-center justify-center py-24 rounded-[40px] border-2 border-dashed border-neutral-200 bg-white/40 glass">
                <p className="text-neutral-400 font-bold italic tracking-tight">
                  Awaiting project assets...
                </p>
              </div>
            </FadeIn>
          )}
        </div>

        {/* Footer Section */}
        <footer className="mt-48">
          <FadeIn delay={0.8}>
            <div className="flex flex-col items-center gap-10">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
              <div className="group flex items-center gap-3 rounded-[24px] border border-neutral-200/50 bg-white/60 p-1.5 pr-6 glass shadow-premium transition-all hover:scale-105 active:scale-95">
                <div className="flex h-10 w-10 items-center justify-center rounded-[18px] bg-neutral-900 text-white font-black text-sm shadow-xl">
                  G
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider leading-none">
                    Powered by
                  </span>
                  <span className="text-sm font-black text-neutral-900">
                    GigLink
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </footer>
      </div>
    </div>


  );
}
