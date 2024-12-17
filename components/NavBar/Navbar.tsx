"use client";
import { useState } from "react";
import Link from "next/link";
import "./NavBar.css";

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  function toggleMenu() {
    setIsCollapsed(() => !isCollapsed);
  }

  const links = [
    { to: "/", label: "Map", icon: "" },
    { to: "/get-the-app", label: "Dowload the App", icon: "" },
    { to: "/frequently-asked-questions", label: "FAQs & Support", icon: "" },
    { to: "/about/privacy", label: "Privacy Policy", icon: "" },
  ];

  return (
    <nav className={`navbar ${isCollapsed ? "collapsed" : ""}`}>
      <button
        type="button"
        className="nav-menu-button"
        onClick={toggleMenu}
        aria-label={
          isCollapsed ? "Open navigation menu" : "Close navigation menu"
        }
      >
        <div className="nav-menu-button-top-bar" />
        <div className="nav-menu-button-middle-bar" />
        <div className="nav-menu-button-bottom-bar" />
      </button>

      <menu>
        {links.map((link) => (
          <li key={link.to}>
            <Link
              tabIndex={isCollapsed ? -1 : 0}
              href={link.to}
              onClick={() => toggleMenu()}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </menu>
    </nav>
  );
}
