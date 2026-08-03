import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://fhyzsisluszpfhlngiyb.supabase.co";

const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  "sb_publishable_Ap0mODzw2nG0N0KCzZVs0w_7eCxXowt";

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

