"use client";

import React, { useState } from "react";
import { Button } from "@/components/button";
import { Text } from "@/components/Text";
import Link from "next/link";
import { Navigation } from "@/constant/navigtion";
import { LogOut, Lock, Settings, Loader } from "lucide-react";
import { useLogoutUser } from "@/mutations/useUserLogout";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const DashboardScreen = () => {
  const [user] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  });

  const router = useRouter();
  const { mutateAsync: logout, isPending } = useLogoutUser();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    router.push(Navigation.Auth.Login);
  };

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
              <Settings size={20} className="text-gray-400" />
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
    </div>
  );
};
