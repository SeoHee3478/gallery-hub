import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch("api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("로그아웃 실패");
      return response.json();
    },
    onSuccess: () => {
      router.push("/login");
    },
  });
}
