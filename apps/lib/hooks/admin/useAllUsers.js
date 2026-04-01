import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";

export function useAllUsers() {
  return useQuery({
    queryKey: ["admin-all-users"],
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data.data;
    },
  });
}
