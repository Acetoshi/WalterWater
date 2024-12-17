import ExternalLinkProps from "./ExternalLink.props";
import Image from "next/image";
import "./ExternalLink.css";

export default function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a
      className="external-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <Image
        className="external-link-icon"
        src="/icons/external-link.svg"
        alt=""
      />
    </a>
  );
}
