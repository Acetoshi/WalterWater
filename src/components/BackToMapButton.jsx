import { Link } from "react-router-dom";
import "../styles/backToMapButton.css"

export default function BackToMapButton() {
  return (
    <section className="redirect-button-wrapper">
      <Link to="/" className="redirect-button button-feedback">
        <img
          src="/icons/return.svg"
          alt=""
        />
        back to the map
      </Link>
    </section>
  );
}
