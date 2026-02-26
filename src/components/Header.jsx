import "../styles/Header.css";

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-badge">
        <span></span>
        CV Builder
      </div>
      <h1>
        Build Your <span className="accent">Perfect</span> CV
      </h1>
      <p>Fill in each section, submit to preview, and edit anytime.</p>
    </header>
  );
}
