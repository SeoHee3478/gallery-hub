import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();
  const { logout: clearAuthState } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("로그아웃 실패");
      return response.json();
    },
    onSuccess: () => {
      clearAuthState();
      router.push("/login");
    },
  });
}
