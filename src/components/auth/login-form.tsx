import { login } from "@/utils/auth/functions";
import { Button, Input } from "@nextui-org/react";

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-4">
      <Input
        isRequired
        variant="bordered"
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
      />
      <Input
        isRequired
        variant="bordered"
        id="password"
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
      />
      <Button size="lg" color="primary" type="submit" formAction={login}>
        Submit
      </Button>
    </form>
  );
}
