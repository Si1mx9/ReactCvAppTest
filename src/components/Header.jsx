import "../styles/Header.css";

export default function Header({ onImport }) {
  return (
    <header className="app-header">
      <div className="header-top">
        <div className="header-badge">
          <span></span>
          CV Builder
        </div>
        <button className="btn btn-secondary header-import-btn" onClick={onImport}>
          <span className="btn-icon">📂</span> Import
        </button>
      </div>
      <h1>
        Build Your <span className="accent">Perfect</span> CV
      </h1>
      <p>Fill in each section, submit to preview, and edit anytime.</p>
    </header>
  );
}
