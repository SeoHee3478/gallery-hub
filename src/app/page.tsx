import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-black dark:bg-gray-900 dark:text-white">
      <p className="text-xl font-semibold">Test</p>
      <p>
        <Button>클릭</Button>
      </p>
    </div>
  );
}
