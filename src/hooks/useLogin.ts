import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: { id: string; pw: string }) => {
      const response = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error("로그인 실패");
      return response.json();
    },
    onSuccess: () => {
      router.push("/exhibitions");
    },
  });
}
