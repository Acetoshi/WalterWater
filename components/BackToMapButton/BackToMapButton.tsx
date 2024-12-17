import Link from "next/link";
import Image from "next/image";
import "./BackToMapButton.css";

export default function BackToMapButton() {
  return (
    <div className="redirect-button-wrapper">
      <Link href="/" className="redirect-button button-feedback">
        <Image width={20} height={18} src="/icons/return.svg" alt="" />
        back to the map
      </Link>
    </div>
  );
}
