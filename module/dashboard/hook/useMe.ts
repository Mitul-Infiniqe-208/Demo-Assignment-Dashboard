import { queryKeys } from "@/constants/query-keys";
import { getMe } from "@/services/profile";
import { useQuery } from "@tanstack/react-query";

export const useMe = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.profile.me(),
    queryFn: getMe,
  });

  return {
    user: data?.data?.user,
    isLoading,
    isError,
  };
};
