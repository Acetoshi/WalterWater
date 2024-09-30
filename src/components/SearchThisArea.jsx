import { useMap } from "react-leaflet";

export default function SearchThisArea() {
  const map = useMap();


 map.on('moveend', ()=>console.log(map.getCenter()));

  return <button> search this area </button>;
}
