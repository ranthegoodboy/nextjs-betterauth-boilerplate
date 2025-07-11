import api from "@/lib/call-next-api";
import { UserType } from "@/types/server-response";
import { useQuery } from "@tanstack/react-query";

export function useUsers() {
  return useQuery<UserType[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get(`/users`);
      return response.data;
    },
  });
}
