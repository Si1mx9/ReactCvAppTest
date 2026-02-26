import { useState } from 'react';
import '../styles/Section.css';

const emptyEntry = {
  company: '',
  position: '',
  responsibilities: '',
  startDate: '',
  endDate: '',
};

export default function Experience({ onSave, savedEntries }) {
  const [editing, setEditing] = useState(!savedEntries || savedEntries.length === 0);
  const [entries, setEntries] = useState(savedEntries || [{ ...emptyEntry }]);
  const [draft, setDraft] = useState(savedEntries || [{ ...emptyEntry }]);

  const handleChange = (index, e) => {
    const updated = draft.map((entry, i) =>
      i === index ? { ...entry, [e.target.name]: e.target.value } : entry
    );
    setDraft(updated);
  };

  const addEntry = () => {
    setDraft([...draft, { ...emptyEntry }]);
  };

  const removeEntry = (index) => {
    if (draft.length === 1) return;
    setDraft(draft.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setEntries(draft);
    onSave(draft);
    setEditing(false);
  };

  const handleEdit = () => {
    setDraft(entries);
    setEditing(true);
  };

  return (
    <div className="section-card">
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-icon cyan">💼</div>
          <div>
            <div className="section-title">Work Experience</div>
            <div className="section-subtitle">Professional roles & responsibilities</div>
          </div>
        </div>
        <span className={`status-badge ${editing ? 'editing' : 'saved'}`}>
          {editing ? '✏️ Editing' : '✅ Saved'}
        </span>
      </div>

      {editing ? (
        <>
          {draft.map((entry, index) => (
            <div key={index}>
              {index > 0 && <hr className="entry-divider" />}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Position #{index + 1}
                </span>
                {draft.length > 1 && (
                  <button
                    className="btn btn-secondary"
                    style={{ padding: '5px 12px', fontSize: '0.75rem' }}
                    onClick={() => removeEntry(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Company Name</label>
                  <input name="company" type="text" placeholder="Google" value={entry.company} onChange={(e) => handleChange(index, e)} />
                </div>
                <div className="form-group">
                  <label>Position Title</label>
                  <input name="position" type="text" placeholder="Software Engineer" value={entry.position} onChange={(e) => handleChange(index, e)} />
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <input name="startDate" type="text" placeholder="Jan 2020" value={entry.startDate} onChange={(e) => handleChange(index, e)} />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input name="endDate" type="text" placeholder="Dec 2022 (or Present)" value={entry.endDate} onChange={(e) => handleChange(index, e)} />
                </div>
                <div className="form-group full-width">
                  <label>Main Responsibilities</label>
                  <textarea
                    name="responsibilities"
                    placeholder="Describe your key responsibilities, achievements, and impact..."
                    value={entry.responsibilities}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="section-actions" style={{ justifyContent: 'space-between' }}>
            <button className="btn btn-secondary" onClick={addEntry}>
              <span className="btn-icon">＋</span> Add Another
            </button>
            <div style={{ display: 'flex', gap: '10px' }}>
              {savedEntries && savedEntries.length > 0 && (
                <button className="btn btn-secondary" onClick={() => setEditing(false)}>
                  <span className="btn-icon">✕</span> Cancel
                </button>
              )}
              <button className="btn btn-primary" onClick={handleSubmit}>
                <span className="btn-icon">✓</span> Save Section
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="display-view">
            {entries.map((entry, index) => (
              <div key={index} className="entry-block">
                <div className="cv-entry-top" style={{ marginBottom: '6px' }}>
                  <div>
                    <div className="display-value">{entry.position}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{entry.company}</div>
                  </div>
                  {(entry.startDate || entry.endDate) && (
                    <span className="cv-entry-date">{entry.startDate} – {entry.endDate}</span>
                  )}
                </div>
                {entry.responsibilities && (
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.65' }}>
                    {entry.responsibilities}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="section-actions">
            <button className="btn btn-secondary" onClick={handleEdit}>
              <span className="btn-icon">✏️</span> Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
