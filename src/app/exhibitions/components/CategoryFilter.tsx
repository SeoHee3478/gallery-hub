type Props = {
  selected: string;
  onChange: (category: string) => void;
  type: "category" | "location";
};

const categories = [
  "전체",
  "전시",
  "연극",
  "교육/체험",
  "뮤지컬/오페라",
  "아동/가족",
  "음악/콘서트",
  "행사/축제",
  "무용/발레",
  "국악",
  "도서",
  "체육",
  "기타",
];
const locations = [
  "전체",
  "서울",
  "경기",
  "인천",
  "부산",
  "대전",
  "대구",
  "광주",
  "울산",
  "충북",
  "강원",
  "충남",
  "전북특별자치도",
  "전남",
  "경북",
  "경남",
  "제주특별자치도",
];

export default function CategoryFilter({ selected, onChange, type }: Props) {
  const categoryType = type === "category" ? [...categories] : [...locations];

  return (
    <div className="overflow-x-auto w-full hide-scrollbar">
      <div className="flex gap-2 ">
        {categoryType.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              selected === cat ? onChange("전체") : onChange(cat)
            }
            className={`w-fit px-3 py-1 rounded-full border transition whitespace-nowrap cursor-pointer
            ${
              selected === cat
                ? "bg-black text-white border-black"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
