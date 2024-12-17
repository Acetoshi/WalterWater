import Link from "next/link";
import "./BackToMapButton.css";

export default function BackToMapButton() {
  return (
    <div className="redirect-button-wrapper">
      <Link href="/" className="redirect-button button-feedback">
        <img src="/icons/return.svg" alt="" />
        back to the map
      </Link>
    </div>
  );
}
