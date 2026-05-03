export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <p className="footer__copy">
          © {year} Jemell. Built with Next.js & Tailwind CSS.
        </p>
        <div className="footer__links">
          <a
            href="https://github.com/jemell"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
            aria-label="GitHub profile"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/jemell"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
            aria-label="LinkedIn profile"
          >
            LinkedIn
          </a>
          <a
            href="mailto:hello@jemell.dev"
            className="footer__link"
            aria-label="Send email"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
