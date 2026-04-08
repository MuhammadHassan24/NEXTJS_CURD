import { Navigation } from "@/constant/navigtion";
import { redirect } from "next/navigation";

const Page = () => {
  return redirect(Navigation.Dashboard.Dashboard);
};
export default Page;
