import { createClient } from '@/lib/supabase-server';

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

async function resolveClient(client?: SupabaseServerClient) {
  return client ?? await createClient();
}

export async function getUserProjects(userId: string, client?: SupabaseServerClient) {
  const supabase = await resolveClient(client);

  return supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
}

export async function getProjectById(projectId: string, client?: SupabaseServerClient) {
  const supabase = await resolveClient(client);

  return supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();
}

export async function getProjectBySlug(slug: string, client?: SupabaseServerClient) {
  const supabase = await resolveClient(client);

  return supabase
    .from('projects')
    .select('*')
    .eq('magic_slug', slug)
    .single();
}

export async function getProjectLinks(projectId: string, client?: SupabaseServerClient) {
  const supabase = await resolveClient(client);

  return supabase
    .from('project_links')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at', { ascending: true });
}
