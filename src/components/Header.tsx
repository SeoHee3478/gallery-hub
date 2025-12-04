"use client";

export function Header() {
  const handleLogout = async () => {
    console.log("로그아웃 버튼 클릭!");
    // 로그아웃 API 호출
    try {
      const response = await fetch("api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log("로그아웃 완료");
      } else {
        console.log("로그아웃 실패", data.message);
      }
    } catch (error) {
      console.error("네트워크 에러", error);
    }
  };

  return (
    <header className="bg-gray-100 dark:bg-gray-800 p-4 shadow flex justify-between">
      <h1 className="text-xl font-semibold">Gallery Hub</h1>
      <button
        onClick={handleLogout}
        className="cursor-pointer font-medium text-gray-800"
      >
        로그아웃
      </button>
    </header>
  );
}
