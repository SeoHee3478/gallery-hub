"use client";

import { useEffect, useState } from "react";
import ExhibitionContainer from "./components/ExhibitionContainer";

export default function ExhibitionPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/exhibitions/all")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <section className="flex justify-center">
      <ExhibitionContainer data={data} />
    </section>
  );
}
