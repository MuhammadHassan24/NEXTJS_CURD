"use client";

import React from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/button";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { Navigation } from "@/constant/navigtion";
import { useUserSignup } from "@/mutations/useUserSignup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const signupValidationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string().optional(),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export const SignupScreen = () => {
  const router = useRouter();
  const { mutateAsync: createUser, isPending } = useUserSignup();

  const onSubmit = async (values) => {
    try {
      await createUser(values);
      toast.success("Create successful");
      router.push(Navigation.Dashboard.Dashboard);
    } catch (error) {
      toast.error(error?.message || "Sign up failed");
    }
  };

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: signupValidationSchema,
      onSubmit: onSubmit,
    });

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
            Create Account
          </Text>
          <Text className="text-gray-600 mt-2">Join us today</Text>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                label="First Name"
                name="firstName"
                type="text"
                placeholder="First name"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName && errors.firstName}
              />
            </div>

            <div>
              <Input
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Last name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName && errors.lastName}
              />
            </div>
          </div>

          <div>
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
            />
          </div>

          <div>
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isPassword
              error={touched.password && errors.password}
            />
          </div>

          <div>
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              isPassword
              error={touched.confirmPassword && errors.confirmPassword}
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-10 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {isPending ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href={Navigation.Auth.Login}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
