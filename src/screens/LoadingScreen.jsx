"use client";

import React from "react";
import { Text } from "@/components/Text";

export const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="inline-block relative w-16 h-16 mb-6">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 border-r-blue-600 rounded-full animate-spin"></div>

          {/* Inner counter-rotating ring */}
          <div
            className="absolute inset-2 border-4 border-transparent border-b-indigo-600 border-l-indigo-600 rounded-full animate-spin"
            style={{ animationDirection: "reverse" }}
          ></div>
        </div>

        <Text
          as="p"
          fontSize="lg"
          fontWeight="medium"
          className="text-gray-700"
        >
          {message}
        </Text>
      </div>
    </div>
  );
};
