"use client";

import RegisterForm from "@/components/auth/register-form";
import { Card, Link } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");
  return (
    <Card className="flex w-full max-w-md flex-col gap-4 rounded-large px-8 pb-10 pt-6">
      <p className="pb-4 text-left text-3xl font-semibold">
        Register
        <span aria-label="emoji" className="ml-2" role="img">
          👋
        </span>
      </p>
      <RegisterForm></RegisterForm>
      {errorMessage && (
        <Card className="p-2 px-4 text-danger bg-danger-100 border border-danger">
          {errorMessage}
        </Card>
      )}
      <p className="text-center text-small">
        <Link href="/auth/login" size="sm">
          Already have an account? Log In
        </Link>
      </p>
    </Card>
  );
}
