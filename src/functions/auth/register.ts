"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function register({
  data,
}: {
  data: {
    email: string;
    password: string;
  };
}) {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return redirect(`/auth/register?error=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/auth/register/success");
}
