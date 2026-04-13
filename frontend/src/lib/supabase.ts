import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { browser } from '$app/environment';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
	if (!browser) return null;

	if (!supabaseInstance) {
		// @ts-ignore — env vars may not exist during initial build
		const url = import.meta.env?.PUBLIC_SUPABASE_URL;
		const key = import.meta.env?.PUBLIC_SUPABASE_ANON_KEY;

		if (url && key) {
			supabaseInstance = createClient(url, key);
		}
	}
	return supabaseInstance;
}
