import { useState } from 'react';
import '../styles/Section.css';
import { sanitize, validateEmail, validatePhone, validateUrl } from '../utils/sanitize';

const defaultData = {
  fullName: '',
  email: '',
  phone: '',
  location: '',
  website: '',
};

export default function PersonalInfo({ onSave, savedData }) {
  const [editing, setEditing] = useState(!savedData);
  const [formData, setFormData] = useState(savedData || defaultData);
  const [draft, setDraft] = useState(savedData || defaultData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!draft.fullName.trim()) errs.fullName = 'Full name is required';
    const emailErr = validateEmail(draft.email);
    if (emailErr) errs.email = emailErr;
    const phoneErr = validatePhone(draft.phone);
    if (phoneErr) errs.phone = phoneErr;
    if (draft.website) {
      const urlErr = validateUrl(draft.website);
      if (urlErr) errs.website = urlErr;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const sanitized = {
      fullName: sanitize(draft.fullName),
      email: sanitize(draft.email),
      phone: sanitize(draft.phone),
      location: sanitize(draft.location),
      website: sanitize(draft.website),
    };
    setFormData(sanitized);
    onSave(sanitized);
    setEditing(false);
  };

  const handleEdit = () => {
    setDraft(formData);
    setEditing(true);
    setErrors({});
  };

  return (
    <div className="section-card">
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-icon purple">👤</div>
          <div>
            <div className="section-title">Personal Information</div>
            <div className="section-subtitle">Your identity & contact details</div>
          </div>
        </div>
        <span className={`status-badge ${editing ? 'editing' : 'saved'}`}>
          {editing ? '✏️ Editing' : '✅ Saved'}
        </span>
      </div>

      {editing ? (
        <>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="e.g. Jane Doe"
                value={draft.fullName}
                onChange={handleChange}
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName && <span className="field-error">{errors.fullName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                value={draft.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={draft.phone}
                onChange={handleChange}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="City, Country"
                value={draft.location}
                onChange={handleChange}
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="website">Website / LinkedIn</label>
              <input
                id="website"
                name="website"
                type="url"
                placeholder="https://yourportfolio.com"
                value={draft.website}
                onChange={handleChange}
                aria-invalid={!!errors.website}
              />
              {errors.website && <span className="field-error">{errors.website}</span>}
            </div>
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
          <div className="display-grid">
            <div className="display-field">
              <span className="display-label">Full Name</span>
              <span className="display-value">{formData.fullName || '—'}</span>
            </div>
            <div className="display-field">
              <span className="display-label">Email</span>
              <span className="display-value">{formData.email || '—'}</span>
            </div>
            <div className="display-field">
              <span className="display-label">Phone</span>
              <span className="display-value">{formData.phone || '—'}</span>
            </div>
            <div className="display-field">
              <span className="display-label">Location</span>
              <span className="display-value">{formData.location || '—'}</span>
            </div>
            {formData.website && (
              <div className="display-field">
                <span className="display-label">Website</span>
                <span className="display-value">{formData.website}</span>
              </div>
            )}
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
