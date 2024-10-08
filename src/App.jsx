import { Outlet } from "react-router-dom";
import Droplet from "./components/Droplet";

export default function App() {
  return (
    <>
      <Droplet />
      <Outlet />
    </>
  );
}
