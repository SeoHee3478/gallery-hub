import { Exhibition } from "@/app/favorites/page";

interface ExhibitionCardProps {
  exhibition: Exhibition;
  onRemove: (id: string) => void;
  onClick: (id: string) => void;
}

export default function FavoritedExhibitionCard({
  exhibition,
  onClick,
}: ExhibitionCardProps) {
  // 날짜 포맷팅 함수
  const formatDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const formatMonth = (date: Date) =>
      date.toLocaleDateString("en-US", { month: "short" });
    const formatDay = (date: Date) =>
      date.getDate().toString().padStart(2, "0");

    return `${formatMonth(start)} ${formatDay(start)} - ${formatMonth(
      end
    )} ${formatDay(end)}, ${end.getFullYear()}`;
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(exhibition.id)}
    >
      <div className="flex gap-4 p-4">
        {/* Image */}
        <div className="flex-shrink-0">
          <div className="w-[170px] h-[170px] bg-gray-800 rounded-xl overflow-hidden relative">
            {/* TODO: 실제 이미지로 교체*/}
            <div className="w-full h-full flex items-center justify-center">
              {/* 임시 placeholder - 실제로는 다음과 같이 사용:
              <Image
                src={exhibition.imageUrl}
                alt={exhibition.title}
                fill
                className="object-cover"
              />
              */}
              <span className="text-white text-xs">Image</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
              {exhibition.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3">{exhibition.venue}</p>
          </div>

          <div className="flex items-center text-gray-500 text-sm">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mr-2 flex-shrink-0"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="truncate">
              {formatDate(exhibition.startDate, exhibition.endDate)}
            </span>
          </div>
        </div>

        {/* Chevron */}
        <div className="flex items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-300"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
