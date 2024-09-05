import { Button, Card, Link } from "@nextui-org/react";

export default function ErrorPage() {
  return (
    <Card className="flex flex-col w-full max-w-md p-8 gap-4">
      <p className="text-xl font-medium">Error 💣</p>
      Something went wrong.
      <Link href="/auth/login">
        <Button>Log in</Button>
      </Link>
    </Card>
  );
}
