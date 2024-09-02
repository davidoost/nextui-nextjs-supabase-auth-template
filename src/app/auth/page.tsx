"use client";

import LoginForm from "@/components/auth/login-form";
import SignupForm from "@/components/auth/signup-form";
import { Card, Tabs, Tab } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("errorMessage");
  return (
    <Card className="flex flex-col w-full max-w-md p-8">
      <Tabs>
        <Tab key="login" title="Login">
          <LoginForm></LoginForm>
          {errorMessage && <p className="pt-4 text-danger">{errorMessage}</p>}
        </Tab>
        <Tab key="signup" title="Signup">
          <SignupForm></SignupForm>
          {errorMessage && <p className="pt-4 text-danger">{errorMessage}</p>}
        </Tab>
      </Tabs>
    </Card>
  );
}
