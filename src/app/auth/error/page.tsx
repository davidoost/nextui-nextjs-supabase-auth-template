"use client";

import { Card } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  return (
    <Card className="flex w-full max-w-md flex-col gap-4 rounded-large px-8 pb-10 pt-6">
      <p className="pb-4 text-left text-3xl font-semibold">
        Oops
        <span aria-label="emoji" className="ml-2" role="img">
          🙈
        </span>
      </p>
      <p>Something went wrong...</p>
      {message && (
        <Card className="p-2 px-4 text-danger bg-danger-100 border border-danger">
          {decodeURIComponent(message)}
        </Card>
      )}
    </Card>
  );
}
