import { Button, Card, Link } from "@nextui-org/react";

export default function NotFoundPage() {
  return (
    <Card className="flex w-full max-w-md flex-col gap-4 rounded-large px-8 pb-10 pt-6">
      <p className="pb-4 text-left text-3xl font-semibold">
        Oops
        <span aria-label="emoji" className="ml-2" role="img">
          🙈
        </span>
      </p>
      <p>We couldn&apos;t find the page you&apos;re looking for...</p>
      <Link href="/">
        <Button color="primary">Home</Button>
      </Link>
    </Card>
  );
}
