import { useMemo } from 'react';
import '../styles/CVPreview.css';

const LEVEL_ORDER = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 };

export default function CVPreview({ personal, summary, education, experience, skills, photo }) {
  const hasPersonal = personal && personal.fullName;
  const hasEducation = education && education.some(e => e.school || e.degree);
  const hasExperience = experience && experience.some(e => e.company || e.position);
  const hasSkills = skills && skills.length > 0;
  const hasSummary = summary && summary.trim();

  const sortedSkills = useMemo(() => {
    if (!skills) return [];
    return [...skills].sort((a, b) => (LEVEL_ORDER[b.level] || 0) - (LEVEL_ORDER[a.level] || 0));
  }, [skills]);

  const handlePrint = () => window.print();

  const handleExportJson = () => {
    const data = { personal, summary, education, experience, skills, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="cv-preview-wrapper">
      <div className="preview-actions">
        <span className="preview-label">Live Preview</span>
        <div className="preview-actions-right">
          <button className="btn btn-secondary" onClick={handleExportJson} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <span className="btn-icon">📥</span> Export JSON
          </button>
          <button className="btn btn-primary" onClick={handlePrint} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
            <span className="btn-icon">🖨️</span> Print / PDF
          </button>
        </div>
      </div>

      <div className="cv-doc" id="cv-doc">
        <div className="cv-doc-header">
          {photo && (
            <div className="cv-photo-wrapper">
              <img src={photo} alt="Profile" className="cv-photo" />
            </div>
          )}
          {hasPersonal ? (
            <>
              <div className="cv-name">{personal.fullName}</div>
              {hasSummary && <div className="cv-summary">{summary}</div>}
              <div className="cv-contact-row">
                {personal.email && (
                  <span className="cv-contact-item">
                    <span className="cv-contact-icon">✉</span> {personal.email}
                  </span>
                )}
                {personal.phone && (
                  <span className="cv-contact-item">
                    <span className="cv-contact-icon">📞</span> {personal.phone}
                  </span>
                )}
                {personal.location && (
                  <span className="cv-contact-item">
                    <span className="cv-contact-icon">📍</span> {personal.location}
                  </span>
                )}
                {personal.website && (
                  <span className="cv-contact-item">
                    <span className="cv-contact-icon">🔗</span> {personal.website}
                  </span>
                )}
              </div>
            </>
          ) : (
            <div className="cv-name empty">Your name will appear here…</div>
          )}
        </div>

        <div className="cv-doc-body">
          {hasSummary && (
            <div>
              <div className="cv-section-title">Professional Summary</div>
              <div className="cv-summary-body">{summary}</div>
            </div>
          )}

          <div>
            <div className="cv-section-title">Education</div>
            {hasEducation ? (
              education.filter(e => e.school || e.degree).map((entry, i) => (
                <div key={i} className="cv-entry">
                  <div className="cv-entry-top">
                    <div>
                      <div className="cv-entry-title">
                        {entry.degree || 'Degree'}{entry.field ? ` — ${entry.field}` : ''}
                      </div>
                      <div className="cv-entry-org">{entry.school}</div>
                    </div>
                    {(entry.startDate || entry.endDate) && (
                      <span className="cv-entry-date">
                        {entry.startDate}{entry.endDate ? ` – ${entry.endDate}` : ''}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="cv-empty-state">No education entries yet</p>
            )}
          </div>

          <div>
            <div className="cv-section-title">Work Experience</div>
            {hasExperience ? (
              experience.filter(e => e.company || e.position).map((entry, i) => (
                <div key={i} className="cv-entry">
                  <div className="cv-entry-top">
                    <div>
                      <div className="cv-entry-title">{entry.position || 'Position'}</div>
                      <div className="cv-entry-org">{entry.company}</div>
                    </div>
                    {(entry.startDate || entry.endDate) && (
                      <span className="cv-entry-date">
                        {entry.startDate}{entry.endDate ? ` – ${entry.endDate}` : ''}
                      </span>
                    )}
                  </div>
                  {entry.responsibilities && (
                    <div className="cv-entry-desc">{entry.responsibilities}</div>
                  )}
                </div>
              ))
            ) : (
              <p className="cv-empty-state">No experience entries yet</p>
            )}
          </div>

          {hasSkills && (
            <div>
              <div className="cv-section-title">Skills</div>
              <div className="cv-skills-grid">
                {sortedSkills.map((skill, i) => (
                  <div key={i} className="cv-skill-item">
                    <span className="cv-skill-name">{skill.name}</span>
                    <div className="cv-skill-bar-bg">
                      <div
                        className="cv-skill-bar-fill"
                        style={{
                          width: skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '75%' : skill.level === 'Intermediate' ? '50%' : '25%',
                        }}
                      />
                    </div>
                    <span className="cv-skill-level">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
