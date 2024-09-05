"use client";

import LoginForm from "@/components/auth/login-form";
import { Card, Link } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  return (
    <Card className="flex w-full max-w-md flex-col gap-4 rounded-large px-8 pb-10 pt-6">
      <p className="pb-4 text-left text-3xl font-semibold">
        Log In
        <span aria-label="emoji" className="ml-2" role="img">
          👋
        </span>
      </p>
      <LoginForm></LoginForm>
      {errorMessage && (
        <Card className="p-2 px-4 text-danger bg-danger-100 border border-danger">
          {errorMessage}
        </Card>
      )}
      <p className="text-center text-small">
        <Link href="/auth/register" size="sm">
          Create an account
        </Link>
      </p>
    </Card>
  );
}
