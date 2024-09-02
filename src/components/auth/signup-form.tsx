"use client";

import React, { useState } from "react";
import { validateFormData } from "@/utils/validate-form-data";
import { Button, Input } from "@nextui-org/react";
import { signup } from "@/utils/auth/functions";
import { signupSchema } from "@/schemas/signup.schema";

// Define the shape of the form data
type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

// Define the shape of the error messages
type Errors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
};

export default function signupForm() {
  // State to store form data
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  // State to store validation error messages
  const [errors, setErrors] = useState<Errors>({});

  // State to store loading status
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handle changes in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Update the relevant field based on the input name
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission

    setIsLoading(true); // Set loading state to true when submission starts

    // Validate form data using the validation function and schema
    const { errors, data } = validateFormData(signupSchema, formData);

    if (errors) {
      // If there are validation errors, update the errors state and stop loading
      setErrors(errors);
      setIsLoading(false);
    } else {
      // If validation is successful, clear errors and proceed
      setErrors({});
      try {
        await signup({ data });
        // Handle successful login (e.g., redirect or show success message)
      } catch (error) {
        // Handle login error (e.g., show error message)
        console.error("Login failed:", error);
      } finally {
        setIsLoading(false); // Reset loading state after submission is done
      }
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        isRequired
        variant="bordered"
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        isInvalid={!!errors.email}
        errorMessage={errors.email}
      />
      <Input
        isRequired
        variant="bordered"
        id="password"
        name="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        isInvalid={!!errors.password}
        errorMessage={errors.password}
      />
      <Input
        isRequired
        variant="bordered"
        id="confirm_password"
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
        isInvalid={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword}
      />
      <div className="flex gap-4">
        <Input
          isRequired
          variant="bordered"
          id="first_name"
          name="firstName"
          type="first_name"
          label="First Name"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={handleChange}
          isInvalid={!!errors.firstName}
          errorMessage={errors.firstName}
        />
        <Input
          isRequired
          variant="bordered"
          id="last_name"
          name="lastName"
          type="last_name"
          label="Last Name"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={handleChange}
          isInvalid={!!errors.lastName}
          errorMessage={errors.lastName}
        />
      </div>
      <Button
        size="lg"
        color="primary"
        type="submit"
        isDisabled={isLoading}
        isLoading={isLoading}
      >
        Submit
      </Button>
    </form>
  );
}
