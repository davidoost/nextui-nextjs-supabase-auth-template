import { Card } from "@nextui-org/react";

export default function LoginPage() {
  return (
    <Card className="flex flex-col w-full max-w-md p-8 gap-4">
      <p className="text-xl font-medium">Success ✅</p>
      You have successfully signed up. You will receive an email with a link to
      confirm your email address.
    </Card>
  );
}
