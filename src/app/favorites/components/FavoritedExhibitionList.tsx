import { Exhibition } from "@/app/favorites/page";
import FavoritedExhibitionCard from "./FavoritedExhibitionCad";

interface SavedExhibitionListProps {
  exhibitions: Exhibition[];
  loading: boolean;
  onRemove: (id: string) => void;
  onExhibitionClick: (id: string) => void;
}

export default function FavoritedExhibitionList({
  exhibitions,
  loading,
  onRemove,
  onExhibitionClick,
}: SavedExhibitionListProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            className="p-2 -ml-2"
            onClick={() => {
              // TODO: 뒤로가기 로직 구현
              console.log("Go back");
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <h1 className="text-xl font-bold">Saved Exhibitions</h1>

          <button
            className="text-blue-600 font-medium"
            onClick={() => {
              // TODO: 편집 모드 토글 로직 구현
              console.log("Toggle edit mode");
            }}
          >
            Edit
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-400">Loading...</div>
          </div>
        ) : exhibitions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-gray-300 mb-4"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <p className="text-gray-400 text-center">
              No saved exhibitions yet
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {exhibitions.map((exhibition) => (
              <FavoritedExhibitionCard
                key={exhibition.id}
                exhibition={exhibition}
                onRemove={onRemove}
                onClick={onExhibitionClick}
              />
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-2">
          <button className="flex flex-col items-center py-2 px-4 text-gray-400">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </button>

          <button className="flex flex-col items-center py-2 px-4 text-gray-400">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span className="text-xs mt-1">Discover</span>
          </button>

          <button className="flex flex-col items-center py-2 px-4 text-blue-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <span className="text-xs mt-1 font-medium">Saved</span>
          </button>

          <button className="flex flex-col items-center py-2 px-4 text-gray-400">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
