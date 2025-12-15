"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // 검증 로직
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 8) {
      setError("비밀번호는 8자 이상으로 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }
      toast.success("회원가입 완료!");
      router.push("/login");
    } catch (error) {
      console.error("회원가입 오류:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("네트워크 오류가 발생했습니다.");
      }
    }
  };

  const handleSocialSignup = (provider: string) => {
    // TODO: 소셜 회원가입 로직 구현
    console.log(`Sign up with ${provider}`);
  };

  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">회원가입 하기</h1>
          <p className="mt-2 text-sm text-gray-600">
            갤러리 허브에 가입하고 다양한 작품을 감상해보세요.
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              이름
            </label>
            <Input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-gray-50"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-50"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-50 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              비밀번호 확인
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="비밀번호를 다시 입력하세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-gray-50 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 font-medium text-sm">{error}</p>}
          {/* Signup Button */}
          <Button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 cursor-pointer"
          >
            회원가입
          </Button>
        </form>
        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-sm text-gray-600 font-medium">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Social Signup Buttons */}
        <div className="space-y-3">
          {/* Google */}
          <Button
            type="button"
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            onClick={() => handleSocialSignup("Google")}
          >
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
              <g id="Group">
                <path
                  id="Vector"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.4057 8.17566C15.4057 7.6288 15.3569 7.10251 15.2651 6.59766H8V9.58137H12.152C11.9729 10.5457 11.4294 11.3634 10.6126 11.9102V13.8457H13.1051C14.564 12.5025 15.4057 10.5251 15.4057 8.17566Z"
                  fill="#3D82F0"
                ></path>
                <path
                  id="Vector_2"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.0002 15.7146C10.0831 15.7146 11.8291 15.0238 13.1053 13.8461L10.6128 11.9098C9.92192 12.3726 9.0382 12.6461 8.0002 12.6461C5.99106 12.6461 4.29049 11.2892 3.68363 9.46606H1.1062V11.4649C2.37563 13.9858 4.98477 15.7146 8.0002 15.7146Z"
                  fill="#31A752"
                ></path>
                <path
                  id="Vector_3"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.68348 9.46593C3.5292 9.00307 3.44177 8.5085 3.44177 8.00022C3.44177 7.49193 3.5292 6.99736 3.68348 6.5345V4.53564H1.10605C0.584052 5.57707 0.285767 6.75564 0.285767 8.00022C0.285767 9.24479 0.584052 10.4234 1.10605 11.4648L3.68348 9.46593Z"
                  fill="#F9BA00"
                ></path>
                <path
                  id="Vector_4"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.0002 3.35422C9.13249 3.35422 10.1499 3.74336 10.9488 4.50793L13.1619 2.29564C11.8256 1.05022 10.0796 0.285645 8.0002 0.285645C4.98477 0.285645 2.37563 2.0145 1.1062 4.53622L3.68363 6.53422C4.29049 4.71107 5.99106 3.35422 8.0002 3.35422Z"
                  fill="#E64234"
                ></path>
              </g>
            </svg>
            구글 계정으로 가입하기
          </Button>

          {/* Kakao */}
          <Button
            type="button"
            className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-medium"
            onClick={() => handleSocialSignup("Kakao")}
          >
            <svg viewBox="0 0 21 20" width="21" height="20" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.5 2.62891C6.16282 2.62891 2.64282 5.36319 2.64282 8.72605C2.64282 10.8239 4.00211 12.6546 6.07639 13.7703L5.20425 16.9682C5.1878 17.0318 5.19118 17.0989 5.21396 17.1605C5.23673 17.2222 5.27781 17.2754 5.33167 17.313C5.38554 17.3506 5.44962 17.3709 5.51532 17.371C5.58102 17.3712 5.6452 17.3513 5.69925 17.3139L9.51782 14.776C9.83997 14.776 10.17 14.8311 10.5 14.8311C14.8371 14.8311 18.3571 12.0968 18.3571 8.72605C18.3571 5.35534 14.8371 2.62891 10.5 2.62891Z"
                fill="#181600"
              ></path>
            </svg>
            카카오 계정으로 가입하기
          </Button>

          {/* Naver */}
          <Button
            type="button"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium"
            onClick={() => handleSocialSignup("Naver")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              style={{ width: "12px", height: "12px" }}
            >
              <path
                d="M13.7213 10.7315L6.30607 0H0V20H6.27869V9.26852L13.6939 20H20V0H13.7213V10.7315Z"
                fill="white"
              />
            </svg>
            네이버 계정으로 가입하기
          </Button>
        </div>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {"이미 계정이 있으신가요? "}
            <a
              href="/login"
              className="font-semibold text-gray-900 hover:text-blue-700"
            >
              로그인하기
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
