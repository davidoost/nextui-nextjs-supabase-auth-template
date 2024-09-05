"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login({
  data,
}: {
  data: { email: string; password: string };
}) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return redirect(`/auth/login?error=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
