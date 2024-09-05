"use client";

import ResetPasswordForm from "@/components/auth/reset-password-form";
import { Card } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");
  return (
    <Card className="flex w-full max-w-md flex-col gap-4 rounded-large px-8 pb-10 pt-6">
      <p className="pb-4 text-left text-3xl font-semibold">
        Reset Password?
        <span aria-label="emoji" className="ml-2" role="img">
          🔑
        </span>
      </p>
      <ResetPasswordForm></ResetPasswordForm>
      {errorMessage && (
        <Card className="p-2 px-4 text-danger bg-danger-100 border border-danger">
          {errorMessage}
        </Card>
      )}
    </Card>
  );
}
