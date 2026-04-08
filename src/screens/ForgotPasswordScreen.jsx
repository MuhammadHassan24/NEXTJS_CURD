"use client";

import React from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/button";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { Navigation } from "@/constant/navigtion";

const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const ForgotPasswordScreen = () => {
  const [submitted, setSubmitted] = React.useState(false);

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    touched,
    status,
    isSubmitting,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // API call would go here
        console.log("Reset request for:", values.email);
        setSubmitted(true);
        setSubmitting(false);
      } catch (err) {
        setStatus({
          error: err.message || "Failed to send reset email",
        });
        setSubmitting(false);
      }
    },
  });

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <Text
            as="h2"
            fontSize="xl"
            fontWeight="bold"
            className="text-gray-900 mb-2"
          >
            Check your email
          </Text>
          <Text className="text-gray-600 mb-6">
            We've sent a password reset link to {values.email}
          </Text>

          <Link href={Navigation.Auth.Login}>
            <Button className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <Text
            as="h1"
            fontSize="2xl"
            fontWeight="bold"
            className="text-gray-900"
          >
            Reset Password
          </Text>
          <Text className="text-gray-600 mt-2">
            Enter your email to receive a reset link
          </Text>
        </div>

        {status?.error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-md">
            <Text className="text-red-700 text-sm">{status.error}</Text>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link
            href={Navigation.Auth.Login}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
