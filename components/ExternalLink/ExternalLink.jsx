import "./ExternalLink.css";

export default function ExternalLink({ href, children }) {
  return (
    <a className="external-link" href={href} target="_blank">
      {children}
      <img className="external-link-icon" src="/icons/external-link.svg"></img>
    </a>
  );
}
