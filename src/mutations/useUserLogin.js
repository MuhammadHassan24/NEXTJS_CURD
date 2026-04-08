import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useUserLogin = () => {
  const URL = "/api/user/login";

  const mutationFn = async (payload) => {
    const { data, status } = await axios.post(URL, payload);

    return { data, status };
  };

  return useMutation({
    mutationFn,
  });
};
