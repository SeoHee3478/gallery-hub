"use client";

import { useLogout } from "@/hooks/useLogout";

export function Header() {
  const { mutate: logout, isPending } = useLogout();
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gray-100 dark:bg-gray-800 p-4 shadow flex justify-between">
      <h1 className="text-xl font-semibold">Gallery Hub</h1>
      <button
        onClick={handleLogout}
        className="cursor-pointer font-medium text-gray-800"
      >
        {isPending ? "로그아웃 중..." : "로그아웃"}
      </button>
    </header>
  );
}
