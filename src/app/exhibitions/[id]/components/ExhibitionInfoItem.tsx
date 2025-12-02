import type { ReactNode } from "react";

interface ExhibitionInfoItemProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export function ExhibitionInfoItem({
  icon,
  label,
  value,
}: ExhibitionInfoItemProps) {
  return (
    <div className="flex gap-3 md:gap-4">
      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10">
        <div className="text-primary">{icon}</div>
      </div>
      <div className="flex-1">
        <p className="text-xs md:text-sm text-muted-foreground mb-1">{label}</p>
        <p
          className={`text-sm md:text-base font-semibold text-base ${
            value ? "text-gray-900" : "text-gray-400 italic"
          }`}
        >
          {value || "정보 없음"}
        </p>
      </div>
    </div>
  );
}
