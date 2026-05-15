import { useCallback } from 'react';
import Header from './components/Header';
import StepIndicator from './components/StepIndicator';
import PersonalInfo from './components/PersonalInfo';
import Summary from './components/Summary';
import Education from './components/Education';
import Experience from './components/Experience';
import Skills from './components/Skills';
import PhotoUpload from './components/PhotoUpload';
import CVPreview from './components/CVPreview';
import ToastProvider from './components/Toast';
import { toast } from './utils/toast';
import useLocalStorage from './hooks/useLocalStorage';
import { sanitize } from './utils/sanitize';
import './styles/global.css';
import './styles/print.css';
import './App.css';

const TOTAL_STEPS = 6;

function App() {
  const [step, setStep] = useLocalStorage('cvapp-step', 0);
  const [personal, setPersonal] = useLocalStorage('cvapp-personal', null);
  const [summary, setSummary] = useLocalStorage('cvapp-summary', '');
  const [education, setEducation] = useLocalStorage('cvapp-education', []);
  const [experience, setExperience] = useLocalStorage('cvapp-experience', []);
  const [skills, setSkills] = useLocalStorage('cvapp-skills', []);
  const [photo, setPhoto] = useLocalStorage('cvapp-photo', null);

  const goNext = useCallback(() => {
    setStep((s) => {
      const next = Math.min(s + 1, TOTAL_STEPS - 1);
      return next;
    });
  }, [setStep]);

  const goBack = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, [setStep]);

  const handleSavePersonal = useCallback((data) => {
    setPersonal(data);
    toast('Personal info saved');
    goNext();
  }, [setPersonal, goNext]);

  const handleSaveSummary = useCallback((data) => {
    setSummary(sanitize(data));
    toast('Summary saved');
    goNext();
  }, [setSummary, goNext]);

  const handleSaveEducation = useCallback((data) => {
    const cleaned = data.map(e => ({
      school: sanitize(e.school),
      degree: sanitize(e.degree),
      field: sanitize(e.field),
      startDate: sanitize(e.startDate),
      endDate: sanitize(e.endDate),
    }));
    setEducation(cleaned);
    toast('Education saved');
    goNext();
  }, [setEducation, goNext]);

  const handleSaveExperience = useCallback((data) => {
    const cleaned = data.map(e => ({
      company: sanitize(e.company),
      position: sanitize(e.position),
      responsibilities: sanitize(e.responsibilities),
      startDate: sanitize(e.startDate),
      endDate: sanitize(e.endDate),
    }));
    setExperience(cleaned);
    toast('Experience saved');
    goNext();
  }, [setExperience, goNext]);

  const handleSaveSkills = useCallback((data) => {
    const cleaned = data.map(s => ({
      name: sanitize(s.name),
      level: s.level,
    }));
    setSkills(cleaned);
    toast('Skills saved');
    goNext();
  }, [setSkills, goNext]);

  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          if (data.personal) setPersonal(data.personal);
          if (data.summary !== undefined) setSummary(data.summary);
          if (data.education) setEducation(data.education);
          if (data.experience) setExperience(data.experience);
          if (data.skills) setSkills(data.skills);
          if (data.photo) setPhoto(data.photo);
          setStep(0);
          toast('CV data imported successfully');
        } catch {
          toast('Invalid JSON file', 'error');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }, [setPersonal, setSummary, setEducation, setExperience, setSkills, setPhoto, setStep]);

  const startOver = useCallback(() => {
    setStep(0);
    toast('Reset to start', 'info');
  }, [setStep]);

  return (
    <ToastProvider>
      <div className="app-layout">
        <Header onImport={handleImport} />

        <div className="wizard-wrapper">
          <StepIndicator current={step} />

          <div className="step-content" key={step}>
            {step === 0 && (
              <PersonalInfo savedData={personal} onSave={handleSavePersonal} />
            )}
            {step === 1 && (
              <Summary savedData={summary} onSave={handleSaveSummary} />
            )}
            {step === 2 && (
              <Education savedEntries={education} onSave={handleSaveEducation} />
            )}
            {step === 3 && (
              <Experience savedEntries={experience} onSave={handleSaveExperience} />
            )}
            {step === 4 && (
              <>
                <Skills savedEntries={skills} onSave={handleSaveSkills} />
                <PhotoUpload savedData={photo} onSave={setPhoto} />
              </>
            )}
            {step === 5 && (
              <CVPreview
                personal={personal}
                summary={summary}
                education={education}
                experience={experience}
                skills={skills}
                photo={photo}
              />
            )}
          </div>

          <div className="wizard-nav">
            {step > 0 ? (
              <button className="btn btn-secondary" onClick={goBack}>
                <span className="btn-icon">←</span> Back
              </button>
            ) : <span />}

            <div className="step-counter">Step {step + 1} of {TOTAL_STEPS}</div>

            {step < TOTAL_STEPS - 1 ? (
              <button className="btn btn-primary" onClick={goNext}>
                Next <span className="btn-icon">→</span>
              </button>
            ) : (
              <button className="btn btn-primary" onClick={startOver}>
                <span className="btn-icon">↺</span> Start Over
              </button>
            )}
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;
