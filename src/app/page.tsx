import { createClient } from "@/utils/supabase/server";
import { Card, CardBody } from "@nextui-org/react";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <Card>
      <CardBody>Hello {data.user.email}</CardBody>
    </Card>
  );
}
