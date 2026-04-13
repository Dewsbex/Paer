import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { getSupabase } from '$lib/supabase';
import type { User } from '@supabase/supabase-js';

export const user = writable<User | null>(null);

export async function initSession() {
	if (!browser) return;

	const supabase = getSupabase();
	if (!supabase) return;

	const { data } = await supabase.auth.getSession();
	user.set(data.session?.user ?? null);

	supabase.auth.onAuthStateChange((_event, session) => {
		user.set(session?.user ?? null);
	});
}

export async function signOut() {
	const supabase = getSupabase();
	if (!supabase) return;
	await supabase.auth.signOut();
	user.set(null);
}
