import ExhibitionContainer from "./components/ExhibitionContainer";
import exhibitions from "@/data/exhibitions.json";

export default function ExhibitionPage() {
  return (
    <section className="flex justify-center">
      <ExhibitionContainer data={exhibitions} />
    </section>
  );
}
