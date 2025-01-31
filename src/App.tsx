import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/UI/NavBar/Navbar';
import Droplet from './components/UI/Droplet/Droplet';

export default function App() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isVisible && <Droplet />}
      <Navbar />
      <Outlet />
    </>
  );
}
