import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useUserSignup = () => {
  const URL = "/api/user/sign-up";

  const mutationFn = async (payload) => {
    const { data, status } = await axios.post(URL, payload);

    return { data, status };
  };

  return useMutation({
    mutationFn,
  });
};
