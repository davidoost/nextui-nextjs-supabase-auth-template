"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function forgotPassword(email: string) {
  const supabase = createClient();
  const headersList = headers(); // Get request headers
  const host = headersList.get("host"); // Get the host from the headers
  const protocol = host?.includes("localhost") ? "http" : "https"; // Determine protocol

  const baseUrl = `${protocol}://${host}`;

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${baseUrl}/auth/reset-password`,
  });

  if (error) {
    return redirect(`/auth/forgot-password?error=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/auth/forgot-password/success");
}
