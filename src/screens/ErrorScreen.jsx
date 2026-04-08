"use client";

import React from "react";
import { Button } from "@/components/button";
import { Text } from "@/components/Text";
import Link from "next/link";

export const ErrorScreen = ({
  title = "Something went wrong",
  message = "An unexpected error occurred",
  code = "ERROR",
  actionText = "Go Home",
  actionHref = "/",
  onRetry = null,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 px-4">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
          <svg
            className="w-10 h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {/* Error Code */}
        {code && (
          <Text className="text-sm font-mono text-red-600 mb-2">
            Error: {code}
          </Text>
        )}

        {/* Title */}
        <Text
          as="h1"
          fontSize="2xl"
          fontWeight="bold"
          className="text-gray-900 mb-2"
        >
          {title}
        </Text>

        {/* Message */}
        <Text className="text-gray-600 mb-8">{message}</Text>

        {/* Actions */}
        <div className="space-y-3">
          {onRetry && (
            <Button
              onClick={onRetry}
              className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Try Again
            </Button>
          )}

          <Link href={actionHref} className="block">
            <Button className="w-full h-10 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors">
              {actionText}
            </Button>
          </Link>
        </div>

        {/* Support Link */}
        <Text className="mt-8 text-gray-600 text-sm">
          Need help?{" "}
          <a
            href="mailto:support@example.com"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Contact support
          </a>
        </Text>
      </div>
    </div>
  );
};
