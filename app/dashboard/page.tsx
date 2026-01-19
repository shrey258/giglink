import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import CreateProjectBtn from '@/components/CreateProjectBtn';
import ProjectCard from '@/components/ProjectCard';
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
    <div className="min-h-screen bg-neutral-50/50 p-8 sm:p-12 relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#e5e5e5_1.5px,transparent_0)] bg-[size:32px_32px] opacity-40" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl space-y-12">

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
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
