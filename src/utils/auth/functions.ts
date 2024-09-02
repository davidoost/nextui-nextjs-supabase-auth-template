"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  options: z.object({
    data: z.object({
      first_name: z.string().min(1, "First name is required"),
      last_name: z.string().min(1, "Last name is required"),
      date_of_birth: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), "Invalid date of birth"),
    }),
  }),
});

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validationResult = loginSchema.safeParse(data);

  if (!validationResult.success) {
    // Handle validation errors
    const errorMessages = validationResult.error.errors
      .map((err) => err.message)
      .join(", ");
    return redirect(`/auth?errorMessage=${encodeURIComponent(errorMessages)}`);
  }

  const { email, password } = validationResult.data;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return redirect(`/auth?errorMessage=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        date_of_birth: formData.get("date_of_birth"),
      },
    },
  };

  const validationResult = signupSchema.safeParse(data);

  console.log("validationResult: ", JSON.stringify(validationResult, null, 2));

  if (!validationResult.success) {
    // Handle validation errors
    const errorMessages = validationResult.error.errors
      .map((err) => err.message)
      .join(", ");
    return redirect(`/auth?errorMessage=${encodeURIComponent(errorMessages)}`);
  }

  const { email, password, options } = validationResult.data;

  const { error } = await supabase.auth.signUp({ email, password, options });

  if (error) {
    return redirect(`/auth?errorMessage=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function getUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    redirect("/auth");
  }
  return data.user;
}
