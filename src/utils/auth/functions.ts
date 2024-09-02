"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { loginSchema, signupSchema } from "./schema";

import { createClient } from "@/utils/supabase/server";

export async function login({
  data,
}: {
  data: { email: string; password: string };
}) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return redirect(`/auth?errorMessage=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup({
  data,
}: {
  data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  };
}) {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
      },
    },
  });

  if (error) {
    return redirect(`/auth?errorMessage=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/auth/success");
}

export async function getUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    redirect("/auth");
  }
  return data.user;
}
