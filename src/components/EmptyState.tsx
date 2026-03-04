import { XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = "데이터가 없습니다",
}: EmptyStateProps) {
  return (
    <div className="w-full flex justify-center items-center py-20">
      <div className="flex flex-col items-center gap-8">
        <XCircleIcon className="w-8 h-8 text-gray-300" />
        <p className="text-gray-500">{message}</p>
      </div>
    </div>
  );
}
