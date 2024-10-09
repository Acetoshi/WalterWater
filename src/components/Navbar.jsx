import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/navBar.css";

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  function toggleMenu() {
    setIsCollapsed(() => !isCollapsed);
  }

  const links = [
    { to: "/", label: "map", icon: "user" },
    { to: "/about/privacy", label: "privacy policy", icon: "user" },
    { to: "/get-the-app", label: "get the app", icon: "user" },
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
            <NavLink
              tabIndex={isCollapsed ? -1 : 0}
              to={link.to}
              onClick={() => toggleMenu()}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </menu>
    </nav>
  );
}
