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
        throw new Error(data.message || "회원가입에 실패했습니다.");
      }

      return data;
    },
    onSuccess: () => {
      // toast.success("회원가입 완료!");
      toast.success("이메일 인증번호가 전송되었습니다.");
      router.push("/signup/pending");
    },
    onError: (error: Error) => {
      console.error("회원가입 오류:", error);
      toast.error(error.message);
    },
  });
}
