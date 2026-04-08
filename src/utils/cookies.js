import Cookies from "js-cookie";
import { USER_COOKIES } from "@/constant/misc";
import { jwtDecode } from "jwt-decode";
import { tryCatch } from "./tryCatch";

export const getUserIdFromCookieClient = () => {
  const token = Cookies.get(USER_COOKIES);

  if (!token) return;

  const [error, user] = tryCatch(jwtDecode, token);

  if (error) return;

  return user?.sub;
};
