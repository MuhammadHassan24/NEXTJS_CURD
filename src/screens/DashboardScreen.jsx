"use client";

import React, { useState } from "react";
import { Button } from "@/components/button";
import { Text } from "@/components/Text";
import { UpdateProfileModal } from "@/components/UpdateProfileModal";
import { DeleteAccountModal } from "@/components/DeleteAccountModal";
import Link from "next/link";
import { Navigation } from "@/constant/navigtion";
import {
  LogOut,
  Lock,
  Settings,
  Loader,
  EllipsisVertical,
  Edit2Icon,
  Trash2,
} from "lucide-react";
import { useLogoutUser } from "@/mutations/useUserLogout";
import { useUserDelete } from "@/mutations/useUserDelete";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/queries/useGetUser";
import { ErrorScreen, LoadingScreen } from ".";

export const DashboardScreen = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { mutateAsync: logout, isPending } = useLogoutUser();
  const { mutateAsync: deleteAccount, isPending: isDeleting } = useUserDelete();
  const { data: getUser, isLoading, isError, refetch } = useGetUser();

  console.log("userData", getUser);

  const user = getUser?.data?.data;

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    router.push(Navigation.Auth.Login);
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      toast.success("Account deleted successfully");
      router.push(Navigation.Auth.Login);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete account");
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <Text
              as="h1"
              fontSize="2xl"
              fontWeight="bold"
              className="text-gray-900"
            >
              Dashboard
            </Text>
          </div>
          <div className="flex gap-4">
            <Link href={Navigation.Dashboard.ChangePassword}>
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                <Lock size={18} />
                Change Password
              </Button>
            </Link>
            <Button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
              disabled={isDeleting}
            >
              <Trash2 size={18} />
              Delete Account
            </Button>
            <Button
              onClick={handleLogout}
              disabled={isPending}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                <>
                  <LogOut size={18} />
                  Logout
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <Text
            as="h2"
            fontSize="xl"
            fontWeight="bold"
            className="text-gray-900 mb-2"
          >
            Welcome, {user.firstName}! 👋
          </Text>
          <Text className="text-gray-600">
            Manage your account and explore our services
          </Text>
        </div>

        {/* User Info Card */}
        <div className=" gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <Text
                as="h3"
                fontSize="lg"
                fontWeight="bold"
                className="text-gray-900"
              >
                Profile Information
              </Text>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <Edit2Icon size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <Text className="text-gray-600 text-sm">Full Name</Text>
                <Text as="p" fontWeight="medium" className="text-gray-900">
                  {user.firstName} {user.lastName}
                </Text>
              </div>
              <div>
                <Text className="text-gray-600 text-sm">Email</Text>
                <Text as="p" fontWeight="medium" className="text-gray-900">
                  {user.email}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Update Profile Modal */}
      <UpdateProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
      />

      {/* Delete Account Confirmation Modal */}
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
        isLoading={isDeleting}
      />
    </div>
  );
};
