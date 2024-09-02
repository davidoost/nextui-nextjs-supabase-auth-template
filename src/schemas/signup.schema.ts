import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z.string().min(1, "Please provide your first name"),
    lastName: z.string().min(1, "Please provide your last name"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/, {
        message:
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error message will be associated with confirmPassword
  });
