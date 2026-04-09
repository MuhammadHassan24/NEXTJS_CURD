import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useUserDelete = () => {
  const mutationFn = async () => {
    const URL = "/api/user/me";
    const { data } = await axios.delete(URL);
    return { data };
  };

  return useMutation({
    mutationFn,
  });
};
