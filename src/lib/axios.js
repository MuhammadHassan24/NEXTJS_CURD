import { ENV } from "@/constant/misc";
import baseAxios from "axios";

export const axios = baseAxios.create({
  baseURL: ENV.BACKEND_URL,
});
