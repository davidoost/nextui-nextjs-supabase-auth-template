import { getUser } from "@/utils/auth/functions";
import { Card, CardBody } from "@nextui-org/react";

export default async function Home() {
  const user = await getUser();
  return (
    <Card>
      <CardBody>Hello {user.email}</CardBody>
    </Card>
  );
}
