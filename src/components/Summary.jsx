import { useState } from 'react';
import '../styles/Section.css';

export default function Summary({ onSave, savedData }) {
  const [editing, setEditing] = useState(!savedData);
  const [draft, setDraft] = useState(savedData || '');

  const handleSubmit = () => {
    onSave(draft);
    setEditing(false);
  };

  return (
    <div className="section-card">
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-icon purple">✍️</div>
          <div>
            <div className="section-title">Professional Summary</div>
            <div className="section-subtitle">Brief overview of your profile</div>
          </div>
        </div>
        <span className={`status-badge ${editing ? 'editing' : 'saved'}`}>
          {editing ? '✏️ Editing' : '✅ Saved'}
        </span>
      </div>

      {editing ? (
        <>
          <div className="form-group full-width">
            <label htmlFor="summary">Summary</label>
            <textarea
              id="summary"
              name="summary"
              rows={5}
              placeholder="Dedicated software engineer with 5+ years of experience building scalable web applications..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
          </div>
          <div className="section-actions">
            {savedData && (
              <button className="btn btn-secondary" onClick={() => setEditing(false)}>
                <span className="btn-icon">✕</span> Cancel
              </button>
            )}
            <button className="btn btn-primary" onClick={handleSubmit}>
              <span className="btn-icon">✓</span> Save Section
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="display-view">
            <div className="display-field">
              <span className="display-value">{draft || '—'}</span>
            </div>
          </div>
          <div className="section-actions">
            <button className="btn btn-secondary" onClick={() => { setDraft(savedData); setEditing(true); }}>
              <span className="btn-icon">✏️</span> Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
