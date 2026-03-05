type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const sizeMap: Record<SpinnerSize, string> = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-[3px]",
  lg: "w-9 h-9 border-4",
};

const Spinner = ({ size = "md", className = "" }: SpinnerProps) => (
  <div
    role="status"
    aria-label="로딩 중"
    className={`${sizeMap[size]} rounded-full border-gray-200 border-t-gray-500 animate-spin ${className}`}
  />
);

export default Spinner;
