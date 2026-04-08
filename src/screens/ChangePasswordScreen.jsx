"use client";

import React from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/button";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { Navigation } from "@/constant/navigtion";
import { ArrowLeft } from "lucide-react";

const changePasswordValidationSchema = Yup.object({
  currentPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

export const ChangePasswordScreen = () => {
  const [successMessage, setSuccessMessage] = React.useState("");

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    status,
    isSubmitting,
  } = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        // API call would go here
        console.log("Change password with:", values);
        setSuccessMessage("Password changed successfully");
        resetForm();
        setTimeout(() => setSuccessMessage(""), 3000);
        setSubmitting(false);
      } catch (err) {
        setStatus({ error: err.message || "Failed to change password" });
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-2xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href={Navigation.Dashboard.Dashboard}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <Text
            as="h1"
            fontSize="2xl"
            fontWeight="bold"
            className="text-gray-900"
          >
            Change Password
          </Text>
          <Text className="text-gray-600 mt-1">
            Update your password to keep your account secure
          </Text>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          {status?.error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg">
              <Text className="text-red-700 font-medium">{status.error}</Text>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
              <Text className="text-green-700 font-medium">
                {successMessage}
              </Text>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                label="Current Password"
                name="currentPassword"
                type="password"
                placeholder="Enter your current password"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isPassword
                error={touched.currentPassword && errors.currentPassword}
              />
            </div>

            <div className="border-t pt-6">
              <Text
                as="h3"
                fontSize="lg"
                fontWeight="bold"
                className="text-gray-900 mb-4"
              >
                New Password
              </Text>

              <div>
                <Input
                  label="New Password"
                  name="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isPassword
                  error={touched.newPassword && errors.newPassword}
                />
              </div>

              <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded">
                <Text className="text-blue-700 text-sm">
                  ✓ Password must be at least 8 characters, include uppercase
                  and number
                </Text>
              </div>
            </div>

            <div>
              <Input
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isPassword
                error={touched.confirmPassword && errors.confirmPassword}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Updating..." : "Update Password"}
              </Button>
              <Link href={Navigation.Dashboard.Dashboard} className="flex-1">
                <Button
                  type="button"
                  className="w-full h-10 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
