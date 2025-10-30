type Props = {
  selected: string;
  onChange: (category: string) => void;
  type: "category" | "location";
};

const categories = ["전체", "회화", "조각", "사진", "추상"];
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
  "강원특별자치도",
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
            className={`w-fit px-3 py-1 rounded-full border transition whitespace-nowrap
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
