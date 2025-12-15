import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SignupData {
  name: string;
  email: string;
  password: string;
}

export function useSignup() {
  const router = useRouter();
  return useMutation({
    mutationFn: async (signupData: SignupData) => {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("회원가입 실패", data.message);
      }

      return data;
    },
    onSuccess: () => {
      toast.success("회원가입 완료!");
      router.push("/login");
    },
    onError: (error: Error) => {
      console.error("회원가입 오류:", error);
      toast.error(error.message || "네트워크 오류가 발생했습니다.");
    },
  });
}
