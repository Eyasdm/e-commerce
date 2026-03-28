import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import toast from "react-hot-toast";

export function useCheckout() {
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.get("/orders/checkout-session");
      return data.session;
    },
    onSuccess: (session) => {
      // Redirect to Stripe
      window.location.href = session.url;
    },
    onError: () => {
      toast.error("Failed to start checkout. Please try again.");
    },
  });
}
