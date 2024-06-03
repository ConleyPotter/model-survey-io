import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../types/supabase';

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_API_KEY!)

export default supabase;

export const authenticated_supabase = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_PUBLIC_KEY!);

export async function signInWithEmail(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) console.log(error);

    console.log(data.user.id);

    return data.user.id;
}

export async function signOut() {
    const { error } = await supabase.auth.signOut()

    if (error) console.log(error);
}