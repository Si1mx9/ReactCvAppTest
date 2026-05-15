import { useState, useRef, useEffect } from 'react';
import '../styles/Section.css';

export default function PhotoUpload({ onSave, savedData }) {
  const [photo, setPhoto] = useState(savedData || null);
  const fileRef = useRef(null);

  useEffect(() => {
    onSave(photo);
  }, [photo, onSave]);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Image too large. Max 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhoto(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="section-card">
      <div className="section-header">
        <div className="section-title-group">
          <div className="section-icon pink">📷</div>
          <div>
            <div className="section-title">Profile Photo</div>
            <div className="section-subtitle">Optional photo for your CV</div>
          </div>
        </div>
        <span className={`status-badge ${photo ? 'saved' : 'editing'}`}>
          {photo ? '✅ Added' : '✏️ Optional'}
        </span>
      </div>

      <div className="photo-upload-area">
        {photo ? (
          <div className="photo-preview-wrapper">
            <img src={photo} alt="Profile" className="photo-preview" />
            <button className="btn btn-secondary" onClick={removePhoto} style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
              <span className="btn-icon">✕</span> Remove
            </button>
          </div>
        ) : (
          <div
            className="photo-placeholder"
            onClick={() => fileRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
          >
            <span style={{ fontSize: '2rem' }}>📸</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Click to upload photo (max 2MB)</span>
          </div>
        )}
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
      </div>
    </div>
  );
}
