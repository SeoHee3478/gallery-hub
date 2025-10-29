import ExhibitionList from "./components/ExhibitionList";
import exhibitions from "@/data/exhibitions.json";

export default function ExhibitionPage() {
  return (
    <section>
      <ExhibitionList data={exhibitions} />
    </section>
  );
}
