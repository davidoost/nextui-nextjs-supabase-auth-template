import { signup } from "@/utils/auth/functions";
import { Button, DatePicker, Input } from "@nextui-org/react";

export default function SignupForm() {
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
      <Input
        isRequired
        variant="bordered"
        id="confirm_password"
        name="confirm_password"
        type="password"
        label="Confirm Password"
        placeholder="Confirm your password"
      />
      <div className="flex gap-4">
        <Input
          isRequired
          variant="bordered"
          id="first_name"
          name="first_name"
          type="first_name"
          label="First Name"
          placeholder="Enter your first name"
        />
        <Input
          isRequired
          variant="bordered"
          id="last_name"
          name="last_name"
          type="last_name"
          label="Last Name"
          placeholder="Enter your last name"
        />
      </div>

      <DatePicker
        isRequired
        variant="bordered"
        id="date_of_birth"
        name="date_of_birth"
        label="Date of Birth"
        showMonthAndYearPickers
      />
      <Button size="lg" color="primary" type="submit" formAction={signup}>
        Submit
      </Button>
    </form>
  );
}
