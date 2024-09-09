import { Card } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function SearchParamsCallout({
  variant,
}: {
  variant: "danger" | "success";
}) {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  return (
    <>
      {message && (
        <Card
          className={`p-2 px-4 text-${variant} bg-${variant}-100 border border-${variant}`}
        >
          {decodeURIComponent(message)}
        </Card>
      )}
    </>
  );
}
