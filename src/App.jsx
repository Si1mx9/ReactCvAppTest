import { useState } from 'react';
import Header from './components/Header';
import PersonalInfo from './components/PersonalInfo';
import Education from './components/Education';
import Experience from './components/Experience';
import CVPreview from './components/CVPreview';
import './styles/global.css';
import './App.css';

const STEPS = [
  { id: 0, label: 'Personal',   icon: '👤' },
  { id: 1, label: 'Education',  icon: '🎓' },
  { id: 2, label: 'Experience', icon: '💼' },
  { id: 3, label: 'Preview',    icon: '📄' },
];

function StepIndicator({ current }) {
  return (
    <div className="step-indicator">
      {STEPS.map((step, i) => (
        <div key={step.id} className="step-item">
          <div className="step-dot-col">
            <div className={`step-dot ${i < current ? 'done' : i === current ? 'active' : 'pending'}`}>
              {i < current ? '✓' : step.icon}
            </div>
            <span className={`step-label${i === current ? ' active-label' : ''}`}>{step.label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className="step-line-wrapper">
              <div className={`step-line${i < current ? ' done' : ''}`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const [personal, setPersonal] = useState(null);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="app-layout">
      <Header />

      <div className="wizard-wrapper">
        <StepIndicator current={step} />

        <div className="step-content" key={step}>
          {step === 0 && (
            <PersonalInfo savedData={personal} onSave={setPersonal} />
          )}
          {step === 1 && (
            <Education savedEntries={education} onSave={setEducation} />
          )}
          {step === 2 && (
            <Experience savedEntries={experience} onSave={setExperience} />
          )}
          {step === 3 && (
            <CVPreview personal={personal} education={education} experience={experience} />
          )}
        </div>

        <div className="wizard-nav">
          {step > 0 ? (
            <button className="btn btn-secondary" onClick={goBack}>
              <span className="btn-icon">←</span> Back
            </button>
          ) : <span />}

          <div className="step-counter">Step {step + 1} of {STEPS.length}</div>

          {step < STEPS.length - 1 ? (
            <button className="btn btn-primary" onClick={goNext}>
              Next <span className="btn-icon">→</span>
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => setStep(0)}>
              <span className="btn-icon">↺</span> Start Over
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
