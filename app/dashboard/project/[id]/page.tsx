import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Trash2 } from 'lucide-react';
import AddLink from '@/components/AddLink';
import DeleteProjectBtn from '@/components/DeleteProjectBtn';
import { deleteLink } from '@/app/actions';
import { getProjectById, getProjectLinks } from '@/lib/queries/projects';

export default async function ProjectEditor({ params }: { params: { id: string } }) {
  const { id } = await params; // await params in Next.js 15
  const supabase = await createClient();

  // 1. Fetch Project
  const { data: project } = await getProjectById(id, supabase);

  if (!project) notFound();

  // 2. Fetch Links
  const { data: links } = await getProjectLinks(id, supabase);

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-neutral-900">{project.project_name}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <DeleteProjectBtn projectId={project.id} projectName={project.project_name} />
            
            <Link 
              href={`/p/${project.magic_slug}`}
              target="_blank" 
              className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
            >
              View Live Page <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          
          {/* Left Column: Link List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral-900">Active Links</h2>
            
            {links?.length === 0 ? (
              <div className="rounded-xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500">
                No links yet. Add one to get started.
              </div>
            ) : (
              links?.map((link) => (
                <div key={link.id} className="group flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:border-blue-400">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 text-neutral-500">
                      {/* Simple Type Indicator */}
                      <span className="text-xs font-bold uppercase">{link.type.slice(0, 2)}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-900">{link.title}</h3>
                      <p className="text-xs text-neutral-400 truncate max-w-[200px]">{link.url}</p>
                    </div>
                  </div>

                  {/* Delete Button (Wrapped in a Form for Server Action) */}
                  <form action={async () => {
                    'use server';
                    await deleteLink(link.id, id);
                  }}>
                    <button className="rounded-lg p-2 text-neutral-400 hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </form>
                </div>
              ))
            )}
          </div>

          {/* Right Column: Add Form */}
          <div>
            <AddLink projectId={id} />
          </div>

        </div>
      </div>
    </div>
  );
}
