import { Card } from "@nextui-org/react";

export default function ForgotPasswordSuccessPage() {
  return (
    <Card className="flex flex-col w-full max-w-md p-8 gap-4">
      <p className="text-xl font-medium">Success ✅</p>
      You have successfully requested a password reset. You will receive an
      email containing a link to reset your password.
    </Card>
  );
}
