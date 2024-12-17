'use client'
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Home() {
  // see https://andresmpa.medium.com/how-to-use-react-leaflet-in-nextjs-with-typescript-surviving-it-21a3379d4d18 for map
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return <Map />;
}
