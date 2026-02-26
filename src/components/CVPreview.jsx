import '../styles/CVPreview.css';

export default function CVPreview({ personal, education, experience }) {
  const hasPersonal = personal && personal.fullName;
  const hasEducation = education && education.some(e => e.school || e.degree);
  const hasExperience = experience && experience.some(e => e.company || e.position);

  return (
    <div className="cv-preview-wrapper">
      <div className="preview-label">Live Preview</div>

      <div className="cv-doc">
        {/* Header */}
        <div className="cv-doc-header">
          {hasPersonal ? (
            <>
              <div className="cv-name">{personal.fullName}</div>
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

        {/* Body */}
        <div className="cv-doc-body">
          {/* Education */}
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

          {/* Experience */}
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
        </div>
      </div>
    </div>
  );
}
