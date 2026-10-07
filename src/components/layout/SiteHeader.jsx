import Icon from '../ui/Icon.jsx';
function SiteHeader({ start }) {
  return (
    <header className="site-header">
      <button
        className="brand"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span className="brand-mark">R</span> ResumeForge
      </button>
      <nav>
        <button onClick={start}>Create resume</button>
        <a
          href="#templates"
          onClick={(e) => {
            e.preventDefault();
            document
              .querySelector(".template-feature")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Templates
        </a>
        <button onClick={start}>Sign in</button>
      </nav>
      <button className="button primary header-cta" onClick={start}>
        Create my resume <Icon name="arrow" />
      </button>
    </header>
  );
}
export default SiteHeader;
