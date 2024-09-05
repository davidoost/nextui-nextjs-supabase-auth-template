"use client";

import React, { useState } from "react";
import { resetPasswordSchema } from "@/schemas/reset.password.schema";
import { validateFormData } from "@/utils/validate-form-data";
import { Button, Input } from "@nextui-org/react";
import { resetPassword } from "@/functions/auth/reset-password";
import { Icon } from "@iconify/react";

// Define the shape of the form data
type FormData = {
  password: string;
  confirmPassword: string;
};

// Define the shape of the error messages
type Errors = {
  password?: string;
  confirmPassword?: string;
};

export default function ResetPasswordForm() {
  // State to store form data
  const [formData, setFormData] = useState<FormData>({
    password: "",
    confirmPassword: "",
  });

  // State to store validation error messages
  const [errors, setErrors] = useState<Errors>({});

  // State to store loading status
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // State to store password visibility
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

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
    const { errors, data } = validateFormData(resetPasswordSchema, formData);

    if (errors) {
      // If there are validation errors, update the errors state and stop loading
      setErrors(errors);
      setIsLoading(false);
    } else {
      // If validation is successful, clear errors and proceed
      setErrors({});
      try {
        await resetPassword(data.password);
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
        endContent={
          <button type="button" onClick={toggleVisibility}>
            {isVisible ? (
              <Icon
                className="pointer-events-none text-2xl text-default-400"
                icon="solar:eye-closed-linear"
              />
            ) : (
              <Icon
                className="pointer-events-none text-2xl text-default-400"
                icon="solar:eye-bold"
              />
            )}
          </button>
        }
        isRequired
        variant="bordered"
        id="password"
        name="password"
        type={isVisible ? "text" : "password"}
        label="Password"
        labelPlacement="outside"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        isInvalid={!!errors.password}
        errorMessage={errors.password}
      />
      <Input
        endContent={
          <button type="button" onClick={toggleVisibility}>
            {isVisible ? (
              <Icon
                className="pointer-events-none text-2xl text-default-400"
                icon="solar:eye-closed-linear"
              />
            ) : (
              <Icon
                className="pointer-events-none text-2xl text-default-400"
                icon="solar:eye-bold"
              />
            )}
          </button>
        }
        isRequired
        variant="bordered"
        id="confirm_password"
        name="confirmPassword"
        type={isVisible ? "text" : "password"}
        label="Confirm Password"
        labelPlacement="outside"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChange={handleChange}
        isInvalid={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword}
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
