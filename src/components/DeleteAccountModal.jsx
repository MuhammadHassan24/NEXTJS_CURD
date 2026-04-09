"use client";

import React from "react";
import { Button } from "./button";
import { Text } from "./Text";
import { AlertCircle, Loader } from "lucide-react";

export const DeleteAccountModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* Header with warning icon */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-200">
          <div className="flex-shrink-0">
            <AlertCircle className="text-red-600" size={28} />
          </div>
          <Text
            as="h2"
            fontSize="lg"
            fontWeight="bold"
            className="text-gray-900"
          >
            Delete Account
          </Text>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <Text className="text-gray-700 font-semibold mb-2">
              Are you sure you want to delete your account?
            </Text>
            <Text className="text-gray-600 text-sm leading-relaxed">
              This action cannot be undone. All your data including profile
              information and posts will be permanently deleted from our
              servers.
            </Text>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <Text className="text-red-800 text-sm font-medium">
              ⚠️ This is permanent and cannot be reversed.
            </Text>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
            disabled={isLoading}
            type="button"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            disabled={isLoading}
            type="button"
          >
            {isLoading ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              "Delete Account"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
