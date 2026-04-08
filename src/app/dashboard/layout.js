import { Navigation } from "@/constant/navigtion";
import { getUserIdFromCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard | Create Dashboard",
  description: "Dashboard page",
};

export default async function DashboardLayout({ children }) {
  const userId = await getUserIdFromCookie();

  if (!userId) {
    redirect(Navigation.Auth.Login);
  }

  return children;
}
