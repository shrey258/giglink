'use server';

import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export async function createProject(formData: FormData) {
  const supabase = await createClient();

  // 1. Check Auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'You must be logged in' };
  }

  // 2. Extract Data
  const clientName = formData.get('clientName') as string;
  const projectName = formData.get('projectName') as string;

  if (!clientName || !projectName) {
    return { error: 'Please fill in all fields' };
  }

  // 3. Generate a Random "Magic Slug" (e.g., "x9z2-m4k1")
  // Simple random string generator without external libraries
  const magicSlug = Math.random().toString(36).substring(2, 6) + '-' + Math.random().toString(36).substring(2, 6);

  // 4. Insert into DB
  const { error } = await supabase.from('projects').insert({
    user_id: user.id,
    client_name: clientName,
    project_name: projectName,
    magic_slug: magicSlug,
    status: 'active',
  });

  if (error) {
    console.error(error);
    return { error: 'Failed to create project' };
  }

  // 5. Refresh the Dashboard so the new project appears immediately
  revalidatePath('/dashboard');
  
  return { success: true };
}
