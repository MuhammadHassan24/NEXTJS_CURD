import { QueryKey } from "@/constant/queryKey";
import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const queryKey = [QueryKey.User];
  const queryFn = async () => {
    const URL = "/api/user/me";
    const { data, status } = await axios.get(URL);
    return { data, status };
  };
  return useQuery({
    queryFn,
    queryKey,
  });
};
