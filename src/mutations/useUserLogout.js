import { axios } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useLogoutUser = () => {
  const mutationFn = async () => {
    const URL = "/api/user/logout";
    const { data, status } = await axios.post(URL);
    return { data, status };
  };

  return useMutation({
    mutationFn,
  });
};
