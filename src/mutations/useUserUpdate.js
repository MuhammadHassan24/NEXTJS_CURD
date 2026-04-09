import { QueryKey } from "@/constant/queryKey";
import client from "@/generated/prisma/client";
import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUserUpdate = () => {
  const queryClient = useQueryClient();

  const mutationFn = async (payload) => {
    const URL = "/api/user/me";
    const { data } = await axios.patch(URL, payload);
    return { data };
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey.User]);
    },
  });
};
