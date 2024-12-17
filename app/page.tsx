"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import Droplet from "@/components/Droplet/Droplet";

export default function Home() {
  // see https://andresmpa.medium.com/how-to-use-react-leaflet-in-nextjs-with-typescript-surviving-it-21a3379d4d18 for map
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/Map"), {
        loading: () => <Droplet />,
        ssr: false,
      }),
    []
  );

  return <Map />;
}
