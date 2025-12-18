import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogin() {
  const router = useRouter();
  const { login: setAuthState } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: { id: string; pw: string }) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "로그인에 실패했습니다.");
      return data;
    },
    onSuccess: (data) => {
      toast.success("로그인 성공!");
      setAuthState(data.user.email);
      router.push("/exhibitions");
    },
    onError: (error: Error) => {
      toast.error(error.message);
      console.error("로그인 오류:", error);
    },
  });
}
