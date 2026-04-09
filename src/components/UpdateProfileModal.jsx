"use client";

import React from "react";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "./button";
import { Input } from "./Input";
import { Text } from "./Text";
import { X, Loader } from "lucide-react";
import { useUserUpdate } from "@/mutations/useUserUpdate";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .matches(/^[a-zA-Z\s]*$/, "First name can only contain letters"),
  lastName: Yup.string().optional(),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

export const UpdateProfileModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  const { mutateAsync: update, isPending } = useUserUpdate();

  const onSubmit = async (values) => {
    try {
      await update(values);
      toast.success("Update profile successfull");
      onClose();
    } catch (error) {
      toast.error(error?.messasge || "Update Failed");
    }
  };

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    dirty,
    touched,
  } = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <Text
              as="h2"
              fontSize="lg"
              fontWeight="bold"
              className="text-gray-900"
            >
              Update Profile
            </Text>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
              type="button"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <Input
              name="firstName"
              label="First Name"
              id="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your first name"
              error={
                touched.firstName && errors.firstName ? errors.firstName : ""
              }
              disabled={isPending}
            />

            <Input
              name="lastName"
              label="Last Name"
              id="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your last name"
              error={touched.lastName && errors.lastName ? errors.lastName : ""}
              disabled={isPending}
            />

            <Input
              name="email"
              label="Email"
              id="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              error={touched.email && errors.email ? errors.email : ""}
              disabled={isPending}
            />
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t border-gray-200">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
              disabled={isPending}
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isPending || !dirty}
            >
              {isPending ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
