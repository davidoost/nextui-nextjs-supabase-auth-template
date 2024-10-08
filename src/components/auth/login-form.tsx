"use client";

import React, { useState } from "react";
import { loginSchema } from "@/schemas/login.schema";
import { validateFormData } from "@/utils/validate-form-data";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { login } from "@/functions/auth/login";
import { Icon } from "@iconify/react";

// Define the shape of the form data
type FormData = {
  email: string;
  password: string;
};

// Define the shape of the error messages
type Errors = {
  email?: string;
  password?: string;
};

export default function LoginForm() {
  // State to store form data
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
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
    const { errors, data } = validateFormData(loginSchema, formData);

    if (errors) {
      // If there are validation errors, update the errors state and stop loading
      setErrors(errors);
      setIsLoading(false);
    } else {
      // If validation is successful, clear errors and proceed
      setErrors({});
      try {
        await login({ data });
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
      <div className="flex items-center justify-between px-1 py-2">
        <Checkbox name="remember" size="sm">
          Remember me
        </Checkbox>
        <Link
          className="text-default-500"
          href="/auth/forgot-password"
          size="sm"
        >
          Forgot password?
        </Link>
      </div>
      <Button
        size="md"
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
