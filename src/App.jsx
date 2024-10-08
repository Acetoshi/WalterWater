import {useState,useEffect} from "react"
import { Outlet } from "react-router-dom";
import Droplet from "./components/Droplet";

export default function App() {

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isVisible && <Droplet />}
      <Outlet />
    </>
  );
}
