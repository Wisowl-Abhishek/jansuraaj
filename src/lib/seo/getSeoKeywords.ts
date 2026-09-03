import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getSeoKeywords(category?: string) {
  let query = supabase
    .from("seo_keywords")
    .select("*")
    .eq("is_active", true);
    // .order("priority");

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("SEO keyword fetch error:", error);
    return [];
  }

  return data || [];
}