"use client";

import React from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/button";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { Navigation } from "@/constant/navigtion";
import { useUserLogin } from "@/mutations/useUserLogin";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const LoginScreen = () => {
  const router = useRouter();
  const { mutateAsync: login, isPending } = useUserLogin();

  const onSubmit = async (values) => {
    try {
      await login(values);
      router.replace(Navigation.Dashboard.Dashboard);
      toast.success("Login Successfull");
    } catch (error) {
      toast.error("Account not found");
    }
  };

  const { values, errors, handleBlur, handleSubmit, handleChange, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginValidationSchema,
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
            Welcome Back
          </Text>
          <Text className="text-gray-600 mt-2">Sign in to your account</Text>
        </div>

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
              error={touched.email && errors.email}
            />
          </div>

          <div>
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isPassword
              error={touched.password && errors.password}
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-10 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 space-y-3 text-center text-sm">
          <Link
            href={Navigation.Auth.ForgotPassword}
            className="text-blue-600 hover:text-blue-700 block"
          >
            Forgot password?
          </Link>
          <div className="text-gray-600">
            Don't have an account?{" "}
            <Link
              href={Navigation.Auth.Signup}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
