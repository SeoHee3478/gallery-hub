type Props = {
  selected: string;
  onChange: (category: string) => void;
};

const categories = ["전체", "회화", "조각", "사진", "추상"];

export default function CategoryFilter({ selected, onChange }: Props) {
  return (
    <div>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-3 py-1 rounded-full border transition
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
  );
}
