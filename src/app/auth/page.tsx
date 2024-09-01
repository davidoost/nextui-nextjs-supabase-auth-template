"use client";

import LoginForm from "@/components/auth/login-form";
import SignupForm from "@/components/auth/signup-form";
import { Card, Tabs, Tab } from "@nextui-org/react";

export default function LoginPage() {
  return (
    <Card className="flex flex-col w-full max-w-md p-8">
      <Tabs>
        <Tab key="login" title="Login">
          <LoginForm></LoginForm>
        </Tab>
        <Tab key="signup" title="Signup">
          <SignupForm></SignupForm>
        </Tab>
      </Tabs>
    </Card>
  );
}
