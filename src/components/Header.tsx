"use client";

import { useLogout } from "@/hooks/useLogout";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Header() {
  const { isLoggedIn } = useAuthStore();
  const { mutate: logoutMutation, isPending } = useLogout();
  const handleLogout = () => {
    logoutMutation();
  };
  const router = useRouter();

  return (
    <header className="bg-gray-100 dark:bg-gray-800 p-4 shadow flex justify-between">
      <h1 className="text-xl font-semibold">
        <Link href="/exhibitions">Gallery Hub</Link>
      </h1>
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="cursor-pointer font-medium text-gray-800"
        >
          {isPending ? "로그아웃 중..." : "로그아웃"}
        </button>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="cursor-pointer font-medium text-gray-800"
        >
          {"로그인"}
        </button>
      )}
    </header>
  );
}
