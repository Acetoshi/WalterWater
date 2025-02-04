import ExternalLinkProps from './ExternalLink.props';
import './ExternalLink.css';

export default function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a className={`external-link ${className}`} href={href} target="_blank">
      {children}
      <img className="external-link-icon" src="/icons/external-link.svg" alt=""></img>
    </a>
  );
}
