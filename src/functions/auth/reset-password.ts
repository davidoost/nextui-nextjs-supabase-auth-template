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
    return redirect(`/auth/error?message=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect(
    `/auth/success?message=${encodeURIComponent(
      "You have successfully reset your password. You can now log in using your new password."
    )}`
  );
}
