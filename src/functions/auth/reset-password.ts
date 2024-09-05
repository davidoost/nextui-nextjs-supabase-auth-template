"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function resetPassword(password: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return redirect(`/auth/reset-password?error=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/auth/reset-password/success");
}
