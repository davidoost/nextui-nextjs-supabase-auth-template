import { Button, Card, Link } from "@nextui-org/react";

export default function ForgotPasswordSuccessPage() {
  return (
    <Card className="flex flex-col w-full max-w-md p-8 gap-4">
      <p className="text-xl font-medium">Success ✅</p>
      You have successfully reset your password. You can now log in using your
      new password.
      <Link href="/auth/login">
        <Button>Log in</Button>
      </Link>
    </Card>
  );
}
