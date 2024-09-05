"use client";

import React, { useState } from "react";
import { forgotPasswordSchema } from "@/schemas/forgot.password.schema";
import { validateFormData } from "@/utils/validate-form-data";
import { Button, Input } from "@nextui-org/react";
import { forgotPassword } from "@/functions/auth/forgot-password";

// Define the shape of the form data
type FormData = {
  email: string;
};

// Define the shape of the error messages
type Errors = {
  email?: string;
};

export default function ForgotPasswordForm() {
  // State to store form data
  const [formData, setFormData] = useState<FormData>({
    email: "",
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
    const { errors, data } = validateFormData(forgotPasswordSchema, formData);

    if (errors) {
      // If there are validation errors, update the errors state and stop loading
      setErrors(errors);
      setIsLoading(false);
    } else {
      // If validation is successful, clear errors and proceed
      setErrors({});
      try {
        const email = await data.email;
        await forgotPassword(email);
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
        variant="bordered"
        id="email"
        name="email"
        type="email"
        label="Email"
        labelPlacement="outside"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        isInvalid={!!errors.email}
        errorMessage={errors.email}
      />
      <Button
        size="md"
        color="primary"
        type="submit"
        isDisabled={isLoading}
        isLoading={isLoading}
      >
        Reset Password
      </Button>
    </form>
  );
}
