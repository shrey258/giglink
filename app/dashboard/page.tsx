import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import CreateProjectBtn from '@/components/CreateProjectBtn';
import { getUserProjects } from '@/lib/queries/projects';
import { signOut } from '@/app/actions';

export default async function DashboardPage() {
  const supabase = await createClient();

  // 1. Check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // 2. Fetch User's Projects
  const { data: projects } = await getUserProjects(user.id, supabase);

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
              Dashboard
            </h1>
            <p className="text-neutral-500">
              Manage your client links and projects.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <form action={signOut}>
              <button className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-white">
                Log out
              </button>
            </form>
            <div className="h-10 w-10 overflow-hidden rounded-full border border-neutral-200 bg-white">
              {/* Show User Avatar or Fallback */}
              {user.user_metadata.avatar_url ? (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="User"
                  width={40}
                  height={40}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-blue-100 text-blue-600 font-bold">
                  {user.email?.[0].toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: The "Create New" Button */}
          <CreateProjectBtn />

          {/* Cards 2...n: The Actual Projects */}
          {projects?.map(project => (
            <Link
              key={project.id}
              href={`/dashboard/project/${project.id}`}
              className="group relative flex h-48 flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:ring-2 hover:ring-blue-500/20"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="inline-flex items-center rounded-md bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600">
                    {project.client_name}
                  </div>
                  {/* Link to the public page */}
                  <object className="relative z-10">
                    <Link
                      href={`/p/${project.magic_slug}`}
                      target="_blank"
                      className="text-neutral-400 hover:text-blue-600"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </object>
                </div>
                <h3 className="font-semibold text-neutral-900">
                  {project.project_name}
                </h3>
              </div>

              <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                    project.status === 'active'
                      ? 'text-green-600'
                      : 'text-neutral-500'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      project.status === 'active'
                        ? 'bg-green-600'
                        : 'bg-neutral-300'
                    }`}
                  />
                  {project.status.charAt(0).toUpperCase() +
                    project.status.slice(1)}
                </span>

                <p className="text-xs text-neutral-400">
                  {new Date(project.created_at).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
