"use client";

import { useState } from "react";

export default function FavoritesPage() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // 찜 추가 테스트
  const testAddWishlist = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          item_id: "test-product-123",
          item_type: "product",
        }),
      });

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult("Error: " + error);
    }
    setLoading(false);
  };

  // 찜 목록 조회 테스트
  const testGetWishlist = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/wishlist");
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult("Error: " + error);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>찜리스트 API 테스트</h1>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button
          onClick={testAddWishlist}
          disabled={loading}
          style={{
            padding: "10px 20px",
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          찜 추가 테스트
        </button>

        <button
          onClick={testGetWishlist}
          disabled={loading}
          style={{
            padding: "10px 20px",
            background: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          찜 목록 조회
        </button>
      </div>

      {loading && <p>로딩 중...</p>}

      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#f5f5f5",
            borderRadius: "5px",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
          }}
        >
          <h3>결과:</h3>
          {result}
        </div>
      )}
    </div>
  );
}
