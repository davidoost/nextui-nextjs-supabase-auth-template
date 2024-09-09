"use client";

import SearchParamsCallout from "@/components/search-params-callout";
import { Card } from "@nextui-org/react";
import { Suspense } from "react";

export default function ErrorPage() {
  return (
    <Card className="flex w-full max-w-md flex-col gap-4 rounded-large px-8 pb-10 pt-6">
      <p className="pb-4 text-left text-3xl font-semibold">
        Oops
        <span aria-label="emoji" className="ml-2" role="img">
          🙈
        </span>
      </p>
      <p>Something went wrong...</p>
      <Suspense>
        <SearchParamsCallout variant="danger" />
      </Suspense>
    </Card>
  );
}
