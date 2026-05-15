import { useState } from 'react';
import '../styles/Section.css';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const emptySkill = { name: '', level: 'Intermediate' };

export default function Skills({ onSave, savedEntries }) {
  const [editing, setEditing] = useState(!savedEntries || savedEntries.length === 0);
  const [draft, setDraft] = useState(savedEntries && savedEntries.length > 0 ? savedEntries : [{ ...emptySkill }]);

  const handleChange = (index, field, value) => {
    setDraft((prev) => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
  };

  const addSkill = () => setDraft((prev) => [...prev, { ...emptySkill }]);

  const removeSkill = (index) => {
    if (draft.length <= 1) return;
    setDraft((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSave(draft.filter((s) => s.name.trim()));
    setEditing(false);
  };

  return (
    <div className="section-card">
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-icon cyan">⚡</div>
          <div>
            <div className="section-title">Skills</div>
            <div className="section-subtitle">Technical & professional skills</div>
          </div>
        </div>
        <span className={`status-badge ${editing ? 'editing' : 'saved'}`}>
          {editing ? '✏️ Editing' : '✅ Saved'}
        </span>
      </div>

      {editing ? (
        <>
          {draft.map((skill, index) => (
            <div key={index}>
              {index > 0 && <hr className="entry-divider" />}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Skill #{index + 1}
                </span>
                {draft.length > 1 && (
                  <button className="btn btn-secondary" style={{ padding: '5px 12px', fontSize: '0.75rem' }} onClick={() => removeSkill(index)}>
                    Remove
                  </button>
                )}
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Skill Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="React, Python, Figma..."
                    value={skill.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Proficiency</label>
                  <select
                    name="level"
                    value={skill.level}
                    onChange={(e) => handleChange(index, 'level', e.target.value)}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '14px 18px',
                      color: 'var(--text-primary)',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '1.05rem',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {LEVELS.map((l) => (
                      <option key={l} value={l} style={{ background: '#111128', color: '#f0f0ff' }}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}

          <div className="section-actions" style={{ justifyContent: 'space-between' }}>
            <button className="btn btn-secondary" onClick={addSkill}>
              <span className="btn-icon">＋</span> Add Skill
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
            <div className="skills-display">
              {draft.map((skill, index) => (
                <div key={index} className="skill-badge">
                  <span className="skill-name">{skill.name}</span>
                  <span className={`skill-level skill-${skill.level.toLowerCase()}`}>{skill.level}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="section-actions">
            <button className="btn btn-secondary" onClick={() => { setDraft(savedEntries); setEditing(true); }}>
              <span className="btn-icon">✏️</span> Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
